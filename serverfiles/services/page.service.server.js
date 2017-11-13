/**
 * Created by vishruthkrishnaprasad on 20/2/17.
 */
module.exports = function (app, model) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findPage);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/website/:websiteId/page/:pageId", deletePage);
    app.get("/api/page/:pageId/widgets", findAllWidgets);

    var userModel = model.userModel;
    var websiteModel = model.websiteModel;
    var pageModel = model.pageModel;
    var widgetModel = model.widgetModel;


    // var autoincr = 600;
    // var pages = [
    //     {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    //     {"_id": "432", "name": "Post 2", "websiteId": "789", "description": "Lorem"},
    //     {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"},
    //     {"_id": "430", "name": "Post 10", "websiteId": "789", "description": "Lorem"}
    // ];

    function createPage(req, res) {
        var newPage = req.body;
        var websiteId = req.params.websiteId;

        pageModel
            .createPage(websiteId, newPage)
            .then(function (page) {
                return websiteModel.addPage(websiteId, page._id);
            })
            .then(function (doc) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // var newPage = req.body;
        // var websiteId = req.params.websiteId;
        // pages.push({_id: String(autoincr),
        //     name: newPage.name,
        //     websiteId: websiteId,
        //     description: newPage.description
        // });
        // autoincr++;
        // res.json(pages[pages.length - 1]);
        // return;
    }

    function findPage(req, res) {
        var websiteId = req.params.websiteId;
        var name = req.query.name;
        if (websiteId && name) {
            findPageByName(req, res);
        }
        else if (websiteId) {
            findAllPages(req, res);
        }
    }

    function findPageByName(req, res) {
        var name = req.query.name;
        pageModel
            .findPageByName(name)
            .then(function (page) {
                if (page) {
                    res.json(page);
                }
                else {
                    res.sendStatus(500).send();
                }
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // var name = req.query.name;
        // var page = pages.find(function (p) {
        //     return p.name == name;
        // });
        // if (page) {
        //     res.json(page);
        // }
        // else {
        //     res.sendStatus(400);
        // }
    }

    function findAllPages(req, res) {
        var websiteId = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            }, function (error) {
                res.sendStatus(500).send(error);
            });


        // var websiteId = req.params.websiteId;
        // var sites = [];
        // for (var p in pages) {
        //     if(websiteId == pages[p].websiteId) {
        //         sites.push(pages[p])
        //     }
        // }
        // res.json(sites);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel.findPageById(pageId)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // var pageId = req.params.pageId;
        // var page = pages.find(function (p) {
        //     if(p._id == pageId) {
        //         return pageId;
        //     }
        // });
        // res.json(page);
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;

        pageModel
            .updatePage(pageId, newPage)
            .then(function (status) {
                res.send(200);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // var pageId = req.params.pageId;
        // var newPage = req.body;
        // for (var p in pages) {
        //     if(pages[p]._id == pageId) {
        //         pages[p].name = newPage.name;
        //         pages[p].description = newPage.description;
        //         res.json(pages[p]);
        //         return;
        //     }
        // }
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        var websiteId = req.params.websiteId;

        pageModel
            .deletePage(pageId)
            .then(function (page) {
                return websiteModel.deleteWebsite(websiteId, page._id);
                //res.json(website);
            })
            .then(function (doc) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // var pageId = req.params.pageId;
        // for (var p in pages) {
        //     if(pages[p]._id == pageId) {
        //         var pageDeleted = pages[p];
        //         pages.splice(p,1);
        //         res.send(pageDeleted);
        //         return;
        //     }
        // }
    }

    function findAllWidgets (req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

        // var pageId = req.params.pageId;
        // var sites = [];
        // for (var p in widgets) {
        //     if(pageId == widgets[p].pageId) {
        //         sites.push(widgets[p])
        //     }
        // }
        // res.json(sites);
    }

};