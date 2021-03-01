const averages = data => {
    const { games_played, player_id, season, min, fgm, fga, fg3m, fg3a, ftm, fta, oreb, dreb, reb, ast, stl, blk, turnover, pf, pts, fg_pct, fg3_pct, ft_pct } = data.averages[0];
    const { first_name, last_name, team } = data.player;
    const { full_name } = team;
    const twoPper = ((fgm - fg3m) / (fga - fg3a) * 100 );
    const efgp = ( (fgm - fg3m) + 1.5 * fg3m) / fga;
    const tsp = pts / ( 2 * (fga + 0.44 * fta));
    const tovp = 100 * turnover / (fga + 0.44 * fta + turnover);
    const round = num => Math.round(num * 100).toFixed(2);
    let response = "";

    response += "# ".concat(first_name, " ").concat(last_name, "\n");
    response += "### ".concat(season, " - ").concat(full_name, "\n");
    response += "| GP              | PPG    | RPB   |   APG  | BPG    | SPG    | FPG   |  TPG        |\n";
    response += "| --------------- | ----   | ----  | ---    |-----   | -----  | ----- | -----       |\n";
    response += "| ".concat(games_played, " | ").concat(pts, " | ").concat(reb, "|  ").concat(ast, "| ").concat(blk, " |  ").concat(stl, "| ").concat(pf, " | ").concat(turnover, " |\n\n\n\n");
    response += "| MPG   | FG%                    | FT%                    | 2P%               | 3P%                     | eFG%            | TS%           | TOV% |\n";
    response += "| ---   | ----                   | ----                   | ----              | -----                   | -----           | -----         |----- |\n";
    response += "| ".concat(min, "| ").concat(round(fg_pct), " | ").concat(round(ft_pct), " | ").concat(round(twoPper), " | ").concat(round(fg3_pct * 100), " |  ").concat(round(efgp), " | ").concat(round(tsp), " | ").concat(round(tovp), " |\n");
    response += "";

    return response;
};

module.exports = averages;