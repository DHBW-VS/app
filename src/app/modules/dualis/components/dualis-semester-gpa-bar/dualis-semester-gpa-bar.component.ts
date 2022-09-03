import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DualisSemester } from '../../interfaces';

@Component({
  selector: 'app-dualis-semester-gpa-bar',
  templateUrl: './dualis-semester-gpa-bar.component.html',
  styleUrls: ['./dualis-semester-gpa-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DualisSemesterGpaBarComponent {
  @Input()
  public semester: DualisSemester | undefined;

  constructor() {}
}
