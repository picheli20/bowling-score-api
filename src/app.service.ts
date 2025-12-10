import { Injectable } from '@nestjs/common';
import { parseTextToRounds, roundsToScore } from 'bowling-score-lib';
import type { ScoreResponse } from './interfaces/score-response.interface';

@Injectable()
export class AppService {
  parseSequence(sequence: string): number[][] {
    return parseTextToRounds(sequence);
  }

  getScore(sequence: string, includeRounds?: boolean): ScoreResponse {
    const rounds = this.parseSequence(sequence);

    return {
      score: roundsToScore(rounds),
      rounds: includeRounds ? rounds : undefined,
    };
  }
}
