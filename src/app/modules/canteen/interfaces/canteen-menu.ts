import { ICanteenDish } from './canteen-dish';

export interface ICanteenMenu {
  $: {
    datum: string;
  };
  menue: ICanteenDish[];
}
