const bodyParser = require("body-parser");
const express = require("express");

module.exports = function(app) {
	// setting the template engine
	app.set("view engine", "ejs");

	// point it to public dir
	app.use(express.static("./public"));

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }));

	// parse application/json
	app.use(bodyParser.json());
};
