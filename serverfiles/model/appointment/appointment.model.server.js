/**
 * Created by vishruthkrishnaprasad on 11/3/17.
 */
module.exports = function (app, mongoose) {
    var q = require('q');
    var appointmentSchema = require('./appointment.schema.server')(app, mongoose);
    var appointmentModel = mongoose.model('appointmentModel', appointmentSchema);

    var api = {
        makeAppointment: makeAppointment,
        findAppointmentsByDocName: findAppointmentsByDocName,
        findAppointmentsByPatName: findAppointmentsByPatName,
        findAllAppointments: findAllAppointments,
        findAppointmentById: findAppointmentById,
        updateAppointment: updateAppointment,
        deleteAppointment: deleteAppointment
    };
    return api;

    function makeAppointment(appt) {
        var deferred = q.defer();
        appointmentModel.create(appt, function (err, status) {
            if(err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findAppointmentsByDocName(docName) {
        var deferred = q.defer();
        appointmentModel.find({docName: docName}, function (err, appt) {
            if(err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(appt);
            }
        });
        return deferred.promise;
    }

    function findAppointmentsByPatName(patName) {
        var deferred = q.defer();
        appointmentModel.find({patName: patName}, function (err, appt) {
            if(err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(appt);
            }
        });
        return deferred.promise;
    }

    function findAllAppointments() {
        var deferred = q.defer();
        appointmentModel.find(function (err, appt) {
            if(err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(appt);
            }
        });
        return deferred.promise;
    }

    function findAppointmentById(appointmentId) {
        var deferred = q.defer();
        appointmentModel.findById(appointmentId, function (err, appt) {
            if(err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(appt);
            }
        });
        return deferred.promise;
    }

    function updateAppointment(appointmentId, appt) {
        var deferred = q.defer();
        appointmentModel.update({_id: appointmentId}, {$set: appt}, function (err, status) {
            if (err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function deleteAppointment(appointmentId) {
        var deferred = q.defer();
        appointmentModel.remove({_id: appointmentId}, function (err, status) {
            if (err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }
};
