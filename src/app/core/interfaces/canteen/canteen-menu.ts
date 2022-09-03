import { ICanteenDish } from './canteen-dish';

export interface ICanteenMenu {
  date: string;
  dishes: ICanteenDish[];
}
