import LogParserService from '../../services/logParser.service';
import { LogStats } from '../../interfaces/logParser.interface';

describe('LogParserService', () => {
    describe('parseLog', () => {
        it('should correctly parse log lines and calculate stats', () => {
            const logLines = [
                'Kill: 1022 2 22: <world> killed Player1 by MOD_TRIGGER_HURT',
                'Kill: 2 3 7: Player2 killed Player3 by MOD_ROCKET',
                'Kill: 3 2 7: Player3 killed Player2 by MOD_ROCKET',
                'Kill: 2 2 7: Player2 killed Player2 by MOD_ROCKET'
            ];

            const expectedStats: LogStats = {
                totalDeaths: 4,
                deathsByCause: {
                    MOD_TRIGGER_HURT: { count: 1, percentage: '25.00%' },
                    MOD_ROCKET: { count: 3, percentage: '75.00%' }
                },
                worldDeaths: { count: 1, percentage: '25.00%' },
                deathsByPlayer: {
                    Player2: { count: 2, percentage: '50.00%' },
                    Player3: { count: 1, percentage: '25.00%' }
                }
            };

            const result = LogParserService.parseLog(logLines);
            expect(result).toEqual(expectedStats);
        });

        it('should handle empty log lines', () => {
            const logLines: string[] = [];

            const expectedStats: LogStats = {
                totalDeaths: 0,
                deathsByCause: {},
                worldDeaths: { count: 0, percentage: '0%' },
                deathsByPlayer: {}
            };

            const result = LogParserService.parseLog(logLines);
            expect(result).toEqual(expectedStats);
        });

        it('should handle logs with no kills', () => {
            const logLines = [
                'ClientConnect: 2',
                'ClientUserinfoChanged: 2 n\\Player2\\t\\0\\model\\sarge\\hmodel\\sarge\\g_redteam\\g_blueteam\\c1\\4\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0',
                'ClientBegin: 2'
            ];

            const expectedStats: LogStats = {
                totalDeaths: 0,
                deathsByCause: {},
                worldDeaths: { count: 0, percentage: '0%' },
                deathsByPlayer: {}
            };

            const result = LogParserService.parseLog(logLines);
            expect(result).toEqual(expectedStats);
        });
    });
});