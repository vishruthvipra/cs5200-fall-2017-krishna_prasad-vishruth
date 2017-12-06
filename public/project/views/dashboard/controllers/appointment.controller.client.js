/**
 * Created by vishruthkrishnaprasad on 4/12/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("AppointmentController", AppointmentController);
    function AppointmentController(UserService, AppointmentService, $location, $rootScope, loggedin) {
        var vm = this;
        vm.log = "";
        vm.user = loggedin.data;
        var user = vm.user;
        var userId = user._id;
        var role = user.role;

        vm.makeAppointment = makeAppointment;
        vm.showMyAppointments = showMyAppointments;
        vm.showAllAppointments = showAllAppointments;
        vm.logout = logout;

        function init() {
            vm.bookAppt = false;
            showMyAppointments();
        }
        init();

        function makeAppointment(appt) {
            AppointmentService
                .makeAppointments(appt)
                .success(function (appnt) {
                    vm.log = "Success!";
                })
                .error(function (err) {
                    vm.log = "Some other issue";
                });


            // AppointmentService
            //     .findAppointmentByDoctorAndDate(appt.dname, appt.date)
            //     .success(function () {
            //         AppointmentService
            //             .makeAppointments(appt)
            //             .success(function (appnt) {
            //
            //             })
            //             .error(function (err) {
            //                 vm.log = "Some other issue";
            //             });
            //     })
            //     .error(function (err) {
            //         vm.log = "Doctor already booked for that date";
            //     })

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
                    $rootScope.currentUser = null;
                    $location.url("/home");
                });
        }
    }

})();