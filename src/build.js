const { formatDate } = require('./lib');

const filterGames = games => games.reduce( (acc, game) => {
    const { isGameActivated, period } = game;
    const { current } = period;
    if (current === 0) {
        acc.scheduled.push(game);
    }
    if (isGameActivated) {
        acc.started.push(game);
    }
    if (current > 3 && !isGameActivated){
        acc.finished.push(game);
    }
    return acc;
}, { started: [], scheduled: [], finished: []});

const scheduledScoreboard = (scheduledGames) => {
    let response = "";
    // Build Title
    response = `## Scheduled NBA Games\n\n`;
    response += `| Home | Away | Location | Time (ET) | TV  |\n`;
    response += `| ---- | ---- | -------- | --------- | --- |\n`;
    scheduledGames.forEach( game => {
        const { hTeam, vTeam, arena, startTimeEastern, watch } = game;
        response += `| ${hTeam.triCode} (${hTeam.win}-${hTeam.loss}) | ${vTeam.triCode} (${vTeam.win}-${vTeam.loss}) | ${arena.name}, ${arena.city} ${arena.stateAbbr ? arena.stateAbbr : ""} | ${startTimeEastern} | ${watch.broadcast.broadcasters.national.length > 0 ? watch.broadcast.broadcasters.national[0].shortName : "Home: "+ watch.broadcast.broadcasters.hTeam[0].shortName + " Away: " + watch.broadcast.broadcasters.vTeam[0].shortName} |\n`;
    });
    return response;
};

const startedScoreboard = startedGames => {
    const getTime = (period, clock) => {
        const { current, isEndOfPeriod, isHalftime } = period;
        if (isHalftime) {
            return "HALF";
        }
        if (isEndOfPeriod) {
            return `END OF ${current}`;
        }
        let quarter = "";
        switch (current){
            case "1":
                quarter = "1ST";
                break;
            case "2":
                quarter = "2ND";
                break;
            case "3":
                quarter = "3RD";
                break;
            case "4":
                quarter = "4TH";
                break;
            default:
                quarter = current;
        }
        return `${quarter} ${clock}`
    }
    let response = "";
    response = `## Live NBA Games\n\n`;
    response += `| Home | Home Score | Away | Away Score | Time | TV  |\n`;
    response += `| ---- | ---------- | ---- | ---------- | ---- | --- |\n`;
    startedGames.forEach( game => {
        const { hTeam, vTeam, arena, startTimeEastern, watch, clock, period } = game;
        response += `| ${hTeam.triCode} (${hTeam.win}-${hTeam.loss}) | ${ hTeam.score } | ${vTeam.triCode} (${vTeam.win}-${vTeam.loss}) | ${ vTeam.score } | ${getTime(period, clock)} | ${watch.broadcast.broadcasters.national.length > 0 ? watch.broadcast.broadcasters.national[0].shortName : "Home: "+ watch.broadcast.broadcasters.hTeam[0].shortName + " Away: " + watch.broadcast.broadcasters.vTeam[0].shortName} |\n`;
    });
    return response;
};

const finishedScoreboard = finishedGames => {
    let response = "";
    response = `## Completed NBA Games\n\n`;
    response += `| Home | Home Score | Away | Away Score |\n`;
    response += `| ---- | ---------- | ---- | ---------- |\n`;
    finishedGames.forEach( game => {
        const { hTeam, vTeam } = game;
        response += `| ${hTeam.triCode} (${hTeam.win}-${hTeam.loss}) | ${ hTeam.score } | ${vTeam.triCode} (${vTeam.win}-${vTeam.loss}) | ${ vTeam.score } |\n`;
    });
    return response;
};

const scoreboard = data => {
    let { res, date } = data;
    console.log('-----------------------JDD----------------------BUILD---------------', {res})
    try {
        date = formatDate(date); 
        const { games } = res.data;
        if (games.length === 0) {
            return "There are no games scheduled for today."
        }
        const title = `# NBA Games for ${date}\n\n`;
        const filteredGames = filterGames(games);
        const finished = filteredGames.finished.length > 0 ? finishedScoreboard(filteredGames.finished) : "";
        const started = filteredGames.started.length > 0 ? startedScoreboard(filteredGames.started) : "";
        const scheduled = filteredGames.scheduled.length > 0 ? scheduledScoreboard(filteredGames.scheduled, date) : "";
        return title + scheduled + started + finished;
    } catch(e){
        console.log(e);
        return "Sorry, I couldn't find that info for you. Check your parameters and try again."
    }
};

module.exports = { scoreboard };