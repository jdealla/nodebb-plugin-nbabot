'use strict';

const Posts = require.main.require('./src/posts');
const { create } = Posts;
const { uid, bot, trigger, apiBase, token } = require('./src/config');

const axios = require('axios').default;
const postRequest = (url, str, postData ) => axios({
    method: 'post',
    url,
	headers : { Authorization: `Bearer ${token}`},
    data: { content: str, postData },
});

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
			const { tid } = post;
			const toPid = post.pid;
			const res = await postRequest(`${apiBase}/${bot}/content`, botArguments.join(' '), postData );
			const { data } = res;
			const content = data.content;
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
