import FileReaderService from '../../services/fileReader.service';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs');
jest.mock('path');

describe('FileReaderService', () => {
    const mockFilePath = 'mockFilePath';
    const mockFileContent = 'mock file content';

    beforeEach(() => {
        (fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>).mockReturnValue(mockFileContent);
        (path.resolve as jest.MockedFunction<typeof path.resolve>).mockReturnValue(mockFilePath);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should read file content correctly', () => {
        const content = FileReaderService.readFile(mockFilePath);
        expect(path.resolve).toHaveBeenCalledWith(mockFilePath);
        expect(fs.readFileSync).toHaveBeenCalledWith(mockFilePath, 'utf-8');
        expect(content).toBe(mockFileContent);
    });
});