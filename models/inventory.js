var mongoose = require('mongoose');

inventorySchema = new mongoose.Schema({
  "product_id": {
  	type: Number, 
    index: true
  },
  "waist":{
  	type: String
  },
  "length":{
  	type: Number
  },
  "style":{
  	type: String
  },
  "count":{
  	type: Number
  }
});
Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
