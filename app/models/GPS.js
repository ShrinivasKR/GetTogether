// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gpsSchema = new Schema({
    longitude: { type: long, min:-180, max:180, default: 0 }
    latitude: { type: long, min:-90, max:90, default: 0 }
})
// define our gps model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('GPS', gpsSchema);