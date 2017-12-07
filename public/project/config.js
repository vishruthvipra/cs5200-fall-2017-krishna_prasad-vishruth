/**
 * Created by vishruthkrishnaprasad on 7/2/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .config(Config);

    var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope) {
        return $http.get('/api/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
            } else{
                $location.url('/home');
            }
        });
    };

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope) {
        return $http.get('/api/useradmin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
            } else{
                $location.url('/dashboard');
            }
        });
    };

    var checkTAdmin = function($q, $timeout, $http, $location, $rootScope) {
        return $http.get('/api/usertadmin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
            } else{
                $location.url('/dashboard');
            }
        });
    };

    var checkWAdmin = function($q, $timeout, $http, $location, $rootScope) {
        return $http.get('/api/userwadmin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
            } else{
                $location.url('/dashboard');
            }
        });
    };

    function Config($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/dashboard", {
                templateUrl: "views/dashboard/templates/dashboard.view.client.html",
                controller: "DashboardController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedIn }
            })
            .when("/profile", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedIn }
            })
            .when("/appointments", {
                templateUrl: "views/dashboard/templates/appointment.view.client.html",
                controller: "AppointmentController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedIn }
            })
            .when("/inbox", {
                templateUrl: "views/email/templates/inbox.view.client.html",
                controller: "InboxController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedIn }
            })
            .when("/compose/:sid", {
                templateUrl: "views/email/templates/compose.view.client.html",
                controller: "ComposeController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedIn }
            })
            .when("/accounts", {
                templateUrl: "views/account/templates/account.view.client.html",
                controller: "AccountController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedIn }
            })
            .otherwise("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
    }
})();