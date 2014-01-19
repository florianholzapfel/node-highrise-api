/**
 * tags.js
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
var tags = function (client) {
	this.client = client;
};
tags.prototype.get = function (options, callback) {
	if (callback) {
		var path = '/' + options.subject_type + '/' +
			options.subject_id + '/tags.xml';
		this.client.get_items(path, callback, require('./tag'), 'tags', 'tag');
	} else {
		this.client.get_items('/tags.xml', options, require('./tag'),
			'tags', 'tag');
	}
};
tags.prototype.tagged = function (id, callback) {
	var path = '/tags/' + id + '.xml';
	this.client.get_items(path, callback, require('./party'),
		'parties', 'party');
};

module.exports = tags;
