// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    id: { type: int }//or string?
    time: { type: Time }
    date: { type: Date }
    location: { type: GPS }
})
// define our event model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Event', eventSchema);