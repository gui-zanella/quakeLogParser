import { Request, Response } from 'express';
import StatisticController from '../../controllers/statistics.controller';
import LogParserService from '../../services/logParser.service';
import path from 'path';
import fs from 'fs';

jest.mock('../../services/logParser.service');
jest.mock('path');
jest.mock('fs');
describe('StatisticController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    req = {
      query: {}
    };
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    sendMock = jest.fn();
    res = {
      status: statusMock,
      json: jsonMock,
      send: sendMock
    };
  });

  describe('perGame', () => {
    it('should return 400 if filePath is not provided', async () => {
      await StatisticController.perGame(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith('filePath query parameter is required');
    });

    it('should return stats if filePath is provided', async () => {
      const mockStats = { kills: 10, deaths: 5 };
      (LogParserService.parseLog as jest.Mock).mockReturnValue(mockStats);

      if (req.query) {
        req.query.filePath = 'some/path/to/logfile.log';
      }

      (path.resolve as jest.Mock).mockReturnValue('resolved/path/to/logfile.log');
      (fs.readFileSync as jest.Mock).mockReturnValue('file content');
      await StatisticController.perGame(req as Request, res as Response);

      expect(LogParserService.parseLog).toHaveBeenCalledWith(["file content"]);
    });

    it('should return 500 if an error occurs during parsing', async () => {
      (LogParserService.parseLog as jest.Mock).mockImplementation(() => {
        throw new Error('Parsing error');
      });

      if (req.query) {
        req.query.filePath = 'some/path/to/logfile.log';
      }
      await StatisticController.perGame(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(sendMock).toHaveBeenCalledWith('Error reading or parsing log file');
    });
  });
});