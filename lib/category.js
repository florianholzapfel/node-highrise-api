/**
 * category.js
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
var utils = require('./utils');

var category = function(client, xml) {
	this.client = client;
	if(xml) {
		utils.parse_xml(this, xml['task-category'] || xml['deal-category'] || xml);
	}
};
category.prototype.create = function(type, item, callback) {
	var path = '/' + type + '_categories.xml';
	this.client.create_item(path, utils.to_xml(item, type + '-category'), callback, category);
};
category.prototype.delete = function(type, callback) {
	var url = '/' + type + '_categories/' + this.id + '.xml';

	this.client.send('DELETE', url, function(err, res) {
		callback(err);
	});
};
category.prototype.get = function(type, id, callback) {
	this.client.get_item('/' + type + '_categories/' + id + '.xml', callback, category);
};
category.prototype.to_xml = function(type, excluded_keys) {
	return utils.to_xml(this, type + '-category', excluded_keys);
};
category.prototype.update = function(type, callback) {
	var path = '/' + type + '_categories/' + this.id + '.xml';
	this.client.send('PUT', path, this.to_xml(type), callback);
};

module.exports = category;
