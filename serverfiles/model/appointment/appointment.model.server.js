/**
 * Created by vishruthkrishnaprasad on 11/3/17.
 */
module.exports = function (app, mongoose) {
    var q = require('q');
    var appointmentSchema = require('./appointment.schema.server')(app, mongoose);
    var appointmentModel = mongoose.model('appointmentModel', appointmentSchema);

    var api = {
        makeAppointment: makeAppointment,
        findAppointmentsByDocId: findAppointmentsByDocId,
        findAppointmentsByPatId: findAppointmentsByPatId,
        findAllAppointments: findAllAppointments
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

    function findAppointmentsByDocId(docId) {
        var deferred = q.defer();
        appointmentModel.findOne({docId: docId}, function (err, appt) {
            if(err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(appt);
            }
        });
        return deferred.promise;
    }

    function findAppointmentsByPatId(patId) {
        var deferred = q.defer();
        appointmentModel.find({patId: patId}, function (err, appt) {
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
};
