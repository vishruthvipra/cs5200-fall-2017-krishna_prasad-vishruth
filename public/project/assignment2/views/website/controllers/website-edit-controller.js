/**
 * Created by vishruthkrishnaprasad on 12/2/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);
        function WebsiteEditController($routeParams, WebsiteService, $location) {
            var vm = this;
            var userId = $routeParams.uid;
            var websiteId = $routeParams.wid;


            WebsiteService
                .findAllWebsites(userId)
                .success(function (websites) {
                    vm.websites = websites
                });

            vm.userId = userId;
            vm.deleteWebsite = deleteWebsite;

            function init() {
                WebsiteService
                    .findWebsiteById(websiteId)
                    .success(function (website) {
                        vm.website = website;
                    });

                vm.updateWebsite = updateWebsite;
            }
            init();

            function updateWebsite(newWebsite) {
                var update = WebsiteService
                    .updateWebsite(websiteId, newWebsite)
                    .success(function (website) {
                        if(update != null)
                        {
                            vm.message = "Website succesfully updated!"
                        }
                        else {
                            vm.error = "Unable to update..."
                        }
                    });
            }

            function deleteWebsite(website) {
                var update = WebsiteService
                    .deleteWebsite(userId, websiteId)
                    .success(function (website) {
                        if(update != null)
                        {
                            $location.url("user/" + userId + "/website");
                        }
                        else {
                            vm.error = "Could not delete website..."
                        }
                    });
            }
        }
})();