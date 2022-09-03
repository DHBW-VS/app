import { ApartmentDatePipe } from './apartment-date.pipe';

describe('ApartmentDatePipe', () => {
  let pipe: ApartmentDatePipe;

  beforeEach(() => {
    pipe = new ApartmentDatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform correctly', () => {
    const exspectedResult = '2020-02-01 00:00:00';
    let result = pipe.transform(exspectedResult);
    expect(result).toBe('01.02.2020');
  });
});
