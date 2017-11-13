/**
 * Created by vishruthkrishnaprasad on 12/2/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService", WebsiteService)
        function WebsiteService($http) {
            var api = {
                "createWebsite": createWebsite,
                "findWebsiteByUser": findWebsiteByUser,
                "findWebsiteById": findWebsiteById,
                "updateWebsite": updateWebsite,
                "deleteWebsite": deleteWebsite,
                "findAllWebsites": findAllWebsites,
                "findWebsiteByWebsiteName": findWebsiteByWebsiteName
            };
            return api;

            function createWebsite(userId, website) {
                return $http.post("/api/user/" + userId + "/website", website);
            }

            function findWebsiteByUser(userId) {
                return $http.get("/api/user/" + userId);
            }

            function findWebsiteById(websiteId) {
                return $http.get("/api/website/" + websiteId);
            }
            
            function updateWebsite(websiteId, website) {
                return $http.put("/api/website/" + websiteId, website);
            }
            
            function deleteWebsite(userId, websiteId) {
                return $http.delete("/api/user/" + userId + "/website/" + websiteId);
                // return $http.delete("/api/website/" + websiteId, website);
            }
            
            function findAllWebsites(userId) {
                return $http.get("/api/user/" + userId + "/website");
            }

            function findWebsiteByWebsiteName(userId, name) {
                return $http.get("/api/user/" + userId + "/website?name=" + name);
            }
        }
})();