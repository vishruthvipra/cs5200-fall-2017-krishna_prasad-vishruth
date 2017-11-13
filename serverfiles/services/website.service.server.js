/**
 * Created by vishruthkrishnaprasad on 20/2/17.
 */
module.exports = function (app, model) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findWebsite);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);
    // app.delete("/api/website/:websiteId", deleteWebsite);

    var userModel = model.userModel;
    var websiteModel = model.websiteModel;
    var pageModel = model.pageModel;
    var widgetModel = model.widgetModel;

    // var autoincr = 800;
    // var websites = [
    //     { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    //     { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    //     { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    //     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    //     { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    //     { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    // ];

    function createWebsite(req, res) {
        var newWebsite = req.body;
        var userId = req.params.userId;

        websiteModel
            .createWebsiteForUser(userId, newWebsite)
            .then(function (website) {
                return userModel.addWebsite(userId, website._id);
                //res.json(website);
            })
            .then(function (doc) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // websites.push({_id: String(autoincr),
        //     name: newWebsite.name,
        //     developerId: userId,
        //     description: newWebsite.description
        // });
        // autoincr++;
        // res.json(websites[websites.length - 1]);
        // return;
    }


    function findWebsite(req, res) {
        var userId = req.params.userId;
        var name = req.query.name;
        if (userId && name) {
            findWebsiteByName(req, res);
        }
        else if (userId) {
            findAllWebsites(req, res);
        }
    }

    function findWebsiteByName(req, res) {
        var name = req.query.name;
        websiteModel
            .findWebsiteByName(name)
            .then(function (website) {
                if (website) {
                    res.json(website);
                }
                else {
                    res.sendStatus(500).send();
                }
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // var website = websites.find(function (w) {
        //     return w.name == name;
        // });
        // if (website) {
        //     res.json(website);
        // }
        // else {
        //     res.sendStatus(400);
        // }
    }

    function findAllWebsites(req, res) {
        var userId = req.params.userId;

        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // var sites = [];
        // for (var w in websites) {
        //     if(userId == websites[w].developerId) {
        //         sites.push(websites[w])
        //     }
        // }
        // res.json(sites);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel.findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // var website = websites.find(function (w) {
        //     if(w._id == websiteId) {
        //          return websiteId;
        //     }
        // });
        // res.json(website);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;

        websiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(function (status) {
                res.send(200);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // for (var w in websites) {
        //     if(websites[w]._id == websiteId) {
        //         websites[w].name = newWebsite.name;
        //         websites[w].description = newWebsite.description;
        //         res.json(websites[w]);
        //         return;
        //     }
        // }
    }

    function deleteWebsite(req, res) {
        var userId = req.params.userId;
        var websiteId = req.params.websiteId;

        websiteModel
            .deleteWebsite(websiteId)
            .then(function (website) {
                return userModel.deleteWebsite(userId, website._id);
                //res.json(website);
            })
            .then(function (doc) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // for (var w in websites) {
        //     if(websites[w]._id == websiteId) {
        //         var websiteDeleted = websites[w];
        //         websites.splice(w,1);
        //         res.send(websiteDeleted);
        //         return;
        //     }
        // }
    }
};