import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('calculate', () => {
    it('should call appService.getScore and return score without rounds', () => {
      const mockResult = { score: 150, rounds: undefined };
      const getScoreSpy = jest
        .spyOn(appService, 'getScore')
        .mockReturnValue(mockResult);

      const result = appController.calculate({
        sequence: '5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/5',
      });

      expect(getScoreSpy).toHaveBeenCalledWith(
        '5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/5',
      );
      expect(result).toEqual(mockResult);
      expect(result.rounds).toBeUndefined();
    });
  });

  describe('rounds', () => {
    it('should call appService.getScore with includeRounds=true and return score with rounds', () => {
      const mockResult = {
        score: 150,
        rounds: [
          [5, 5],
          [5, 5],
          [5, 5],
          [5, 5],
          [5, 5],
          [5, 5],
          [5, 5],
          [5, 5],
          [5, 5],
          [5, 5, 5],
        ],
      };
      const getScoreSpy = jest
        .spyOn(appService, 'getScore')
        .mockReturnValue(mockResult);

      const result = appController.rounds({
        sequence: '5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/5',
      });

      expect(getScoreSpy).toHaveBeenCalledWith(
        '5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/5',
        true,
      );
      expect(result).toEqual(mockResult);
      expect(result.rounds).toBeDefined();
    });
  });
});
