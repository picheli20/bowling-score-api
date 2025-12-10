import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import type { ScoreResponse } from './interfaces/score-response.interface';

@ApiTags('Bowling Score')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('calculate')
  @ApiOperation({
    summary: 'Calculate bowling score',
    description:
      'Calculates the total score for a bowling game based on the provided sequence',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        sequence: {
          type: 'string',
          description:
            'Bowling sequence string (e.g., "X X X X X X X X X XXX")',
          example: 'X X X X X X X X X XXX',
        },
      },
      required: ['sequence'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Score calculated successfully',
    schema: {
      type: 'object',
      properties: {
        score: {
          type: 'number',
          description: 'Total bowling score',
          example: 300,
        },
      },
    },
  })
  calculate(@Body() body: { sequence: string }): ScoreResponse {
    return this.appService.getScore(body.sequence);
  }

  @Post('rounds')
  @ApiOperation({
    summary: 'Calculate score with rounds breakdown',
    description:
      'Calculates the total score and returns the breakdown of each round',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        sequence: {
          type: 'string',
          description:
            'Bowling sequence string (e.g., "X X X X X X X X X XXX")',
          example: '9- 9- 9- 9- 9- 9- 9- 9- 9- 9-',
        },
      },
      required: ['sequence'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Score and rounds calculated successfully',
    schema: {
      type: 'object',
      properties: {
        score: {
          type: 'number',
          description: 'Total bowling score',
          example: 90,
        },
        rounds: {
          type: 'array',
          description:
            'Array of rounds, each containing an array of pin counts',
          example: [
            [9, 0],
            [9, 0],
            [9, 0],
            [9, 0],
            [9, 0],
            [9, 0],
            [9, 0],
            [9, 0],
            [9, 0],
            [9, 0],
          ],
          items: {
            type: 'array',
            items: {
              type: 'number',
            },
          },
        },
      },
    },
  })
  rounds(@Body() body: { sequence: string }): ScoreResponse {
    return this.appService.getScore(body.sequence, true);
  }
}
