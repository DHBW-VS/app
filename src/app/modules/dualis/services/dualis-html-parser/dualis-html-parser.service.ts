import { Injectable } from '@angular/core';
import { DualisExam, DualisSemesterList, DualisSemesterListItem, DualisUnit } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DualisHtmlParserService {
  constructor() {}

  public parseSemesterList(html: string): DualisSemesterList {
    const items: DualisSemesterListItem[] = [];
    const document = new DOMParser().parseFromString(html, 'text/html');
    const optionElements = document.querySelector('#semester')?.getElementsByTagName('option');
    for (const optionElement of optionElements || []) {
      items.push({
        id: optionElement.value,
        displayName: optionElement.innerHTML,
      });
    }
    return items;
  }

  public parseSemesterGpa(html: string): string | null {
    const document = new DOMParser().parseFromString(html, 'text/html');
    const tbodyElement = document.querySelector('#contentSpacer_IE')?.getElementsByTagName('tbody')[0];
    const trElements = tbodyElement?.getElementsByTagName('tr');
    if (!trElements) {
      return null;
    }
    for (const trElement of trElements) {
      const thElements = trElement.querySelectorAll('th');
      if (thElements.length === 0) {
        continue;
      }
      return thElements[1].innerHTML.trim();
    }
    return null;
  }

  public parseSemesterCredits(html: string): string | null {
    const document = new DOMParser().parseFromString(html, 'text/html');
    const tbodyElm = document.querySelector('#contentSpacer_IE')?.getElementsByTagName('tbody')[0];
    const trElements = tbodyElm?.getElementsByTagName('tr');
    if (!trElements) {
      return null;
    }
    for (const trElm of trElements) {
      const thElms = trElm.querySelectorAll('th');
      if (thElms.length === 0) {
        continue;
      }
      return thElms[2].innerHTML.trim();
    }
    return null;
  }

  public parseUnits(html: string): DualisUnit[] | null {
    const document = new DOMParser().parseFromString(html, 'text/html');
    const tbodyElement = document.querySelector('#contentSpacer_IE')?.getElementsByTagName('tbody')[0];
    const trElements = tbodyElement?.getElementsByTagName('tr');
    if (!trElements) {
      return null;
    }
    const units: DualisUnit[] = [];
    for (const trElement of trElements) {
      const tdElms = trElement.querySelectorAll('td');
      if (tdElms.length === 0) {
        continue;
      }
      const scriptContent = tdElms[5].querySelectorAll('script')[0].innerHTML;
      const scriptContentRegex = scriptContent.match(/,-N\d+",/);
      const id = scriptContentRegex ? scriptContentRegex[0].replace(',-N', '').replace('",', '') : '';
      const no = tdElms[0].textContent?.trim() || '';
      const displayName = tdElms[1].textContent?.trim() || '';
      const finalGrade = tdElms[2].textContent?.trim() || '';
      const credits = tdElms[3].textContent?.trim() || '';
      const status = tdElms[4].textContent?.trim() || '';
      units.push({
        id,
        no,
        displayName,
        finalGrade,
        credits,
        status,
        exams: undefined,
      });
    }
    return units;
  }

  public parseExams(html: string): DualisExam[] | null {
    const document = new DOMParser().parseFromString(html, 'text/html');
    const tableElement = document.querySelectorAll('table')[0];
    const trElements = tableElement.querySelectorAll('tr');
    const exams: DualisExam[] = [];
    for (const trElement of trElements) {
      const tbdataElms = trElement.querySelectorAll('.tbdata');
      if (tbdataElms.length === 0) {
        continue;
      }
      const attempt = tbdataElms[0].textContent?.trim() || '';
      const displayName = tbdataElms[1].textContent?.trim() || '';
      const date = tbdataElms[2].textContent?.trim() || '';
      const grade = tbdataElms[3].textContent?.trim() || '';
      const externalAccepted = tbdataElms[4].textContent?.trim() || '';
      exams.push({
        attempt,
        date,
        displayName,
        externalAccepted,
        grade,
      });
    }
    return exams;
  }
}
