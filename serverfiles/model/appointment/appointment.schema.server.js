/**
 * Created by vishruthkrishnaprasad on 11/3/17.
 */
module.exports = function(app, mongoose) {
    var appointmentSchema = mongoose.Schema({
        docName: {type: String, required: true},
        patName: {type: String, required: true},
        description: {type: String},
        dateOfAppt: {type: Date, required: true},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'AppointmentModel'});

    return appointmentSchema;
};


