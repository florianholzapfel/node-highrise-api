/**
 * notes.js
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
var util = require('util');

var notes = function (client) {
	this.client = client;
};
notes.prototype.delete = function (id, callback) {
	var url = '/notes/' + id + '.xml';

	this.client.send('DELETE', url, function (err, res) {
		callback(err);
	});
};
notes.prototype.create = function (options, callback) {
	var path = '/people/' + options.subject_id + '/notes.xml';
	this.client.create_item(path,
		util.format('<note><body>%s</body></note>', options.note),
		callback, notes);
};
notes.prototype.get = function (options, callback) {
	var url = '/' + options.type + '/' + options.subject + '/notes.xml';
	var first = true;
	
	delete options.type;
	delete options.subject;

	for (var k in options) {
		url += first ? '?' : '&';
		url += k + '=' + escape(options[k]);
	}
	
	this.client.get_items(url, callback, require('./note'), 'notes', 'note');
};

module.exports = notes;
