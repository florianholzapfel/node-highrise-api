/**
 * task.js
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
var util = require('util');

var task = function (client, xml) {
	this.client = client;
	if (xml) {
		utils.parse_xml(this, xml.task || xml);
	}
};
task.prototype.create = function (item, callback) {
	this.client.create_item('/tasks.xml', utils.to_xml(item, 'task'),
		callback, task);
};
task.prototype.complete = function (done_at, callback) {
	if (typeof done_at === 'function') {
		callback = done_at;
		done_at = new Date();
	}

	var path = '/tasks/' + this.id + '/complete.xml';
	var xml = util.format('<task><done-at>%s</done-at></task>',
		done_at.toISOString());
	this.client.send('PUT', path, this.to_xml(), callback);
};
task.prototype.delete = function (callback) {
	var url = '/tasks/' + this.id + '.xml';

	this.client.send('DELETE', url, function (err, res) {
		callback(err);
	});
};
task.prototype.get = function (id, callback) {
	this.client.get_item('/tasks/' + id + '.xml', callback, task);
};
task.prototype.to_xml = function (excluded_keys) {
	return utils.to_xml(this, 'task', excluded_keys);
};
task.prototype.update = function (callback) {
	var path = '/tasks/' + this.id + '.xml';
	this.client.send('PUT', path, this.to_xml(), callback);
};

module.exports = task;
