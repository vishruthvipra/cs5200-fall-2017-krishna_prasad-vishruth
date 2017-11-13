/**
 * Created by vishruthkrishnaprasad on 11/2/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

        function PageService($http) {

            var api = {
                "createPage": createPage,
                "findPageByWebsiteId": findPageByWebsiteId,
                "findPageById": findPageById,
                "updatePage": updatePage,
                "deletePage": deletePage,
                "findAllPages": findAllPages,
                "findPageByPageName": findPageByPageName,
                "findAllWidgets": findAllWidgets
            };

            return api;
            function createPage(websiteId, page) {
                return $http.post("/api/website/" + websiteId + "/page", page);
            }

            function findPageByWebsiteId(websiteId) {
                return $http.get("/api/website/" + websiteId);
            }

            function findPageById(pageId) {
                return $http.get("/api/page/" + pageId);
            }

            function updatePage(pageId, page) {
                return $http.put("/api/page/" + pageId, page);
            }

            function deletePage(websiteId, pageId) {
                return $http.delete("/api/website/" + websiteId + "/page/" + pageId);
                // return $http.delete("/api/page/" + pageId, page);
            }

            function findAllPages(websiteId) {
                return $http.get("/api/website/" + websiteId + "/page");
            }

            function findPageByPageName(websiteId, name) {
                return $http.get("/api/website/" + websiteId + "/page?name=" + name);
            }

            function findAllWidgets(pageId) {
                return $http.get("/api/page/" + pageId + "/widgets");
            }
        }
})();