/**
 * utils.js
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
var util = require('util');

function get_arr_key(object) {
	for (var key in object) {
		if (key !== '$') {
			return key;
		}
	}
	return null;
}

var parse_xml = function (object, xml_object) {
	var get_name = function (name) {
		return name;
	};

	for (var key in xml_object) {
		var o = xml_object[key][0];
		key = key.replace('-', '_');
		
		if (typeof(o) === 'string') {
			if (o === 'true') {
				object[key] = true;
			} else if (o === 'false') {
				object[key] = false;
			} else {
				object[key] = o;
			}
		} else if (typeof(o) === 'object') {
			if (typeof(o.$) === 'object') {
				if (o.$.nil === 'true') {
					object[key] = null;
				} else if (o.$.type === 'array') {
					var arr_key = get_arr_key(o);

					object[key] = [];
					
					if (arr_key) {
						object[key].get_name = get_name.bind(null, arr_key);

						for (var i = 0; i < o[arr_key].length; ++i) {
							object[key].push({});
							parse_xml(object[key][i], o[arr_key][i]);
						}
					}
				} else if (o.$.type === 'datetime') {
					object[key] = new Date(o._);
				} else if (o.$.type === 'integer') {
					object[key] = parseInt(o._);
				}
			} else {
				object[key] = { };
				parse_xml(object[key], o);
			}
		}
	}
};
var to_xml = function (object, name, excluded_keys) {
	if (excluded_keys) {
		excluded_keys.push('client');
	} else {
		excluded_keys = [ 'client' ];
	}
	
	function isKeyExcluded(key) {
		for (var i = 0; i < excluded_keys.length; ++i) {
			if (key === excluded_keys[i]) {
				return true;
			}
		}
		return false;
	}
	
	var res = util.format('<%s>', name);

	for (var key in object) {
		if (isKeyExcluded(key)) {
			continue;
		}
		
		var value = object[key];
		key = key.replace('_', '-');

		if (typeof(value) === 'function') {
			continue;
		} else if (typeof(value) === 'object') {
			if (value === null) {
				res += util.format('<%s></%s>', key, key);
			} else if (util.isDate(value)) {
				res += util.format('<%s type="datetime">%s</%s>', key,
									value.toISOString(), key);
			} else if (util.isArray(value)) {
				if (value.length) {
					res += util.format('<%s type="array">', key);
					for (var i = 0; i < value.length; ++i) {
						res += to_xml(value[i], value.get_name());
					}
					res += util.format('</%s>', key);
				} else {
					res += util.format('<%s type="array"/>', key);
				}
			} else {
				res += to_xml(value, key);
			}
		} else if (typeof(value) === 'string') {
			res += util.format('<%s>%s</%s>', key, value, key);
		} else if (typeof(value) === 'number') {
			res += util.format('<%s type="integer">%d</%s>', key, value, key);
		} else if (typeof(value) === 'boolean') {
			res += util.format('<%s>%s</%s>', key,
								value ? 'true' : 'false', key);
		}
	}
	
	res += util.format('</%s>', name);
	return res;
};

module.exports.parse_xml = parse_xml;
module.exports.to_xml = to_xml;
