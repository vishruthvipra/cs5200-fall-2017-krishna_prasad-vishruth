/**
 * Created by vishruthkrishnaprasad on 14/2/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", pageNewController)
    function pageNewController($routeParams, PageService, $location) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        PageService
            .findAllPages(websiteId)
            .success(function (pages) {
                vm.pages = pages
            });
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.createPage= createPage;

        function init() {

        }
        init();

        function createPage(newPage) {
            var update = PageService
                .findPageByPageName(websiteId, newPage.name)
                .success(function (newPage) {
                    vm.error = "Page already exists";
                })
                .error(function (err) {
                    PageService
                        .createPage(websiteId, newPage)
                        .success(function (page) {
                            $location.url("user/" + userId + "/website/" + websiteId + "/page");
                        })
                });
        }
    }
})();