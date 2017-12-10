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
        var username = user.username;

        vm.makeAppointment = makeAppointment;
        vm.showMyAppointments = showMyAppointments;
        vm.showAllAppointments = showAllAppointments;
        vm.updateAppointment = updateAppointment;
        vm.deleteAppointment = deleteAppointment;

        vm.logout = logout;

        function init() {
            vm.bookAppt = false;
            showMyAppointments();
            populateDoctors();
        }
        init();

        function populateDoctors() {
            vm.drop = false;

            UserService
                .findAllDoctors()
                .success(function (doctors) {
                    vm.doctors = doctors;
                });
        }

        function makeAppointment(appt) {
            UserService
                .findUserByUsername(appt.docName)
                .success(function (doctor) {
                    UserService
                        .findUserByUsername(appt.patName)
                        .success(function (patient) {
                            if (patient) {
                                AppointmentService
                                    .makeAppointments(appt)
                                    .success(function (appt) {
                                        doctor.appointments.push(appt._id);
                                        updateUser(doctor._id, doctor);

                                        patient.appointments.push(appt._id);
                                        updateUser(patient._id, patient);

                                        vm.log = "Success!";
                                        showMyAppointments();
                                        vm.bookAppt = false;
                                        vm.bool = false;
                                    })
                                    .error(function (err) {
                                        vm.log = "Please fill all fields";
                                        vm.bookAppt = false;
                                        vm.bool = false;
                                    });
                            }
                            else {
                                vm.log = "Patient not found";
                            }
                        });
                })
                .error(function (err) {
                    vm.log = "No user found";
                });
        }

        function updateUser(oldUserId, updUser) {
            UserService
                .updateUser(oldUserId, updUser);
        }

        function showMyAppointments(pat) {
            if (pat) {
                AppointmentService
                    .findAppointmentsByName(username, "PATIENT")
                    .success(function (appt) {
                        vm.searchResults = appt;
                    });
            }
            else {
                AppointmentService
                    .findAppointmentsByName(username, role)
                    .success(function (appt) {
                        vm.searchResults = appt;
                    });
            }
        }

        function showAllAppointments() {
            AppointmentService
                .findAllAppointments()
                .success(function (appt) {
                    vm.searchResults = appt;
                });
        }


        function updateAppointment(oldAppointmentId, appt) {
            vm.editfields = false;
            AppointmentService
                .updateAppointment(oldAppointmentId, appt)
                .success(function (newappt) {
                    if (newappt !== null) {
                        showMyAppointments();
                    }
                })
                .error(function (err) {
                    vm.log = "Please fill all fields shown";
                });
        }

        function deleteAppointment(delAppt) {
            var update = AppointmentService
                .deleteAppointment(delAppt._id)
                .success(function (appt) {
                    if (appt !== null) {
                        vm.changeUser = false;
                        showMyAppointments();
                    }
                })
                .error(function (err) {
                    vm.error = "Invalid userId";
                })
        }

        function startSearch(searchValue, searchText) {
            vm.search = true;
            vm.spinner = true;
            if (searchValue === 1) {
                var promise = UserService.findUserById(searchText);
                promise
                    .success(function (user) {
                        vm.searchResults = null;
                        vm.search = user;
                    })
                    .error(function (err) {
                        vm.error = "Incorrect userId";
                    });
            }
            else {
                var promise = UserService.findUserByUsername(searchText);
                promise
                    .success(function (user) {
                        vm.searchResults = null;
                        vm.search = user;
                    })
                    .error(function (err) {
                        vm.error = "Incorrect username";
                    });
            }
            vm.spinner = false;

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