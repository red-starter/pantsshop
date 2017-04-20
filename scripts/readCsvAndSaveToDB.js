var fs = require('fs');
var async = require('async');
var _ = require('lodash');
var csvParse = require('csv-parse/lib/sync');

// db connection
var db = require('../models/db')
var Inventory = require('../models/inventory');
var Product = require('../models/product');

// read in all the csv files
inventoryCSV = fs.readFileSync('csv/inventory.csv')
productsCSV = fs.readFileSync('csv/products.csv')

var parseOptions = {
	skip_empty_lines: true,
	columns: true, 
	auto_parse: true, 
	ltrim: true,
	rtrim: true
};
// parse the files
var parsedInventory = csvParse(inventoryCSV, parseOptions);
var parsedProducts = csvParse(productsCSV, parseOptions);

function removeAll(cb){
 async.parallel({
 	productRemove: function(next){
 		Product.remove({}, next);
 	},
 	inventoryRemove: function(next){
 		Inventory.remove({}, next);
 	}
 },function(err, results){
 	if (err){
 		cb(err)
 	} else {
 		cb(null, results)
 	}
 })	
}

function insert(products, inventory, cb){
 async.parallel({
 	productInsert: function(next){
 		Product.create(parsedProducts, next);
 	},
 	inventoryInsert: function(next){
 		Inventory.create(parsedInventory, next);
 	}
 },function(err, results){
 	if (err){
 		cb(err)
 	} else {
 		cb(null, results)
 	}
 })	
}

if (!module.parent) {
	// remove all then insert all
	// create/insert all parsed objects into mongodb
	removeAll(function(err, resp){
		if (err){
			return console.log(err);
		};
		console.log('removed ' + resp.productRemove + ' products models from database');
		console.log('removed ' + resp.inventoryRemove + ' inventory models from database')
		insert(parsedProducts, parsedInventory, function(err,resp){
			if (err){
				return console.log(err);
			};
			console.log('inserted ' + resp.productInsert.length + ' products models into database');
			console.log('inserted ' + resp.inventoryInsert.length + ' inventory models into database');
			process.exit();
		});
	});
};
