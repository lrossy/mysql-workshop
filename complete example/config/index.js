"use strict";

const path 	= require("path");
const fs 		= require("fs");
const _ 		= require("lodash");

module.exports = {

	isDevMode() {
		return !process.env.NODE_ENV || process.env.NODE_ENV === "development";
	}, 

	isProductionMode() {
		return process.env.NODE_ENV === "production";
	}
};

// Load external configuration if exists `config.js`
let externalConfig = {};

let baseConfig = require("./base");

let config = {};

if (module.exports.isProductionMode()) {
	console.log("Load production config...");
	config = require("./prod");
}

module.exports = _.defaultsDeep(externalConfig, config, baseConfig, module.exports);

