/**
 * client.js
 *
 * Copyright (C) 2013 by Florian Holzapfel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
**/
var xml2js = require('xml2js');

var client = function(config) {
	var protocol = (undefined === config.secure || config.secure) ? 'https' : 'http';
	var host = config.username + '.highrisehq.com';
	var token = config.token;
	
	return {
		send: function(method, path, callback) {
			var options = {
				host: host,
				path: path,
				method: method,
				headers: {
					authorization: "Basic " + new Buffer(token + ":X", "ascii").toString("base64")
				}
			};
	
			var req = require(protocol).request(options, function(res) {
				var data = "";
				res.on("data", function(chunk) {
					data += chunk;
				});
				res.on("end", function() {
					if(res.statusCode >= 400 && res.statusCode < 600 || res.statusCode < 10) {
						callback(res.statusCode);
					} else {
						res.data = data;
						callback(null, res);
					}
				});
			});
			req.on("error", function(e) {
				callback(e.message);
			});
			req.end();
		},
		get_items: function(url, callback, item_factory, arr_name, item_name) {
			var client = this;

			this.send('GET', url, function(err, res) {
				if(err) {
					callback(err);
				} else {
					xml2js.parseString(res.data, function(err, res) {
						if(err) {
							callback(err);
						} else {
							var items = [];
							if(res[arr_name]) {
								for(var i = 0; i < res[arr_name][item_name].length; ++i) {
									var p = new item_factory(client, res[arr_name][item_name][i]);
									items.push(p);
								}
							}
							callback(null, items);
						}
					});
				}
			});
		},
		get_item: function(url, callback, item_factory) {
			var client = this;

			this.send('GET', url, function(err, res) {
				if(err) {
					callback(err);
				} else {
					xml2js.parseString(res.data, function(err, res) {
						if(err) {
							callback(err);
						} else {
							callback(null, new item_factory(client, res))
						}
					});
				}
			});
		}
	};
};

var highrise = function(config) {
	this.client = new client(config);
	this.cases = new (require('./cases'))(this.client);
	this.case = new (require('./case'))(this.client);
	this.companies = new (require('./companies'))(this.client);
	this.company = new (require('./company'))(this.client);
	this.deletions = new (require('./deletions'))(this.client);
	this.people = new (require('./people'))(this.client);
	this.person = new (require('./person'))(this.client);
};

module.exports = highrise;
