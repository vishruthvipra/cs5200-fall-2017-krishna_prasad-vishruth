/**
 * Created by vishruthkrishnaprasad on 11/3/17.
 */
module.exports = function(app, mongoose) {
    var appointmentSchema = mongoose.Schema({
        docName: {type: String},
        patName: {type: String},
        description: {type: String},
        dateOfAppt: {type: Date},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'AppointmentModel'});

    return appointmentSchema;
};


