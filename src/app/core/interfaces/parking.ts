export interface IParking {
  description: string;
  location: string;
  staff: {
    occupied: number;
    free: number;
  };
  students: {
    occupied: number;
    free: number;
  };
}
