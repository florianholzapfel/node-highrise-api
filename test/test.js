/**
 * test.js
 *
 * Copyright (C) 2013 by Florian Holzapfel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
**/
var highrise = require('..');
var assert = require('chai').assert;

var client = new highrise({
	secure: true,
	username: process.env.ACCOUNT,
	token: process.env.TOKEN
});

describe('General', function () {
	it('Test environment should be defined', function () {
		assert.isDefined(process.env.ACCOUNT, 'ACCOUNT is defined');
		assert.isDefined(process.env.TOKEN, 'TOKEN is defined');
	});
});

describe('Account', function () {
	it('Get account', function (done) {
		client.account.get(function (err, account) {
			assert.isNull(err, 'there was an error');
			assert.equal(account.subdomain, process.env.ACCOUNT,
							'returned account equals queried account');
			assert.isTrue(account.ssl_enabled, 'account is ssl enabled');
			done();
		});
	});
});

describe('Cases', function () {
	it('Get open cases', function (done) {
		client.cases.get(true, function (err, cases) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
	it('Get closed cases', function (done) {
		client.cases.get(false, function (err, cases) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
});

describe('Deletions', function () {
	it('Get deletions', function (done) {
		client.deletions.get(null, function (err, deletions) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
});

describe('Companies', function () {
	it('Get companies', function (done) {
		client.companies.get(null, function (err, companies) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
});

describe('People', function () {
	it('Get people', function (done) {
		client.people.get(null, function (err, people) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
});

describe('Deals', function () {
	it('Get deals', function (done) {
		client.deals.get(null, function (err, deals) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
});

describe('Users', function () {
	it('Get users', function (done) {
		client.users.get(function (err, users) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
	it('Get myself', function (done) {
		client.user.me(function (err, user) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
});

describe('Groups', function () {
	it('Get groups', function (done) {
		client.groups.get(function (err, groups) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
});

describe('Memberships', function () {
	it('Get memberships', function (done) {
		client.memberships.get(function (err, memberships) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
});

describe('Subject fields', function () {
	it('Get subject fields', function (done) {
		client.subject_fields.get(function (err, subject_fields) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
});

describe('Parties', function () {
	it('Get deleted parties', function (done) {
		client.parties.deleted(null, function (err, parties) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
	it.skip('Get recently viewed parties', function (done) {
		client.parties.recently_viewed(function (err, parties) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
	it('Search parties', function (done) {
		client.parties.search(null, function (err, parties) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
});

/*
client.company.get(127058450, function (err, company) {
	if (err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(company));
	}
});

client.person.get(140390490, function (err, person) {
	if (err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(person));
	}
});

client.deal.get(2820547, function (err, deal) {
	if (err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(deal, null, '  '));
	}
});

client.notes.get({
	type: 'people',
	subject: 166222215
}, function (err, notes) {
	if (err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(notes, null, '  '));
	}
});

client.note.get(161143856, function (err, note) {
	if (err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(note, null, '  '));
		
		note.comments(function (err, comments) {
			console.log(JSON.stringify(comments, null, '  '));
		});
	}
});

client.comment.get(161144101, function (err, comment) {
	if (err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(comment, null, '  '));
	}
});

client.categories.get('task', function (err, categories) {
	if (err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(categories, null, '  '));
	}
});

client.category.get('task', 4443591, function (err, category) {
	if (err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(category, null, '  '));
	}
});

client.tasks.get({
	type: 'kases',
	subject: 915784
}, function (err, tasks) {
	if (err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(tasks, null, '  '));
	}
});

client.task.get(29688979, function (err, category) {
	if (err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(category, null, '  '));
	}
});

client.user.get(905287, function (err, user) {
	if (err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(user, null, '  '));
	}
});

client.group.get(479169, function (err, group) {
	if (err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(group, null, '  '));
	}
});

client.membership.get(1596426, function (err, membership) {
	if (err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(membership, null, '  '));
	}
});
*/
