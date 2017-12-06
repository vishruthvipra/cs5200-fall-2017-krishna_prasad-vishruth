/**
 * Created by vishruthkrishnaprasad on 20/2/17.
 */
module.exports = function (app, mongoose,passport) {
    var userModel = require("./model/user/user.model.server.js")(app, mongoose);
    var appointmentModel = require("./model/appointment/appointment.model.server")(app, mongoose);

    var model = {
        userModel: userModel,
        appointmentModel: appointmentModel
    };

    require("./services/user.service.server")(app, model, passport);
    require("./services/appointment.service.server")(app, model);
};