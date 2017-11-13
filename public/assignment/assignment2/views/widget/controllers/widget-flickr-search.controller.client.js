/**
 * Created by vishruthkrishnaprasad on 22/3/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

        function FlickrImageSearchController($routeParams, FlickrService, WidgetService, $location) {
            var vm = this;
            var userId = $routeParams.uid;
            vm.userId = userId;
            var websiteId = $routeParams.wid;
            vm.websiteId = websiteId;
            var widgetId = $routeParams.wgid;
            vm.widgetId = widgetId;
            var pageId = $routeParams.pid;
            vm.pageId = pageId;
            vm.selectPhoto = selectPhoto;
            vm.createWidget = createWidget;

            vm.searchPhotos = function(searchTerm) {
                FlickrService
                    .searchPhotos(searchTerm)
                    .then(function(response) {
                        data = response.data.replace("jsonFlickrApi(","");
                        data = data.substring(0,data.length - 1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    });
            }

            function createWidget(thiswidget, widgettype) {
                var update = WidgetService
                    .createWidget(pageId, widgettype, thiswidget)
                    .success(function (widget) {
                        if (update != null) {
                            $location.url("user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                        }
                        else {
                            vm.error = "Unable to update..."
                        }
                    });
            }

            function selectPhoto(photo) {
                var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
                url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
                var thisWidget = {};
                thisWidget.url = url;

                if (widgetId == "IMAGE") {

                    createWidget(thisWidget, "IMAGE");
                }
                else {
                    var update = WidgetService
                        .updateWidget(widgetId, thisWidget)
                        .success(function (widget) {
                            if (update != null) {
                                $location.url("user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                            }
                            else {
                                vm.error = "Unable to update..."
                            }
                        });


                    if (update != null) {
                        vm.message = "Widget succesfully updated!"
                    }
                    else {
                        vm.error = "Unable to update..."
                    }
                }
            }


        }
})();