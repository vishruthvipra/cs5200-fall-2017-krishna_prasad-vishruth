/**
 * Created by vishruthkrishnaprasad on 11/2/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService($http, $rootScope) {

        var api = {
            "login": login,
            "logout": logout,
            "register": register,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "addMessage": addMessage,
            "deleteMessage": deleteMessage,
            "findAllUsers": findAllUsers
        };

        return api;

        function login(user) {
            return $http.post("/api/login", user);
        }

        function logout() {
            $rootScope.currentUser = null;
            return $http.post("/api/logout");
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function findUserById(userId) {
            return $http.get("/api/user/" + userId);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username=" + username + "&password=" + password);
        }

        function updateUser(userId, user) {
            return $http.put("/api/user/" + userId, user);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/" + userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username=" + username);
        }

        function addMessage(userId, message) {
            return $http.put("/api/user/" + userId + "/message", message);
        }

        function deleteMessage(userId, messageId) {
            return $http.delete("/api/user/" + userId + "/message/" + messageId);
        }

        function findAllUsers() {
            return $http.get("/api/user");
        }
    }
})();