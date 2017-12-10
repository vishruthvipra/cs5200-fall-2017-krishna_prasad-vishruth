/**
 * Created by vishruthkrishnaprasad on 12/2/17.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("HomeController", homeController);
        function homeController(UserService, $location) {
            var vm = this;
            vm.search = false;

            vm.startSearch = startSearch;
            vm.showAllDoctors = showAllDoctors;

            function init() {
                UserService
                    .findAllDoctors()
                    .success(function (user) {
                        vm.searchResults = user;
                    });
            }

            init();

            function startSearch(searchText) {
                vm.search = true;

                UserService
                    .findUserByUsername(searchText)
                    .success(function (user) {
                        vm.searchResults = null;
                        vm.search = user;
                        vm.error = "";
                    })
                    .error(function (err) {
                        vm.error = "Incorrect username";
                    });
            }

            function showAllDoctors() {
                vm.error = "";

                UserService
                    .findAllDoctors()
                    .success(function (user) {
                        vm.searchResults = user;
                    });

                vm.search = false;
            }
        }

})();
