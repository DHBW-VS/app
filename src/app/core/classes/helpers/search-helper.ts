/* eslint-disable unicorn/prevent-abbreviations */
export class SearchHelper {
  public static objectContainsString(obj: any, str: string): boolean {
    str = str.toLowerCase();
    for (const key in obj) {
      if (typeof obj[key] === 'string' || typeof obj[key] === 'number') {
        if (obj[key].toString().toLowerCase().includes(str)) {
          return true;
        }
      } else if (typeof obj[key] === 'object' && this.objectContainsString(obj[key], str)) {
        return true;
      }
    }
    return false;
  }
}
