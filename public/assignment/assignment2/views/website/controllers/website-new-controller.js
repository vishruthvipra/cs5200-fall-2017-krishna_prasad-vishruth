/**
 * Created by vishruthkrishnaprasad on 14/2/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", websiteNewController)
    function websiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        WebsiteService
            .findAllWebsites(userId)
            .success(function (websites) {
                vm.websites = websites
            });
        vm.userId = userId;
        vm.createWebsite= createWebsite;

        function init() {

        }
        init();

        function createWebsite(newWebsite) {
            var update = WebsiteService
                .findWebsiteByWebsiteName(userId, newWebsite.name)
                .success(function (newWebsite) {
                    vm.error = "Website already exists";
                })
                .error(function (err) {
                    WebsiteService
                        .createWebsite(userId, newWebsite)
                        .success(function (website) {
                            $location.url("user/" + userId + "/website");
                        })
                });
        }
    }
})();