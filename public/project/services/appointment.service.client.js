/**
 * Created by vishruthkrishnaprasad on 12/2/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("AppointmentService", AppointmentService);
        function AppointmentService($http) {
            var api = {
                "makeAppointments": makeAppointments,
                "findAppointmentsByName": findAppointmentsByName,
                "findAllAppointments": findAllAppointments,
                "updateAppointment": updateAppointment,
                "deleteAppointment": deleteAppointment
            };
            return api;

            function makeAppointments(appt) {
                return $http.post("/api/appointment", appt);
            }

            function findAppointmentsByName(username, role) {
                return $http.get("/api/user/" + username + "/appointment/role/" + role);
            }

            function findAllAppointments() {
                return $http.get("/api/appointment/");
            }

            function updateAppointment(apptId, appt) {
                return $http.put("/api/appointment/" + apptId, appt);
            }
            
            function deleteAppointment(apptId) {
                return $http.delete("/api/appointment/" + apptId);
            }
        }
})();