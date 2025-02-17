import React from "react";
import styles from "../pages/Schedule.module.css";
import moment from "moment";

function MatchRow({ match }) {
    return (
        <tr key={match.id}>
            <td align="left" className={styles.datetimetd}>
            <div className={styles.datetimetext}>
                    {moment.unix(match.matchDate / 1000).format("D.M.YYYY")}<br />
                    {moment.unix(match.matchDate / 1000).format("HH:mm")}
                </div>
            </td>
            <td className={styles.stadiumdata}>{match.stadium}</td>
            <td>
                <div className={styles.hometeam}>
                    {match.homeTeam}
                    <img
                        src={`https://flagsapi.codeaid.io/${match.homeTeam}.png`}
                        width={53}
                        height={37}
                        className={styles.tableimage}
                        alt={match.homeTeam}
                    />
                </div>
            </td>
            <td className={styles.score}>
                {match.homeTeamScore} : {match.awayTeamScore}
            </td>
            <td>
                <div className={styles.awayteam}>
                    <img
                        src={`https://flagsapi.codeaid.io/${match.awayTeam}.png`}
                        className={styles.tableimage}
                        width={53}
                        height={37}
                        alt={match.awayTeam}
                    />
                    {match.awayTeam}
                </div>
            </td>
        </tr>
    );
}

export default MatchRow;
