/**
 * Created by vishruthkrishnaprasad on 20/2/17.
 */
module.exports = function (app, model) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var userModel = model.userModel;
    var websiteModel = model.websiteModel;
    var pageModel = model.pageModel;
    var widgetModel = model.widgetModel;

    // var users = [
    //     {_id: "123", username: "alice",    email: "alice@wonderland.com", password: "alice",    firstName: "Alice",  lastName: "Wonder"},
    //     {_id: "234", username: "bob",      email: "bob@marley.com", password: "bob",      firstName: "Bob",    lastName: "Marley"},
    //     {_id: "345", username: "charly",   email: "charly@garcia.com", password: "charly",   firstName: "Charly", lastName: "Garcia"},
    //     {_id: "456", username: "jannunzi", email: "jannunzi@jose.com", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi"}
    // ];

    function createUser(req, res) {
        var newUser = req.body;
        userModel
            .createUser(newUser)
            .then(function(user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(req, res);
        }
        else if (username){
            findUserByUsername(req, res);
        }
    }

    function findUserByCredentials (req, res) {
        var username = req.query.username;
        var password = req.query.password;

        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // var user = users.find(function (user) {
        //     return user.username == username && user.password == password;
        // });
        // res.json(user);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user) {
                    res.json(user);
                }
                else {
                    res.sendStatus(500).send();
                }
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // var user = users.find(function (user) {
        //     return user.username == req.query.username;
        // });
        // if (user) {
        //     res.json(user);
        // }
        // else {
        //     res.sendStatus(400);
        // }
    }

    function findUserById (req, res) {
        var userId = req.params.userId;
        userModel.findUserById(userId)
            .then(function(user){
                res.json(user);
            });

        // var user = users.find(function (u) {
        //     return u._id == userId;
        // });
        // res.json(user);
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;

        userModel
            .updateUser(userId, user)
            .then(function(status){
                res.send(200)
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // for (var u in users) {
        //     if (users[u]._id == userId) {
        //         users[u].firstName = newUser.firstName;
        //         users[u].email = newUser.email;
        //         users[u].lastName = newUser.lastName;
        //         res.json(users[u]);
        //         return;
        //     }
        // }
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (status) {
                res.send(200);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // for (var u in users) {
        //     if(users[u]._id == userId) {
        //         var userDeleted = users[u];
        //         users.splice(u,1);
        //         res.send(userDeleted);
        //         return;
        //     }
        // }
    }
};