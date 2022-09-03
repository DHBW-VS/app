import { DualisUnit } from '../../interfaces';
import { DualisUnitFilterPipe } from './dualis-unit-filter.pipe';

describe('DualisUnitFilterPipe', () => {
  let pipe: DualisUnitFilterPipe;

  beforeEach(() => {
    pipe = new DualisUnitFilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform correctly', () => {
    const units: DualisUnit[] = [
      {
        id: '111222111222111',
        displayName: 'Wissenschaftliches Arbeiten',
        no: 'WWI_100',
        status: 'bestanden',
        credits: '5,0',
        finalGrade: 'b',
        exams: undefined,
      },
    ];
    let value = pipe.transform(units, 'bestanden');
    expect(value.length).toBe(1);
    value = pipe.transform(units, 'Wissen');
    expect(value.length).toBe(1);
    value = pipe.transform(units, '100');
    expect(value.length).toBe(1);
    value = pipe.transform(units, '4,0');
    expect(value.length).toBe(0);
  });
});
