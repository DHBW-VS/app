import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '@app/config';
import { lastValueFrom } from 'rxjs';
import { DualisSessionError } from '../../classes';
import { DualisExam, DualisSemester, DualisSemesterList, DualisSemesterListItem } from '../../interfaces';
import { DualisAuthService } from '../dualis-auth/dualis-auth.service';
import { DualisHtmlParserService } from '../dualis-html-parser/dualis-html-parser.service';

const LOGTAG = '[DualisPageService]';

@Injectable({
  providedIn: 'root',
})
export class DualisPageService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly dualisAuthService: DualisAuthService,
    private readonly dualisHtmlParserService: DualisHtmlParserService,
  ) {}

  public async getSemesterList(): Promise<DualisSemesterList> {
    const sessionKey = this.getSessionKey();
    const url = [
      Config.dualisBaseUrl,
      '/scripts/mgrqispi.dll',
      `?APPNAME=CampusNet&PRGNAME=COURSERESULTS&ARGUMENTS=-N${sessionKey},-N000000`,
    ].join('');
    const response$ = this.httpClient.get<string>(url);
    const response = await lastValueFrom(response$);
    return this.dualisHtmlParserService.parseSemesterList(response);
  }

  public async getSemesterByListItem(item: DualisSemesterListItem): Promise<DualisSemester | null> {
    const sessionKey = this.getSessionKey();
    const url = [
      Config.dualisBaseUrl,
      '/scripts/mgrqispi.dll',
      `?APPNAME=CampusNet&PRGNAME=COURSERESULTS&ARGUMENTS=-N${sessionKey},-N000000,-N${item.id}`,
    ].join('');
    const response$ = this.httpClient.get<string>(url);
    const response = await lastValueFrom(response$);
    const totalCredits = this.dualisHtmlParserService.parseSemesterCredits(response) || '';
    const gpa = this.dualisHtmlParserService.parseSemesterGpa(response) || '';
    const units = this.dualisHtmlParserService.parseUnits(response) || [];
    const promises = units.map(async unit => {
      const exams = await this.getExamsByUnitId(unit.id);
      unit.exams = exams || [];
    });
    await Promise.all(promises);
    return {
      id: item.id,
      displayName: item.displayName,
      gpa,
      totalCredits,
      units,
    };
  }

  private async getExamsByUnitId(unitId: string): Promise<DualisExam[] | null> {
    const sessionKey = this.getSessionKey();
    const url = [
      Config.dualisBaseUrl,
      '/scripts/mgrqispi.dll',
      `?APPNAME=CampusNet&PRGNAME=RESULTDETAILS&ARGUMENTS=-N${sessionKey},-N000000,-N${unitId}`,
    ].join('');
    const response$ = this.httpClient.get<string>(url);
    const response = await lastValueFrom(response$);
    return this.dualisHtmlParserService.parseExams(response);
  }

  private getSessionKey(): string {
    const session = this.dualisAuthService.getSession();
    if (!session || session.isExpired()) {
      throw new DualisSessionError(`Current session is expired.`);
    }
    session.resetExpirationDate();
    return session.key;
  }
}
