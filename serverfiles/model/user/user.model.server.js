/**
 * Created by vishruthkrishnaprasad on 11/3/17.
 */
module.exports = function (app, mongoose) {
    var q = require('q');
    var userSchema = require('./user.schema.server')(app, mongoose);
    var userModel = mongoose.model('userModel', userSchema);

    var api = {
        addWebsite: addWebsite,
        deleteWebsite: deleteWebsite,
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function addWebsite(userId, websiteId) {
        var deferred = q.defer();
        userModel
            .findById(userId, function (err, user) {
                user.websites.push(websiteId);
                user.save();
                deferred.resolve(user);
            });
        return deferred.promise;
    }

    function deleteWebsite(userId, websiteId) {
        var deferred = q.defer();
        userModel
            .findById(userId, function (err, user) {
                var index = user.websites.indexOf(websiteId);
                user.websites.splice(index, 1);
                user.save();
                deferred.resolve(user);
            });
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        userModel.create(user, function (err, status) {
            if(err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
        //return userModel.create(user);

    }

    function findUserById(userId) {
        var deferred = q.defer();
        userModel.findById(userId, function (err, status) {
            if (err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
        //return userModel.findById(userId);
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        userModel.findOne({username: username}, function (err, status) {
            if (err) {
                deferred.reject(new Error(err));
            }
            else if(status) {
                deferred.resolve(status);
                 // deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
        //return userModel.findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        userModel.findOne({username: username, password: password}, function (err, status) {
            if (err) {
                deferred.reject(new Error(err));
            } else if(status) {
                deferred.resolve(status);
                // deferred.reject(err);
            } else {
                deferred.reject(new Error(err));
            }
        });
        return deferred.promise;
        //return userModel.findOne({username: username, password: password});
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        userModel.update({_id: userId}, {$set: user}, function (err, status) {
            if (err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
        //return userModel.update({_id: userId}, {$set: user});
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        userModel.remove({_id: userId}, function (err, status) {
            if (err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
       // return userModel.remove({_id: userId});
    }
};

//
// userModel.create({username: "alice",    email: "alice@wonderland.com", password: "alice",    firstName: "Alice",  lastName: "Wonder"});
// userModel.create({username: "bob",      email: "bob@marley.com", password: "bob",      firstName: "Bob",    lastName: "Marley"});
// userModel.create({username: "charly",   email: "charly@garcia.com", password: "charly",   firstName: "Charly", lastName: "Garcia"});
// userModel.create({username: "jannunzi", email: "jannunzi@jose.com", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi"});
//