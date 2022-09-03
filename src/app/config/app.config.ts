export class Config {
  public static readonly dualisBaseUrl: string = 'https://dualis.dhbw.de'; // http://localhost:8100 for dev
  public static readonly dualisTokenExpirationTimeMs: number = 1_740_000; // 29 min
  public static readonly httpTimeout: number = 10_000; // ms
  public static readonly parkingIntervalValue: number = 12_000;
  public static readonly sosMoreInformationLink: string = 'https://www.dhbw-vs.de/studierende/service-beratung.html';
}
