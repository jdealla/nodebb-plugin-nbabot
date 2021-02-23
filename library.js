'use strict';

const Posts = require.main.require('./src/posts');
const { create } = Posts;

const { uid, bot, trigger} = require('./src/config');
const build = require('./src/build');
const api = require('./src/api');


const getBotArguments = content => {
	const arr = content.split('\n');
	return arr.reduce( (acc, str) => {
		str = str.toLowerCase().trim();
		if (str.includes(trigger + bot) && !str.includes('>')) {
			acc = str.split(' ');
		}
		return acc;
	}, false );
};

const chooseAction = botArgs => {
	const mainArg = botArgs[1];
	let action = "scoreboard";
	switch(mainArg) {
		case 'scoreboard':
		case 'scores':
		case 'live':
		case 'today':
			action = 'scoreboard'
			break;
		default:
			action = 'help'
	  }
	  return action;
};

const reply = async (postData) => {	
	try {
		const { post } = postData;
		const originalContent = post.content;
		const botArguments = getBotArguments(originalContent); 
		if (!botArguments) {
			return;
		}
		else {
			const { tid } = post;
			const toPid = post.pid;
			const action = chooseAction(botArguments);
			const args = botArguments.slice(2);
			const res = await api[action](...args);
			let content;
			if (action !== 'help') {
				content = build[action](res);
			} else {
				content = res;
			}
			const payload = { uid, tid, content, toPid };
			create(payload);
		}
	} catch(e){
		console.log(e);
		return;
	}
};

const plugin = {
	reply,
};

module.exports = plugin;
