/**
 * Created by vishruthkrishnaprasad on 3/12/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("DashboardController", dashboardController)
    function dashboardController(UserService, $location, loggedin) {
        var vm = this;
        vm.user = loggedin.data;
        var user = vm.user;
        var userId = user._id;

        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function (response) {
                    $location.url("/home");
                });
        }
    }
})();
