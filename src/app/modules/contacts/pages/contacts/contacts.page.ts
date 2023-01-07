import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ApiContactsService,
  DialogService,
  IContactGroup,
  IContactStorage,
  NotificationService,
  StorageKey,
  StorageService,
  UserService,
} from '@app/core';
import { Clipboard } from '@capacitor/clipboard';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsPage implements OnInit {
  public contactGroups: IContactGroup[] | undefined;
  public searchbarValue: string = '';

  constructor(
    private readonly dialogService: DialogService,
    private readonly apiContactsService: ApiContactsService,
    private readonly storageService: StorageService,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    void this.initContactsPage();
  }

  private async initContactsPage(): Promise<void> {
    const loading = await this.dialogService.showLoading();
    try {
      const course: string = await this.userService.getCourse();
      const contactGroups: IContactGroup[] = await this.apiContactsService.findAll(course);
      this.contactGroups = contactGroups;
      const storageData: IContactStorage = { cache: contactGroups };
      await this.storageService.storeData(StorageKey.Contact, storageData);
    } catch {
      const storageData: IContactStorage | null = await this.storageService.retrieveData<IContactStorage>(
        StorageKey.Contact,
      );
      if (storageData) {
        this.contactGroups = storageData.cache;
      }
      if (this.contactGroups) {
        await this.showToast('Aktualisierung fehlgeschlagen!');
      } else {
        await this.showAlert();
      }
    } finally {
      this.changeDetectorRef.markForCheck();
      await loading.dismiss();
    }
  }

  public async hideKeyboard(): Promise<void> {
    await Keyboard.hide();
  }

  public searchbarChangeEvent(): void {
    this.changeDetectorRef.markForCheck();
  }

  public async copyToClipboard(value: string): Promise<void> {
    await Clipboard.write({ string: value });
    await this.showToast('In die Zwischenablage kopiert');
  }

  private async showToast(message: string): Promise<void> {
    await this.notificationService.showToast({
      message: message,
    });
  }

  private async showAlert(): Promise<void> {
    await this.dialogService.showErrorAlert({
      message: 'Abfrage fehlgeschlagen! Bitte versuche es später erneut.',
    });
  }

  public openWindow(url: string): void {
    window.open(url, '_self');
  }
}
