/**
 * Created by vishruthkrishnaprasad on 4/12/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("AppointmentController", AppointmentController);
    function AppointmentController(UserService, AppointmentService, $location, loggedin) {
        var vm = this;
        vm.log = "";
        vm.user = loggedin.data;
        var user = vm.user;
        var userId = user._id;
        var role = user.role;

        vm.makeAppointment = makeAppointment;
        vm.showMyAppointments = showMyAppointments;
        vm.showAllAppointments = showAllAppointments;
        // vm.updateAppointment = updateAppointment;
        
        
        vm.logout = logout;

        function init() {
            vm.bookAppt = false;
            showMyAppointments();
        }
        init();

        function makeAppointment(appt) {
            AppointmentService
                .makeAppointments(appt)
                .success(function (appt) {
                    vm.log = "Success!";
                    vm.bookAppt = false;
                })
                .error(function (err) {
                    vm.log = "Some other issue";
                });
        }

        function showMyAppointments() {
            AppointmentService
                .findAppointmentsById(userId, role)
                .success(function (appt) {
                    var d = new Date(appt.dateCreated);
                    appt.dateCreated = d.toString();
                    vm.searchResults = appt;
                });
        }

        function showAllAppointments() {
            AppointmentService
                .findAllAppointments()
                .success(function (appt) {
                    vm.searchResults = appt;
                });
        }


        function logout() {
            UserService
                .logout()
                .then(function (response) {
                    $location.url("/home");
                });
        }
    }

})();