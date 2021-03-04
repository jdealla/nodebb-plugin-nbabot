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
        case 1:
            quarter = "1ST";
            break;
        case 2:
            quarter = "2ND";
            break;
        case 3:
            quarter = "3RD";
            break;
        case 4:
            quarter = "4TH";
            break;
        default:
            quarter = current;
    }
    return `${quarter} ${clock}`
};

const getGameStatus = game => {
    const { isGameActivated, period } = game;
    const { current } = period;
    if (current === 0) {
        return 'Scheduled';
    }
    if (isGameActivated) {
        return 'Live'
    }
    if (current > 3 && !isGameActivated){
        return 'Final'
    }
};

const buildTeamStats = ( game, stats ) => {
    const home = {};
    const visitor = {};
    const { hTeam, vTeam } = game;
    home.stats = stats.hTeam;
    visitor.stats = stats.vTeam;
    home.id = hTeam.teamId;
    visitor.id = vTeam.teamId;
    home.playerStats = stats.activePlayers.filter( player => player.teamId === home.id );
    visitor.playerStats = stats.activePlayers.filter( player => player.teamId === visitor.id );
    return { home, visitor };
};

const buildPlayerLine = ({ firstName, lastName, min, points, assists, totReb, steals, blocks, fgm, fga, ftm, fta, tpm, tpa, pFouls, dnp }) => ( 
    !dnp ? 
    `| ${firstName[0] + ". " + lastName} | ${min} | ${points} | ${assists} | ${totReb} | ${steals} | ${blocks} | ${fgm}/${fga} | ${ftm}/${fta} | ${tpm}/${tpa} | ${pFouls} |\n` : 
    `| ${firstName[0] + ". " + lastName} | DNP | - | - | - | - | - | - | - | - | - |\n`
);

const boxscore = data => {
    const { date, boxscore, team } = data;
    const stats = boxscore.stats;
    const game = boxscore.basicGameData;
    const status = getGameStatus(game);
    let time = '';
    if (status === 'Live') {
        time = ' ';
        time += getTime(game.period, game.clock);
        time += ' ';
    };
    const { hTeam, vTeam, startTimeEastern, arena } = game;
    const { home, visitor } = buildTeamStats(game, stats);
    const homePlayerLines = home.playerStats.reduce( (acc, player) => acc += buildPlayerLine(player) , "");
    const visitorPlayerLines = visitor.playerStats.reduce( (acc, player) => acc += buildPlayerLine(player) , "");

    // TEMPLATE
    let result;
    result = `### ${ vTeam.triCode } (${ vTeam.win } - ${ vTeam.loss } ) @ ${ hTeam.triCode } (${ hTeam.win } - ${ hTeam.loss } )\n`;
    result += `#### ${ arena.name } in ${ arena.city }\n`;
    result += `**${ status.toUpperCase() } ${ time } (start time: ${startTimeEastern} on ${date})**\n\n\n`;
    result += `| TEAM | 1st | 2nd | 3rd | 4th | Total |\n`;
    result += `| --- | --- | --- | --- | --- | --- |\n`;
    result += `| ${hTeam.triCode} | ${ hTeam.linescore[0].score } | ${ hTeam.linescore[1].score } | ${ hTeam.linescore[2].score } | ${ hTeam.linescore[3].score } | ${hTeam.score} |\n`
    result += `| ${vTeam.triCode} | ${ vTeam.linescore[0].score } | ${ vTeam.linescore[1].score } | ${ vTeam.linescore[2].score } | ${ vTeam.linescore[3].score } | ${vTeam.score} |\n\n\n`;
    result += `#### Boxscore for ${ hTeam.triCode }\n`;
    result += `| PLAYER | MIN | PTS | AST | REB | STL | BLK | FG | FT | 3P | PF |\n`;
    result += `| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n`
    result +=  homePlayerLines + "\n\n";
    result += `#### Boxscore for ${ vTeam.triCode }\n`;
    result += `| PLAYER | MIN | PTS | AST | REB | STL | BLK | FG | FT | 3P | PF |\n`;
    result += `| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n`
    result +=  visitorPlayerLines;
    return result;
};

module.exports = boxscore;