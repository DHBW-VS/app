import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '@app/core';
import { Keyboard } from '@capacitor/keyboard';
import { DualisSessionError } from '../../classes';
import { DualisSemester, DualisSemesterList, DualisSemesterListItem } from '../../interfaces';
import { DualisAuthService, DualisPageService } from '../../services';

@Component({
  selector: 'app-dualis',
  templateUrl: './dualis.page.html',
  styleUrls: ['./dualis.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DualisPage implements OnInit {
  public semesterList: DualisSemesterList | undefined;
  public semesterResults: DualisSemester | undefined;
  public searchbarValue: string = '';

  constructor(
    private readonly dialogService: DialogService,
    private readonly dualisAuthService: DualisAuthService,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly dualisPageService: DualisPageService,
  ) {}

  public ngOnInit(): void {
    void this.loadSemesterList();
  }

  public async selectSemester(listItem: DualisSemesterListItem): Promise<void> {
    const loading = await this.dialogService.showLoading();
    try {
      const semester = await this.dualisPageService.getSemesterByListItem(listItem);
      if (!semester) {
        await this.dialogService.showErrorAlert({ message: 'Das Semester wurde nicht gefunden.' });
        return;
      }
      this.semesterResults = semester;
    } catch (error) {
      await this.handleError(error);
    } finally {
      this.searchbarValue = '';
      this.changeDetectorRef.markForCheck();
      await loading.dismiss();
    }
  }

  public trackByIndex(index: number, item: unknown): number {
    return index;
  }

  public async hideKeyboard(): Promise<void> {
    await Keyboard.hide();
  }

  public async logout(): Promise<void> {
    const loading = await this.dialogService.showLoading();
    try {
      await this.dualisAuthService.logout();
      await this.router.navigate(['/dualis/login'], { replaceUrl: true });
    } finally {
      await loading.dismiss();
    }
  }

  private async loadSemesterList(): Promise<void> {
    const loading = await this.dialogService.showLoading();
    try {
      this.semesterList = await this.dualisPageService.getSemesterList();
    } catch (error) {
      await this.handleError(error);
    } finally {
      this.changeDetectorRef.markForCheck();
      await loading.dismiss();
    }
  }

  private async handleError(error: unknown): Promise<void> {
    if (error instanceof DualisSessionError) {
      await this.dualisAuthService.logout();
      await this.router.navigate(['/dualis/login'], { replaceUrl: true });
    } else {
      throw error;
    }
  }
}
