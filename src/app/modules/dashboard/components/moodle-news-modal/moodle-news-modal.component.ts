import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DialogService, IMoodleNews, IMoodleNewsAttachment } from '@app/core';

@Component({
  selector: 'app-moodle-news-modal',
  templateUrl: './moodle-news-modal.component.html',
  styleUrls: ['./moodle-news-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoodleNewsModalComponent {
  @Input()
  public moodleNews: IMoodleNews | undefined;

  constructor(private readonly dialogService: DialogService) {}

  public async closeModal(): Promise<void> {
    await this.dialogService.dismissModal();
  }

  public openAttachment(attachment: IMoodleNewsAttachment): void {
    const url = attachment.link;
    window.open(url, '_self');
  }
}
