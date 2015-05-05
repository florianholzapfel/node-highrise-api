# node-highrise-api
[![Build Status](https://travis-ci.org/florianholzapfel/node-highrise-api.png)](https://travis-ci.org/florianholzapfel/node-highrise-api) [![NPM version](https://badge.fury.io/js/node-highrise-api.png)](http://badge.fury.io/js/node-highrise-api) [![Dependency Status](https://david-dm.org/florianholzapfel/node-highrise-api.png)](https://david-dm.org/florianholzapfel/node-highrise-api)

**I am no longer working on this project. If you are interested to continue working on it, please let me know.**

As the name already implies, this project implements the API for [Highrise] [1], 37signals' CRM system.

The implementation currently only allows to retrieve data from Highrise. Updating records will be implemented in the future.

## Getting started

In your shell, install with npm:

```sh
npm install node-highrise-api
```

In your code:

```javascript
var highrise = require('node-highrise-api');

var client = new highrise({
	username: '<company-username>',
	token: '<user-token>'
});

client.people.get(function(err, people) {
	if(err) {
		console.log(err);
	} else {
		console.log(people);
	}
});
```

### Unit test ###
You can run the automated unit test using the following command line:

```
ACCOUNT=YOUR_ACCOUNT TOKEN=YOUR_ACCOUNT_TOKEN npm test
```

```YOUR_ACCOUNT``` and ```YOUR_TOKEN``` need to be replaced with correct values.

Although, the unit test is desgined to not modify your Highrise installation (it deletes all objects it creates and does not modify or delete already existing objects), please use it at your **OWN RISK**.

## References ##
 * [Highrise API] [2]

## Formalia

```
Copyright (C) 2013 by Florian Holzapfel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

[1]: http://highrisehq.com
[2]: https://github.com/37signals/highrise-api
