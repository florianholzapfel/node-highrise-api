/**
 * people.js
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

function retrieve_people(client, url, callback) {
	client.send('GET', url, function(err, res) {
		if(err) {
			callback(err);
		} else {
			xml2js.parseString(res.data, function(err, res) {
				if(err) {
					callback(err);
				} else {
					var people = [];
					for(var i = 0; i < res.people.person.length; ++i) {
						var p = new (require('./person'))(client, res.people.person[i]);
						people.push(p);
					}
					callback(null, people);
				}
			});
		}
	});
}

var people = function(client) {
	this.client = client;
};
people.prototype.get = function(options, callback) {
	var self = this;
	var cb = callback || options;
	var url;

	if(typeof(options) == 'number') {
		url = '/companies/' + options + '/people.xml';
	} else {
		url = '/people.xml';
		
		if(options) {
			var first = true;

			for(var k in options) {
				url += first ? '?' : '&';
				url += k + '=' + escape(options[k]);
			}
		}
	}
	
	retrieve_people(this.client, url, cb);
};
people.prototype.find = function(options, callback) {
	var self = this;
	var cb = callback || options;
	var first = true;
	var url = '/people/search.xml';

	for(var k in options) {
		url += first ? '?' : '&';
		url += 'criteria[' + k + ']=' + escape(options[k]);
	}

	retrieve_people(this.client, url, cb);
};

module.exports = people;
