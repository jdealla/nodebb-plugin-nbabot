const round = num => Math.round(num * 100).toFixed(2);

const getCalculatedAverages = averages => {
    const { fgm, fga, fg3m, fg3a, fta, turnover, pts } = averages;
    const twoPper = ((fgm - fg3m) / (fga - fg3a) * 100 ).toFixed(2);
    const efgp = ((( (fgm - fg3m) + 1.5 * fg3m) / fga) * 100).toFixed(2);
    const tsp = ((pts / ( 2 * (fga + 0.44 * fta))) * 100).toFixed(2);
    const tovp = (100 * turnover / (fga + 0.44 * fta + turnover)).toFixed(2);
    return { twoPper, efgp, tsp, tovp, }
}

const compare = data => {
    const [ playerOne, playerTwo ] = data.players;
    const playerOneAverages = { ...playerOne.averages[0], ...getCalculatedAverages(playerOne.averages[0])};
    const playerTwoAverages = { ...playerTwo.averages[0], ...getCalculatedAverages(playerTwo.averages[0])};
    const playerOneInfo = playerOne.player;
    const playerTwoInfo = playerTwo.player;

    let response = "";
    response += `#### **${playerOneInfo.first_name + " " + playerOneInfo.last_name} vs ${playerTwoInfo.first_name + " " + playerTwoInfo.last_name}**\n`;
    response += `|      | ${playerOneInfo.first_name[0]}. ${playerOneInfo.last_name} | ${playerTwoInfo.first_name[0]}. ${playerTwoInfo.last_name} |\n`;
    response += "| --- | --- | --- |\n";
    response += `| TEAM | ${playerOneInfo.team.abbreviation} |  ${playerTwoInfo.team.abbreviation} |\n`;
    response += `| YEAR | ${playerOneAverages.season} |  ${playerTwoAverages.season} |\n`;
    response  += `| GP  | ${playerOneAverages.games_played} | ${playerTwoAverages.games_played}|\n`;
    response  += `| PPG | ${playerOneAverages.pts} | ${playerTwoAverages.pts}|\n`;
    response  += `| RPB | ${playerOneAverages.reb} | ${playerTwoAverages.reb}|\n`;
    response  += `| APG | ${playerOneAverages.ast} | ${playerTwoAverages.ast}|\n`;
    response  += `| BPG | ${playerOneAverages.blk} | ${playerTwoAverages.blk}|\n`;
    response  += `| SPG | ${playerOneAverages.stl} | ${playerTwoAverages.stl}|\n`;
    response  += `| FPG | ${playerOneAverages.pf} | ${playerTwoAverages.pf}|\n`;
    response  += `| TPG | ${playerOneAverages.turnover} | ${playerTwoAverages.turnover}|\n`;
    response  += `| MPG | ${playerOneAverages.min} | ${playerTwoAverages.min}|\n`;
    response  += `| FG% | ${round(playerOneAverages.fg_pct)} | ${round(playerTwoAverages.fg_pct)}|\n`;
    response  += `| FT% | ${round(playerOneAverages.ft_pct)} | ${round(playerTwoAverages.ft_pct)}|\n`;
    response  += `| 2P% | ${playerOneAverages.twoPper} | ${playerTwoAverages.twoPper}|\n`;
    response  += `| 3P% | ${round(playerOneAverages.fg3_pct)} | ${round(playerTwoAverages.fg3_pct)}|\n`;
    response  += `| eFG% | ${playerOneAverages.efgp} | ${playerTwoAverages.efgp}|\n`;
    response  += `| TS% | ${playerOneAverages.tsp} | ${playerTwoAverages.tsp}|\n`;
    response  += `| TOV% | ${playerOneAverages.tovp} | ${playerTwoAverages.tovp}|\n`;

    return response;
};

module.exports = compare;