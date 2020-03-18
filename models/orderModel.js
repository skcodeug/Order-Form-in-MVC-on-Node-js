const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

let OrderSchema = new Schema ({
   tableNo: {type: Number, required: true, max: 20},
   menuNo: {type: Number, required: true},
   outlet: {type: String, required: false},
   dateOo: {type: Date},
   waiterNo: {type: Number, required: true}
});

module.exports = mongoose.model('Order', OrderSchema);