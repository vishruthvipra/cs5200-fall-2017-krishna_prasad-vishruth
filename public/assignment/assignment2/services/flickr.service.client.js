/**
 * Created by vishruthkrishnaprasad on 22/3/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

        function FlickrService($http) {
            var key = "a89e021f5b7eb49b890254a6531cab0c";
            var secret = "257c781b96b78055";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

            var api = {
                "searchPhotos": searchPhotos
            };

            return api;


            function searchPhotos(searchTerm) {
                var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
                return $http.get(url);
            }
        }
})();
