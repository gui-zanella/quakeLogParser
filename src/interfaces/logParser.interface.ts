export interface LogStats {
  totalDeaths: number;
  deathsByCause: Record<string, { count: number, percentage: string }>;
  worldDeaths: { count: number, percentage: string };
  deathsByPlayer: Record<string, { count: number, percentage: string }>;
}