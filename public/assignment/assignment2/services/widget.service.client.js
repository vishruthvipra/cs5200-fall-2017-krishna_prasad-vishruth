/**
 * Created by vishruthkrishnaprasad on 14/2/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", widgetService);

    function widgetService($http) {
        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "findAllWidgets": findAllWidgets,
            "findWidgetByWidgetName": findWidgetByWidgetName,
            "reorderWidgets": reorderWidgets
        };

        return api;

        function createWidget(pageId, widgettype, newwidget) {
            return $http.post("/api/page/" + pageId + "/widget/" + widgettype, newwidget);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get("/api/page/" + pageId);
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/" + widgetId);
        }

        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/" + widgetId, widget);
        }

        function deleteWidget(pageId, widgetId) {
            return $http.delete("/api/page/" + pageId + "/widget/" + widgetId);
            // return $http.delete("/api/widget/" + pageId, widget);
        }

        function findAllWidgets(pageId) {
            return $http.get("/api/page/" + pageId + "/widgets");
        }

        function findWidgetByWidgetName(pageId, name) {
            return $http.get("/api/page/" + pageId + "/widget?name=" + name);
        }

        function reorderWidgets(pageId, start, end) {
            return $http.put("/api/page/" + pageId + "/widget?start=" + start + "&end=" + end);
        }
    }
})();