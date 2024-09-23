import { Request, Response } from 'express';
import LogParserService from '../services/logParser.service';
import * as fs from 'fs';
import * as path from 'path';

class StatisticController {

  async perGame(req: Request, res: Response) {

    const filePath = req.query.filePath as string;
    if (!filePath) {
      return res.status(400).send('filePath query parameter is required');
    }

    try {
      const absolutePath = path.resolve(filePath);
      const fileContent = fs.readFileSync(absolutePath, 'utf-8');
      const lines = fileContent.split('\n');

      const stats = LogParserService.parseLog(lines);
      res.json(stats);
    } catch (error) {
      res.status(500).send('Error reading or parsing log file');
    }
  }

}

export default new StatisticController();