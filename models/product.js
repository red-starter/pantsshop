var mongoose = require('mongoose');
productSchema = new mongoose.Schema({
  "product_id": {
  	type: Number, 
    unique: true,
    index: true
  },
  "product_name":{
  	type: String
  },
  "product_image":{
  	type: String
  },
  "product_description":{
  	type: String
  }
});
Product = mongoose.model('Product', productSchema);

module.exports = Product;
