/**
 * Created by vishruthkrishnaprasad on 12/2/17.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController)
        function loginController(UserService, $location, $rootScope) {
            var vm = this;
            vm.login = login;

            function init() {

            }
            init();

            function login(user) {
                UserService
                    .login(user)
                    .success(function (user) {
                        $rootScope.currentUser = user;
                        $location.url("/dashboard");
                    })
                    .error(function (err) {
                        vm.error = "Username/password does not match";
                    });
            }
        }

})();
