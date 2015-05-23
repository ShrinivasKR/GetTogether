// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nerdSchema = new Schema({
    name: { type: String, default: 'New Nerd' }
    email: { type: String } //need default values for?
    password: { type: String } //                  |
    location: { type: GPS }    //                  |
    groups: { type: Group[] }  //                  |
    schedule: { type: Event[] }//                  v
})
// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Nerd', nerdSchema);
