/**
 * Created by vishruthkrishnaprasad on 7/4/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("AccountController", AccountController);
    function AccountController(UserService, AppointmentService, loggedin, $location) {
        var vm = this;
        vm.user = loggedin.data;
        var user = vm.user;
        var userId = user._id;

        vm.editfields = false;
        vm.search = false;
        vm.addUser = false;

        vm.createUser = createUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.startSearch = startSearch;
        vm.logout = logout;

        function init() {
            var promise = UserService.findAllUsers();
            promise
                .success(function (user) {
                    vm.searchResults = user;
                });
        }

        init();

        function createUser(newUser) {
            vm.changeUser = false;
            if (newUser.role !== "ADMIN" &&
                newUser.role !=="DOCTOR" &&
                newUser.role !=="MANAGER" &&
                newUser.role !=="NORMAL") {
                vm.error = "User role should be one of ADMIN|DOCTOR|MANAGER|NORMAL";
            }
            else {
                UserService
                    .findUserByUsername(newUser.username)
                    .success(function (user) {
                        vm.error = "User already exists";
                    })
                    .error(function (err) {
                        UserService
                            .createUser(newUser)
                            .success(function (user) {
                                vm.addUser = false;
                                UserService.findAllUsers()
                                    .success(function (user) {
                                        vm.searchResults = user;
                                        vm.addUser = false;
                                        vm.bool = false;
                                    });
                            })
                            .error(function (err) {
                                vm.error = "Could not create user";
                            })
                    });
            }
        }

        function updateUser(oldUserId, updUser) {
            vm.editfields = false;
            var update = UserService
                .updateUser(oldUserId, updUser)
                .success(function (user) {
                    if (update !== null) {
                        vm.changeUser = false;
                        UserService.findAllUsers()
                            .success(function (user) {
                                vm.searchResults = user;
                                vm.search = false;
                            });
                    }
                })
                .error(function (err) {
                    vm.error = "Invalid userId";
                });
        }

        function deleteUser(delUser) {

            UserService
                .findUserById(delUser._id)
                .success(function (user) {
                    var oldappt = user.appointments;
                    for (var i = 0; i < oldappt.length; i++) {
                        AppointmentService
                            .deleteAppointment(oldappt[i])
                            .success(function () {
                                console.log("deleted", oldappt[i]);
                            });
                    }
                    UserService
                        .deleteUser(delUser._id)
                        .success(function (user) {
                            if (user !== null) {
                                vm.changeUser = false;
                                UserService.findAllUsers()
                                    .success(function (user) {
                                        vm.searchResults = user;
                                    });
                            }
                        })
                        .error(function (err) {
                            vm.error = "Invalid userId";
                        })
                });


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