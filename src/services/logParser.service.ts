import { LogStats } from '../interfaces/logParser.interface';

class LogParserService {
    parseLog(lines: string[]): LogStats {
        const stats: LogStats = {
            totalDeaths: 0,
            deathsByCause: {},
            worldDeaths: { count: 0, percentage: '0%' },
            deathsByPlayer: {}
        };

        lines.forEach(line => {
            if (line.includes('Kill:')) {
                stats.totalDeaths++;
                const cause = this.extractCause(line);
                const killer = this.extractKiller(line);

                if (killer === '<world>') {
                    stats.worldDeaths.count++;
                } else {
                    stats.deathsByPlayer[killer] = (stats.deathsByPlayer[killer] || { count: 0, percentage: '0%' });
                    stats.deathsByPlayer[killer].count++;
                }
                stats.deathsByCause[cause] = (stats.deathsByCause[cause] || { count: 0, percentage: '0%' });
                stats.deathsByCause[cause].count++;
            }
        });

        if (stats.totalDeaths > 0) {
            Object.keys(stats.deathsByCause).forEach(cause => {
                stats.deathsByCause[cause].percentage = ((stats.deathsByCause[cause].count / stats.totalDeaths) * 100).toFixed(2) + '%';
            });

            stats.worldDeaths.percentage = ((stats.worldDeaths.count / stats.totalDeaths) * 100).toFixed(2) + '%';

            Object.keys(stats.deathsByPlayer).forEach(player => {
                stats.deathsByPlayer[player].percentage = ((stats.deathsByPlayer[player].count / stats.totalDeaths) * 100).toFixed(2) + '%';
            });
        } else {
            stats.worldDeaths.percentage = '0%';
        }

        return stats;
    }

    private extractKiller(line: string): string {
        const parts = line.split(': ');
        const killerPart = parts[2].split(' killed ')[0];
        return killerPart;
    }

    private extractCause(line: string): string {
        const parts = line.split(' ');
        const cause = parts[parts.length - 1];
        return cause;
    }
}

export default new LogParserService;