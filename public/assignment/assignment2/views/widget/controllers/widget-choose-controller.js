/**
 * Created by vishruthkrishnaprasad on 14/2/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooseController", widgetChooseController);
    function widgetChooseController($routeParams, WidgetService, $location) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.userId = userId;
        var websiteId = $routeParams.wid;
        vm.websiteId = websiteId;
        var pageId = $routeParams.pid;
        vm.pageId = pageId;
        //vm.createWidget = createWidget;
        vm.widgetLabel = widgetLabel;

        function init() {
            WidgetService
                .findAllWidgets(pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                });
        }
        init();

        function widgetLabel(widgettype) {
            $location.url("user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgettype);
        }
        // function createWidget(thiswidget, widgettype) {
        //     console.log(thiswidget);
        //     console.log("--------------------" + widgettype);
        //     var update = WidgetService
        //         .createWidget(pageId, widgettype, thiswidget)
        //         .success(function (widget) {
        //             if (update != null) {
        //                 console.log(widget._id);
        //                 //$location.url("user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widget._id);
        //             }
        //             else {
        //                 vm.error = "Unable to update..."
        //             }
        //         });
        // }
    }
})();
