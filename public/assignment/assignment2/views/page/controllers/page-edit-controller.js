/**
 * Created by vishruthkrishnaprasad on 12/2/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", pageEditController);
        function pageEditController($routeParams, PageService, $location) {
            var vm = this;
            var userId = $routeParams.uid;
            var websiteId = $routeParams.wid;
            var pageId = $routeParams.pid;

            PageService
                .findAllPages(websiteId)
                .success(function (pages) {
                    vm.pages = pages
                });

            vm.userId = userId;
            vm.websiteId = websiteId;
            vm.deletePage = deletePage;

            function init() {
                PageService
                    .findPageById(pageId)
                    .success(function (page) {
                        vm.page = page;
                    });

                vm.updatePage = updatePage;
            }

            init();

            function updatePage(newPage) {
                var update = PageService
                    .updatePage(pageId, newPage)
                    .success(function (page) {
                        if (update != null) {
                            vm.message = "Page succesfully updated!"
                        }
                        else {
                            vm.error = "Unable to update..."
                        }
                    });
            }

            function deletePage(page) {
                var update = PageService
                    .deletePage(websiteId, pageId)
                    .success(function (page) {
                        if (update != null) {
                            $location.url("user/" + userId + "/website/" + websiteId + "/page");
                        }
                        else {
                            vm.error = "Unable to delete..."
                        }
                    });
            }
        }
})();