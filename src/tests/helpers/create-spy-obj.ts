/* eslint-disable unicorn/prevent-abbreviations */
export const createSpyObj = <T = any>(
  _baseName: string,
  methodNames: { [methodName: string]: any },
): jest.Mocked<T> => {
  let obj: any = {};

  for (const key in methodNames) {
    if (methodNames.hasOwnProperty(key)) {
      const value = methodNames[key];
      obj[key] = jest.fn(value);
    }
  }

  return obj;
};
