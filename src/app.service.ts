import { BadRequestException, Injectable } from '@nestjs/common';
import { parseTextToRounds, roundsToScore } from 'bowling-score-lib';
import type { ScoreResponse } from './interfaces/score-response.interface';

@Injectable()
export class AppService {
  parseSequence(sequence: string): number[][] {
    try {
      return parseTextToRounds(sequence);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  getScore(sequence: string, includeRounds?: boolean): ScoreResponse {
    try {
      const rounds = this.parseSequence(sequence);

      return {
        score: roundsToScore(rounds),
        rounds: includeRounds ? rounds : undefined,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
