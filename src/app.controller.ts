import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import type { ScoreResponse } from './interfaces/score-response.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('calculate')
  calculate(@Body() body: { sequence: string }): ScoreResponse {
    return this.appService.getScore(body.sequence);
  }

  @Post('rounds')
  rounds(@Body() body: { sequence: string }): ScoreResponse {
    return this.appService.getScore(body.sequence, true);
  }
}
