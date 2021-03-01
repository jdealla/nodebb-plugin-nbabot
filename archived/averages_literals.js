let response = "";

response += `### ${first_name} ${last_name}\n`
response += `#### ${season} - ${full_name}\n`
response += `| GP              | PPG    | RPB   |   APG  | BPG    | SPG    | FPG   |  TPG        |\n`
response += `| --------------- | ----   | ----  | ---    |-----   | -----  | ----- | -----       |\n`
response += `| ${games_played} | ${pts} | ${reb}|  ${ast}| ${blk} |  ${stl}| ${pf} | ${turnover} |\n\n`
response += `| MPG   | FG%                    | FT%                    | 2P%               | 3P%                     | eFG%            | TS%           | TOV% |\n`
response += `| ---   | ----                   | ----                   | ----              | -----                   | -----           | -----         |----- |\n`
response += `| ${min}| ${round(fg_pct) * 100} | ${round(ft_pct) * 100} | ${round(twoPper)} | ${round(fg3_pct * 100)} |  ${round(efgp) * 100} | ${round(tsp) * 100} | ${round(tovp)} |\n`
response += "";