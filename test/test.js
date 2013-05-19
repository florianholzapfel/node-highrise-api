#!/usr/bin/env node
/**
 * test.js
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
var highrise = require('..');

var client = new highrise({
	secure: true,
	username: '<COMPANY_NAME>',		// e.g. http://COMPANY_NAME.highrisehq.com
	token: '<YOUR_TOKEN>'
});

client.account.get(function(err, account) {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(account, null, "  "));
	}
});

client.cases.get(true, function(err, cases) {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(cases));
	}
});

client.deletions.get(function(err, deletions) {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(deletions));
	}
});

client.companies.get(function(err, companies) {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(companies));
	}
});

client.company.get(127058450, function(err, company) {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(company));
	}
});

client.people.get(function(err, people) {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(people));
	}
});

client.person.get(140390490, function(err, person) {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(person));
	}
});

client.deals.get(function(err, deals) {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(deals, null, "  "));
	}
});

client.deal.get(2820547, function(err, deal) {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(deal, null, "  "));
	}
});

client.notes.get({
	type: 'people',
	subject: 166222215
}, function(err, notes) {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(notes, null, "  "));
	}
});

client.note.get(161143856, function(err, note) {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(note, null, "  "));
		
		note.comments(function(err, comments) {
			console.log(JSON.stringify(comments, null, "  "));
		});
	}
});

client.comment.get(161144101, function(err, comment) {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(comment, null, "  "));
	}
});

client.categories.get('task', function(err, categories) {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(categories, null, "  "));
	}
});

client.category.get('task', 4443591, function(err, category) {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(category, null, "  "));
	}
});

client.tasks.get({
	type: 'kases',
	subject: 915784
}, function(err, tasks) {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(tasks, null, "  "));
	}
});

client.task.get(29688979, function(err, category) {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(category, null, "  "));
	}
});

client.users.get(function(err, users) {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(users, null, "  "));
	}
});

client.user.get(905287, function(err, user) {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(user, null, "  "));
	}
});

client.user.me(function(err, user) {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(user, null, "  "));
	}
});
