import { DualisEmptyStringPipe } from './dualis-empty-string.pipe';

describe('DualisEmptyStringPipe', () => {
  let pipe: DualisEmptyStringPipe;

  beforeEach(() => {
    pipe = new DualisEmptyStringPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform correctly', () => {
    let value = pipe.transform('');
    expect(value).toBe('-');
    value = pipe.transform('test');
    expect(value).toBe('test');
  });
});
