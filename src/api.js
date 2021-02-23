const axios = require('axios').default;
const get = uri => axios.get(uri);
const { getCurrentDate } = require('./lib');

const scoreboard = async date => {
    if (!date) {
        date = getCurrentDate('api');
    }
    try {
        const uri = `http://data.nba.net/10s/prod/v1/${date}/scoreboard.json`;
        const res = await get(uri);
        console.log({'apiresponse': res.data})
        return { date, res };
    } catch (e) {
        console.log(e);
        return e;
    }
};

const help = () => `Here is a list of commands\n * \`scores <YYYYMMDD>\` - gets all scheduled, current, and finished games for today, or for a given date with a date parameter.`

module.exports = {
    scoreboard,
    help
};