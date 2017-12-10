/**
 * Created by vishruthkrishnaprasad on 20/2/17.
 */

module.exports = function (app, model) {
    app.post("/api/appointment", makeAppointment);
    app.get("/api/user/:username/appointment/role/:role", findAppointmentsByName);
    app.get("/api/appointment", findAllAppointments);
    app.put("/api/appointment/:appointmentId", updateAppointment);
    app.delete("/api/appointment/:appointmentId", deleteAppointment);

    var userModel = model.userModel;
    var appointmentModel = model.appointmentModel;

    function makeAppointment(req, res) {
        var newAppt = req.body;
        appointmentModel
            .makeAppointment(newAppt)
            .then(function(sensor) {
                res.json(sensor);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findAppointmentsByName(req, res) {
        var user = req.params.username;
        var role = req.params.role;

        if (role === "DOCTOR") {
            appointmentModel
                .findAppointmentsByDocName(user)
                .then(function (appt) {
                    if (appt) {
                        res.json(appt);
                    }
                    else {
                        res.sendStatus(500).send();
                    }
                }, function (error) {
                    res.sendStatus(500).send(error);
                });
        }

        else {
            appointmentModel
                .findAppointmentsByPatName(user)
                .then(function (appt) {
                    if (appt) {
                        res.json(appt);
                    }
                    else {
                        res.sendStatus(500).send();
                    }
                }, function (error) {
                    res.sendStatus(500).send(error);
                });
        }
    }

    function findAllAppointments(req, res) {
        appointmentModel
            .findAllAppointments()
            .then(function (appt) {
                if (appt) {
                    res.json(appt);
                }
                else {
                    res.sendStatus(500).send();
                }
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updateAppointment(req, res) {
        var appointmentId = req.params.appointmentId;
        var appt = req.body;

        appointmentModel
            .findAppointmentById(appointmentId)
            .then(function (oldappt) {
                updateUser(appointmentId, oldappt.docName, appt.docName);
                updateUser(appointmentId, oldappt.patName, appt.patName);

                appointmentModel
                    .updateAppointment(appointmentId, appt)
                    .then(function (status) {
                        res.sendStatus(200).send(status);
                    }, function (error) {
                        res.sendStatus(500).send(error);
                    });
            });
    }

    function updateUser(appointmentId, oldName, newName) {
        if (oldName !== newName) {
            userModel
                .findUserByUsername(newName)
                .then(function (user) {
                    user.appointments = user.appointments.push(appointmentId);
                    userModel.updateUser(user._id, user);
                    clearAppointmentId(oldName, appointmentId);
                });
        }
    }

    function clearAppointmentId(username, appointmentId) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                var index = user.appointments.indexOf(appointmentId) + 1;
                user.appointments = user.appointments.splice(index, 1);
                userModel.updateUser(user._id, user);
            });
    }

    function deleteAppointment(req, res) {
        var appointmentId = req.params.appointmentId;
        appointmentModel
            .findAppointmentById(appointmentId)
            .then(function (oldappt) {
                clearAppointmentId(oldappt.docName, appointmentId);
                clearAppointmentId(oldappt.patName, appointmentId);
                appointmentModel
                    .deleteAppointment(appointmentId)
                    .then(function (status) {
                        res.sendStatus(200).send(status);
                    }, function (error) {
                        res.sendStatus(500).send(error);
                    });
            });


    }
};