import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IContact } from '@app/core';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactCardComponent {
  @Input()
  public contact: IContact | undefined;
  @Output()
  public copyToClipboard: EventEmitter<string>;
  @Output()
  public openWindow: EventEmitter<string>;

  constructor() {
    this.copyToClipboard = new EventEmitter<string>();
    this.openWindow = new EventEmitter<string>();
  }

  public _copyToClipboard(mail: string): void {
    this.copyToClipboard.emit(mail);
  }

  public _openWindow(url: string): void {
    this.openWindow.emit(url);
  }
}
