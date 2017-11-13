/**
 * Created by vishruthkrishnaprasad on 12/2/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", pageListController)
        function pageListController($routeParams, PageService) {
            var vm = this;
            var userId = $routeParams.uid;
            var websiteId = $routeParams.wid;
            vm.userId = userId;
            vm.websiteId = websiteId;


            function init() {
                PageService
                    .findAllPages(websiteId)
                    .success(function (pages) {
                        vm.pages = pages;
                    });
            }
            init();
        }
})();