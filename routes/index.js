var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Inventory = require('../models/inventory');
var async = require('async');
var _ = require('lodash');

/* GET home page and load all the models. */
router.get('/', function(req, res, next) {
	// load up the products and inventory
	Product.find({}).lean().exec(function(err, products){
		Inventory.find({}).lean().exec(function(err, inventory){
			groupedInventory = _.groupBy(inventory, 'product_id')
			// attach inventory information to product
			// join the data here and render the html
			_.each(products, (product) => {
				product_id = product.product_id
				inventory = groupedInventory[product_id]
				product.inventory = inventory
			})
			res.render('index', { title: 'Pants shop', products: products});
		})
	})
});


module.exports = router;
