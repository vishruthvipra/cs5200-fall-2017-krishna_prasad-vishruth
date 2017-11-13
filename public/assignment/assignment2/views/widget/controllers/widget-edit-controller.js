/**
 * Created by vishruthkrishnaprasad on 14/2/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", widgetEditController);
        function widgetEditController($routeParams, WidgetService, $location) {
            var vm = this;

            var userId = $routeParams.uid;
            vm.userId = userId;
            var websiteId = $routeParams.wid;
            vm.websiteId = websiteId;
            var widgetId = $routeParams.wgid;
            vm.widgetId = widgetId;
            var pageId = $routeParams.pid;
            vm.pageId = pageId;
            vm.createWidget = createWidget;
            vm.deleteWidget = deleteWidget;

            function init() {
                WidgetService
                    .findAllWidgets(pageId)
                    .success(function (widgets) {
                        vm.widgets = widgets;
                    });
                WidgetService
                    .findWidgetById(widgetId)
                    .success(function (widget) {
                        vm.widget = widget;
                    });
                vm.updateWidget = updateWidget;
            }

            init();

            function createWidget(thiswidget, widgettype) {
                    var update = WidgetService
                        .createWidget(pageId, widgettype, thiswidget)
                        .success(function (widget) {
                            if (update != null) {
                                vm.message = "Widget succesfully updated!"
                                //$location.url("user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widget._id);
                            }
                            else {
                                vm.error = "Unable to update..."
                            }
                        });
                }

            function updateWidget(newWidget) {
                if (widgetId == "HEADING") {
                    createWidget(newWidget, "HEADING");
                }
                else if (widgetId == "HTML") {
                    createWidget(newWidget, "HTML");
                }
                else if (widgetId == "IMAGE") {
                    createWidget(newWidget, "IMAGE");
                }
                else if (widgetId == "YOUTUBE") {
                    createWidget(newWidget, "YOUTUBE");
                }
                else if (widgetId == "TEXT") {
                    createWidget(newWidget, "TEXT");
                }
                else {
                    var update = WidgetService
                        .updateWidget(widgetId, newWidget)
                        .success(function (widget) {

                        });

                    if (update != null) {
                        vm.message = "Widget succesfully updated!"
                    }
                    else {
                        vm.error = "Unable to update..."
                    }
                }
            }

            function deleteWidget() {
                var update = WidgetService
                    .deleteWidget(pageId, widgetId)
                    .success(function (widget) {
                        if (update != null) {
                            $location.url("user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                        }
                        else {
                            vm.error = "Unable to update..."
                        }
                    });
            }
        }
})();
