/**
 * cases.js
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

var cases = function(client) {
	this.client = client;
};
cases.prototype.delete = function(id, callback) {
	var url = '/kases/' + id + '.xml';

	this.client.send('DELETE', url, function(err, res) {
		callback(err);
	});
};
cases.prototype.get = function(open, callback) {
	this.client.send('GET', open ? '/kases/open.xml' : '/kases/closed.xml', function(err, res) {
		if(err) {
			callback(err);
		} else {
			xml2js.parseString(res.data, function(err, res) {
				if(err) {
					callback(err);
				} else {
					var cases = [];
					if(res.kases) {
						for(var i = 0; i < res.kases.kase.length; ++i) {
							var p = new (require('./case'))(client, res.kases.kases[i]);
							cases.push(p);
						}
					}
					callback(null, cases);
				}
			});
		}
	});
};

module.exports = cases;
