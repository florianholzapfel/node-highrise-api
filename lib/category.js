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

var category = function (client, xml) {
	this.client = client;
	if (xml) {
		var get_type = function (type) {
			return type;
		};
		this.get_type = get_type.bind(this, xml['task-category'] ?
							'task-category' : 'deal-category');
		utils.parse_xml(this,
			xml['task-category'] || xml['deal-category'] || xml);
	}
};
category.prototype.create = function (item, callback) {
	var path = '/' + item.type + '_categories.xml';
	delete item.type;
	this.client.create_item(path, utils.to_xml(item,
								this.get_type() + '-category'), callback,
								category);
};
category.prototype.delete = function (callback) {
	var url = '/' + this.get_type() + '_categories/' + this.id + '.xml';

	this.client.send('DELETE', url, function (err, res) {
		callback(err);
	});
};
category.prototype.get = function (type, id, callback) {
	this.client.get_item('/' + type + '_categories/' + id + '.xml',
							callback, category);
};
category.prototype.to_xml = function (excluded_keys) {
	return utils.to_xml(this, this.get_type() + '-category', excluded_keys);
};
category.prototype.update = function (callback) {
	var path = '/' + this.get_type() + '_categories/' + this.id + '.xml';
	this.client.send('PUT', path, this.to_xml(this.get_type()), callback);
};

module.exports = category;
