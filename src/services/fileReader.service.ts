import * as fs from 'fs';
import * as path from 'path';

class FileReaderService {
  readFile(filePath: string): string {
    return fs.readFileSync(path.resolve(filePath), 'utf-8');
  }
}
export default new FileReaderService;