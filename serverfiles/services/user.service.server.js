/**
 * Created by vishruthkrishnaprasad on 20/2/17.
 */
module.exports = function (app, model, passport) {
    var bcrypt = require("bcrypt-nodejs");
    var LocalStrategy = require('passport-local').Strategy;

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.get('/api/loggedin', loggedin);
    app.get('/api/useradmin', checkAdmin);
    app.get('/api/usertadmin', checkTAdmin);
    app.get('/api/userwadmin', checkWAdmin);
    app.post('/api/register', register);
    app.put("/api/user/:userId/message", updateMessage);
    app.delete("/api/user/:userId/message/:messageId", deleteMessage);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.post("/api/createuser", createUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var userModel = model.userModel;

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user != null && user.username === username && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function checkAdmin(req, res) {
        var user = req.user;
        if (user.role === null || user.role === "ADMIN") {
            res.json(user);
        }
        else {
            res.send('0');
        }
    }

    function checkTAdmin(req, res) {
        var user = req.user;
        if (user.role === "TADMIN") {
            res.json(user);
        }
        else {
            res.send('0');
        }
    }

    function checkWAdmin(req, res) {
        var user = req.user;
        if (user.role === "WADMIN") {
            res.json(user);
        }
        else {
            res.send('0');
        }
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function (user) {
                if (user) {
                    req.login(user, function (err) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            });
    }

    function createUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function (user) {
                if (user) {
                    res.json(user);
                }
                else {
                    res.status(400).send(err);
                }
            });
    }


    function updateMessage(req, res) {
        var userId = req.params.userId;
        var message = req.body;
        userModel
            .updateMessage(userId, message)
            .then(function (status) {
                res.sendStatus(200).send(status);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function deleteMessage(req, res) {
        var userId = req.params.userId;
        var messageId = req.params.messageId;
        userModel
            .deleteMessage(userId, messageId)
            .then(function (status) {
                res.sendStatus(200).send(status);
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
        else if (username) {
            findUserByUsername(req, res);
        }
        else {
            findAllUsers(req, res);
        }
    }

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
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
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel.findUserById(userId)
            .then(function (user) {
                res.json(user);
            });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .updateUser(userId, user)
            .then(function (status) {
                res.sendStatus(200).send(status);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (status) {
                res.sendStatus(200).send(status);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }
};