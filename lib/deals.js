/**
 * deals.js
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
/* global escape: true */
var deals = function (client) {
	this.client = client;
};
deals.prototype.delete = function (id, callback) {
	var url = '/deals/' + id + '.xml';

	this.client.send('DELETE', url, function (err, res) {
		callback(err);
	});
};
deals.prototype.get = function (options, callback) {
	var cb = callback || options;
	var url = '/deals.xml';
	
	if (options) {
		var first = true;

		for (var k in options) {
			url += first ? '?' : '&';
			url += k + '=' + escape(options[k]);
		}
	}
	
	this.client.get_items(url, cb, require('./deal'), 'deals', 'deal');
};

module.exports = deals;
