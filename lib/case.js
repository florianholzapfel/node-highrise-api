/**
 * case.js
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

var kase = function (client, xml) {
	this.client = client;
	if (xml) {
		utils.parse_xml(this, xml.kase || xml);
	}
};
kase.prototype.create = function (item, callback) {
	this.client.create_item('/kases.xml', utils.to_xml(item, 'kase'),
							callback, kase);
};
kase.prototype.delete = function (callback) {
	var url = '/kases/' + this.id + '.xml';

	this.client.send('DELETE', url, function (err, res) {
		callback(err);
	});
};
kase.prototype.get = function (id, callback) {
	this.client.get_item('/kases/' + id + '.xml', callback, kase);
};
kase.prototype.to_xml = function (excluded_keys) {
	return utils.to_xml(this, 'kase', excluded_keys);
};
kase.prototype.update = function (callback) {
	var path = '/kases/' + this.id + '.xml';
	this.client.send('PUT', path, this.to_xml(), callback);
};

module.exports = kase;
