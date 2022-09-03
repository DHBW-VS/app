import { DualisGradePipe } from './dualis-grade.pipe';

describe('DualisGradePipe', () => {
  let pipe: DualisGradePipe;

  beforeEach(() => {
    pipe = new DualisGradePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform correctly', () => {
    let value = pipe.transform('noch nicht gesetzt');
    expect(value).toBe('-');
    value = pipe.transform('test');
    expect(value).toBe('test');
  });
});
