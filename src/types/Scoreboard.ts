import { Match } from './types';

export class Scoreboard {
  private matches: Map<string, Match> = new Map();

  startMatch(homeTeam: string, awayTeam: string): string {
    if (!homeTeam.trim() || !awayTeam.trim()) {
      throw new Error('Team names cannot be empty');
    }
    
    if (homeTeam.trim() === awayTeam.trim()) {
      throw new Error('Home and away teams must be different');
    }

    const matchId = `${homeTeam}_${awayTeam}_${Date.now()}`;
    const match: Match = {
      id: matchId,
      homeTeam: homeTeam.trim(),
      awayTeam: awayTeam.trim(),
      homeScore: 0,
      awayScore: 0,
      startTime: new Date()
    };

    this.matches.set(matchId, match);
    return matchId;
  }

  updateScore(matchId: string, homeScore: number, awayScore: number): void {
    const match = this.matches.get(matchId);
    if (!match) {
      throw new Error('Match not found');
    }

    if (homeScore < 0 || awayScore < 0) {
      throw new Error('Scores cannot be negative');
    }

    if (!Number.isInteger(homeScore) || !Number.isInteger(awayScore)) {
      throw new Error('Scores must be integers');
    }

    match.homeScore = homeScore;
    match.awayScore = awayScore;
    this.matches.set(matchId, match);
  }

  finishMatch(matchId: string): void {
    if (!this.matches.has(matchId)) {
      throw new Error('Match not found');
    }
    this.matches.delete(matchId);
  }

  getSummary(): Match[] {
    const matchArray = Array.from(this.matches.values());
    
    return matchArray.sort((a, b) => {
      const totalScoreA = a.homeScore + a.awayScore;
      const totalScoreB = b.homeScore + b.awayScore;
      
      if (totalScoreA !== totalScoreB) {
        return totalScoreB - totalScoreA;
      }
      
      return b.startTime.getTime() - a.startTime.getTime();
    });
  }

  getAllMatches(): Match[] {
    return Array.from(this.matches.values());
  }

  getMatchCount(): number {
    return this.matches.size;
  }
}