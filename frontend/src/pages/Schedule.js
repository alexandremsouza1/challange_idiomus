import React, { useEffect, useState } from "react";
import styles from "./Schedule.module.css";
import authService from "../services/AuthService";
import LeagueService from "../services/LeagueService";
import MatchRow from "../components/MatchRow";

function Schedule() {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authResponse = await authService.getAuth();
                const leagueService = new LeagueService(authResponse);
                await leagueService.fetchData();
                const matchesResponse = leagueService.getMatches();
                setMatches(matchesResponse);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.tablecontainer}>
                <h1>League Schedule</h1>
                <table className={styles.scheduletable}>
                    <thead>
                        <tr>
                            <th align="left" className={styles.datetimeth}>DateTime</th>
                            <th className={styles.stadiumdata}>Stadium</th>
                            <th className={styles.hometeamheader}>Home Team</th>
                            <th></th>
                            <th className={styles.awayteamheader}>Away Team</th>
                        </tr>
                    </thead>
                    <tbody className={styles.scheduletbody}>
                        {matches?.length > 0 &&
                            matches.map((match, index) => (
                                <MatchRow key={match.id || `${match.homeTeam}-${match.awayTeam}-${match.matchDate}-${index}`} match={match} />
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Schedule;
