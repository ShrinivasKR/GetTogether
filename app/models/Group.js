// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
    id: { type: int }//or string?
    name: { type: String }
    owner: { type: Nerd }
    schedule: { type: Event[] }
    members: { type: Nerd[] }
})
// define our group model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Group', groupSchema);