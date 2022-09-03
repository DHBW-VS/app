export interface ICanteenDish {
  name: string;
  allergyWarnings: string[];
  labels: string[];
  description: string;
  price: {
    employee: string;
    guests: string;
    pupils: string;
    students: string;
  };
  promotion?: string;
  additionalInformation?: string;
}
