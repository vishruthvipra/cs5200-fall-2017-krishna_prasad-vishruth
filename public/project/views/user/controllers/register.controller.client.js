/**
 * Created by vishruthkrishnaprasad on 12/2/17.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController)
    function registerController(UserService, $location, $rootScope) {
        var vm = this;
        vm.register = register;

        function init() {

        }
        init();


        function register(user) {
            if (!(user.firstName && user.lastName && user.username)) {
                vm.error = "Please fill all the fields below";
            }
            else if (user.vpassword !== user.password) {
                vm.error = "Passwords do not match";
            }
            else {
                UserService
                    .findUserByUsername(user.username)
                    .success(function (user) {
                        vm.error = "User already exists";
                    })
                    .error(function (err) {
                        user.role = "NORMAL";
                        UserService
                            .register(user)
                            .then(function (response) {
                                var user = response.data;
                                $rootScope.currentUser = user;
                                $location.url("/dashboard");
                            });
                    });
            }
        }
    }

})();
