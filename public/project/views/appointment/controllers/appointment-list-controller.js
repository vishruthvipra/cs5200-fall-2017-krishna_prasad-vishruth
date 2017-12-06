/**
 * Created by vishruthkrishnaprasad on 12/2/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("AppointmentListController", AppointmentListController)
        function AppointmentListController($routeParams, WebsiteService) {
            var vm = this;
            var userId = $routeParams.uid;
            vm.userId = userId;
            
            function init() {
                 WebsiteService
                    .findAllWebsites(userId)
                    .success(function (websites) {
                        vm.websites = websites;
                    });
            }
            init();


        }
})();