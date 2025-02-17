class LeaderboardService {
    constructor(matches) {
        this.matches = matches;
    }

    getLeaderboard() {
        const teams = {};

        const initializeTeam = (teamName) => {
            if (!teams[teamName]) {
                teams[teamName] = {
                    teamName,
                    points: 0,
                    goalsFor: 0,
                    goalsAgainst: 0,
                    goalDifference: 0,
                    matchesPlayed: 0,
                    headToHead: {},
                };
            }
        };

        const updateTeamStats = (team, goalsFor, goalsAgainst) => {
            team.goalsFor += goalsFor;
            team.goalsAgainst += goalsAgainst;
            team.goalDifference = team.goalsFor - team.goalsAgainst;
        };

        const updateMatchStats = (home, away, match) => {
            updateTeamStats(home, match.homeTeamScore, match.awayTeamScore);
            updateTeamStats(away, match.awayTeamScore, match.homeTeamScore);
            home.matchesPlayed += match.matchPlayed ? 1 : 0;
            away.matchesPlayed += match.matchPlayed ? 1 : 0;
        };

        const updatePoints = (home, away, match) => {
            if (match.homeTeamScore > match.awayTeamScore) {
                home.points += 3;
            } else if (match.homeTeamScore < match.awayTeamScore) {
                away.points += 3;
            } else {
                home.points += 1;
                away.points += 1;
            }
        };

        const updateHeadToHead = (home, away, match) => {
            if (!home.headToHead[match.awayTeam]) {
                home.headToHead[match.awayTeam] = { points: 0, goalsFor: 0, goalsAgainst: 0 };
            }
            if (!away.headToHead[match.homeTeam]) {
                away.headToHead[match.homeTeam] = { points: 0, goalsFor: 0, goalsAgainst: 0 };
            }

            if (match.homeTeamScore > match.awayTeamScore) {
                home.headToHead[match.awayTeam].points += 3;
            } else if (match.homeTeamScore < match.awayTeamScore) {
                away.headToHead[match.homeTeam].points += 3;
            } else {
                home.headToHead[match.awayTeam].points += 1;
                away.headToHead[match.homeTeam].points += 1;
            }

            home.headToHead[match.awayTeam].goalsFor += match.homeTeamScore;
            home.headToHead[match.awayTeam].goalsAgainst += match.awayTeamScore;
            away.headToHead[match.homeTeam].goalsFor += match.awayTeamScore;
            away.headToHead[match.homeTeam].goalsAgainst += match.homeTeamScore;
        };

        this.matches.forEach(match => {
            initializeTeam(match.homeTeam);
            initializeTeam(match.awayTeam);

            const home = teams[match.homeTeam];
            const away = teams[match.awayTeam];

            updateMatchStats(home, away, match);

            if (match.matchPlayed) {
                updatePoints(home, away, match);
                updateHeadToHead(home, away, match);
            }
        });

        let leaderboardArray = Object.values(teams);

        const createMiniLeaderboard = (teamsArray, matches) => {
            const miniTeams = {};
            teamsArray.forEach(team => {
                miniTeams[team.teamName] = { ...team, points: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0 };
            });

            matches.forEach(match => {
                const home = miniTeams[match.homeTeam];
                const away = miniTeams[match.awayTeam];

                if (home && away) {
                    updateMatchStats(home, away, match);

                    if (match.matchPlayed) {
                        updatePoints(home, away, match);
                    }
                }
            });

            return Object.values(miniTeams).sort((a, b) => {
                if (b.points !== a.points) return b.points - a.points;
                if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
                if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
                return a.teamName.localeCompare(b.teamName);
            });
        };

        const compareTeams = (a, b) => {
            if (b.points !== a.points) return b.points - a.points;

            const tiedTeams = leaderboardArray.filter(team => team.points === a.points);
            const tiedMatches = this.matches.filter(match => tiedTeams.find(t => t.teamName === match.homeTeam) && tiedTeams.find(t => t.teamName === match.awayTeam));
            const miniLeaderboard = createMiniLeaderboard(tiedTeams, tiedMatches);

            const miniRankA = miniLeaderboard.findIndex(team => team.teamName === a.teamName);
            const miniRankB = miniLeaderboard.findIndex(team => team.teamName === b.teamName);

            if (miniRankA !== miniRankB) return miniRankA - miniRankB;

            if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
            if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
            return a.teamName.localeCompare(b.teamName);
        };

        leaderboardArray.sort(compareTeams);

        return leaderboardArray;
    }
}

export default LeaderboardService;
