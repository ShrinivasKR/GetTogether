// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    id: { type: Number },//or string?
    //time: { type: Time },
    date: { type: Date }, // The built-in mongoose 'Date' includes time, apparently
    location: { type: Schema.ObjectId } // Links to a GPS Object ID
})
// define our event model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Event', eventSchema);