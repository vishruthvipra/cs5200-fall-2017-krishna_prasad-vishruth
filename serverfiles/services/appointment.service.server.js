/**
 * Created by vishruthkrishnaprasad on 20/2/17.
 */

module.exports = function (app, model) {
    app.post("/api/appointment", makeAppointment);
    app.get("/api/user/:userId/appointment/role/:role", findAppointmentsById);
    app.get("/api/appointment", findAllAppointments);

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

    function findAppointmentsById(req, res) {
        var user = req.params.userId;
        var role = req.params.role;

        if (role === "DOCTOR") {
            appointmentModel
                .findAppointmentsByDocId(user)
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
                .findAppointmentsByPatId(user)
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
};