/**
 * Created by vishruthkrishnaprasad on 1/3/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .directive('webdevSortable', sortableDir);
    
    function sortableDir() {
        function linkFunc(scope, element) {
            element.sortable({axis: 'y'})
        }
        return {
            link : linkFunc
        };
    }

})();