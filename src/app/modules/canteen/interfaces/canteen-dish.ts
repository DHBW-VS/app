export interface ICanteenDish {
  $: {
    aktion: string;
    art: string;
    zusatz: string;
  };
  allergikerhinweise: string[];
  kennzeichnungen: string[];
  name: string[];
  nameMitUmbruch: string[];
  preis: {
    angestellte: string[];
    gaeste: string[];
    schueler: string[];
    studierende: string[];
  }[];
}
