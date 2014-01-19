/**
 * tasks.js
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
var tasks = function (client) {
	this.client = client;
};
tasks.prototype.delete = function (id, callback) {
	var url = '/tasks/' + id + '.xml';

	this.client.send('DELETE', url, function (err, res) {
		callback(err);
	});
};
tasks.prototype.get = function (options, callback) {
	if (arguments.length === 2) {
		var url = '/' + options.type + '/' + options.subject + '/tasks.xml';

		this.client.get_items(url, callback, require('./task'),
			'tasks', 'task');
	} else {
		this.all(options);
	}
};
tasks.prototype.upcoming = function (callback) {
	this.client.get_items('/tasks/upcoming.xml', callback, require('./task'),
		'tasks', 'task');
};
tasks.prototype.assigned = function (callback) {
	this.client.get_items('/tasks/assigned.xml', callback, require('./task'),
		'tasks', 'task');
};
tasks.prototype.completed = function (callback) {
	this.client.get_items('/tasks/completed.xml', callback, require('./task'),
		'tasks', 'task');
};
tasks.prototype.today = function (callback) {
	this.client.get_items('/tasks/today.xml', callback, require('./task'),
		'tasks', 'task');
};
tasks.prototype.all = function (callback) {
	this.client.get_items('/tasks/all.xml', callback, require('./task'),
		'tasks', 'task');
};

module.exports = tasks;
