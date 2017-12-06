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
                "findAppointmentsById": findAppointmentsById,
                "findAllAppointments": findAllAppointments
            };
            return api;

            function makeAppointments(appt) {
                return $http.post("/api/appointment", appt);
            }

            function findAppointmentsById(userId, role) {
                return $http.get("/api/user/" + userId + "/appointment/role/" + role);
            }

            function findAllAppointments() {
                return $http.get("/api/appointment/");
            }
        }
})();