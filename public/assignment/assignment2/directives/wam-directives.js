/**
 * Created by vishruthkrishnaprasad on 22/3/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .directive('wamDirectives', sortableDir);

    function sortableDir() {
        function linkFunc(scope, element, attrs, sortingController) {
            element.sortable({
                start: function (event, ui) {
                    ui.item.startPos = ui.item.index();
                },
                update: function (event, ui) {
                    var startIndex = ui.item.startPos;
                    var endIndex = ui.item.index();
                    sortingController.widgetsSort(startIndex, endIndex);
                },
                axis: 'y',
            });

        }

        return {
            link: linkFunc,
            controller: sortableWidgetsController
        };
    }

    function sortableWidgetsController(WidgetService, $routeParams) {
        var vm = this;
        vm.widgetsSort = widgetsSort;

        function widgetsSort(start, end) {
            var pageId = $routeParams.pid;
            WidgetService
                .reorderWidgets(pageId, start, end)
                .success(function (response) {

                })
                .error(function () {

                });
        }
    }
})();