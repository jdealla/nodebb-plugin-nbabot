'use strict';

const Posts = require.main.require('./src/posts');
const { create } = Posts;

const axios = require('axios').default;
const postRequest = (url, str) => axios({
    method: 'post',
    url,
    data: {content: str },
  });

const { uid, bot, trigger} = require('./src/config');
const templates = require('./src/templates/index')

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

const reply = async (postData) => {	
	try {
		const { post } = postData;
		const originalContent = post.content;
		const botArguments = getBotArguments(originalContent); 
		if (!botArguments) {
			return;
		}
		else {
			console.log('--------------JDD--------------- WERE IN');
			let content;
			const { tid } = post;
			const toPid = post.pid;
			const res = await postRequest('http://localhost:8080/nbabot', botArguments.join(' '));
			const { data } = res;
			if (data.hasOwnProperty('message')) {
				content = data.message;
			} else {
				console.log(templates)
				console.log(data.template)
				content = templates[data.template](data);
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
