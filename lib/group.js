/**
 * group.js
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

var group = function (client, xml) {
	this.client = client;
	this.users = [];

	if (xml) {
		var user_array = xml.group ?
				xml.group.users[0].user : xml.users[0].user;
		for (var i = 0; i < user_array.length; ++i) {
			var u = new (require('./user'))(client, user_array[i]);
			this.users.push(u);
		}

		if (xml.group) {
			delete xml.group.users;
		} else {
			delete xml.users;
		}

		utils.parse_xml(this, xml.group || xml);
	}
};
group.prototype.create = function (item, callback) {
	this.client.create_item('/groups.xml', utils.to_xml(item, 'group'),
							callback, group);
};
group.prototype.delete = function (callback) {
	var url = '/groups/' + this.id + '.xml';

	this.client.send('DELETE', url, function (err, res) {
		callback(err);
	});
};
group.prototype.get = function (id, callback) {
	this.client.get_item('/groups/' + id + '.xml', callback, group);
};
group.prototype.to_xml = function (excluded_keys) {
	return utils.to_xml(this, 'group', excluded_keys);
};
group.prototype.update = function (callback) {
	var path = '/groups/' + this.id + '.xml';
	this.client.send('PUT', path, this.to_xml(), callback);
};

module.exports = group;
