import { TestBed } from '@angular/core/testing';
import { DualisExam, DualisSemesterList, DualisUnit } from '../../interfaces';
import { DualisHtmlParserService } from './dualis-html-parser.service';

describe('DualisHtmlParserService', () => {
  let service: DualisHtmlParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DualisHtmlParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the correct semester list', async () => {
    const html = `
    <div class="formRow">
      <div class="inputFieldLabel long">
        <label for="semester">Semester:</label>
        <select id="semester" name="semester">
          <option value="000000015058000" selected="selected">SU 2020</option>
          <option value="000000015048000">WI 2019/20</option>
        </select>
        <input name="Refresh" type="submit" value="Refresh" class="img img_arrowReload">
      </div>
    </div>`;
    const exspectedResult: DualisSemesterList = [
      {
        id: '000000015058000',
        displayName: 'SU 2020',
      },
      {
        id: '000000015048000',
        displayName: 'WI 2019/20',
      },
    ];
    const list = service.parseSemesterList(html);
    expect(list).toEqual(exspectedResult);
  });

  it('should return the correct gpa and semester credits', async () => {
    const html = `
    <div id="contentSpacer_IE" class="pageElementTop">
    <div>
      <table>
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          <tr></tr>
          <tr></tr>
          <th colspan="2">Semester GPA</th>
          <th class="tbdata">  1,4</th>
          <th> 58,0</th><th class="tbdata" colspan="4">&nbsp;</th></tr>
        </tbody>
      </table>
    </div>
    </div>`;
    const exspectedGpa: string = '1,4';
    const gpa = service.parseSemesterGpa(html);
    expect(gpa).toEqual(exspectedGpa);
    const exspectedSemesterCredits: string = '58,0';
    const semesterCredits = service.parseSemesterCredits(html);
    expect(semesterCredits).toEqual(exspectedSemesterCredits);
  });

  it('should return the correct units', async () => {
    const html = `
    <div id="contentSpacer_IE" class="pageElementTop">
    <div>
      <table>
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          <tr>
            <td>WWI_100</td>
            <td>Wissenschaftliches Arbeiten</td>
            <td>b</td>
            <td>  5,0</td>
            <td>bestanden</td>
            <td class="tbdata" style="vertical-align:top;">
              <a id="Popup_test" href="javascript:open_test();">Exams</a>
              <script type="text/javascript">
                <!--
                var msg;
                function open_test() {
                var msg = dl_popUp("/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=RESULTDETAILS&ARGUMENTS=-N111222333444555,-N000312,-N111222111222111","Resultdetails",750,400);
                }
                var elmt=document.getElementById("Popup_test");
                elmt.href="javascript:open_test();";
                //-->
              </script>
            </td>
            <td class="tbdata"></td>
          </tr>
          <tr>
            <td>WWI_123</td>
            <td>Management</td>
            <td>  1,3</td>
            <td>  7,0</td>
            <td>bestanden</td>
            <td class="tbdata" style="vertical-align:top;">
              <a id="Popup_test" href="javascript:open_test();">Exams</a>
              <script type="text/javascript">
                <!--
                var msg;
                function open_test() {
                var msg = dl_popUp("/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=RESULTDETAILS&ARGUMENTS=-N111222333444555,-N000312,-N333222333222333","Resultdetails",750,400);
                }
                var elmt=document.getElementById("Popup_test");
                elmt.href="javascript:open_test();";
                //-->
              </script>
            </td>
            <td class="tbdata"></td>
          </tr>
          <th></th>
          <th></th>
        </tbody>
      </table>
    </div>
    </div>`;
    const exspectedUnits: DualisUnit[] = [
      {
        id: '111222111222111',
        displayName: 'Wissenschaftliches Arbeiten',
        no: 'WWI_100',
        status: 'bestanden',
        credits: '5,0',
        finalGrade: 'b',
        exams: undefined,
      },
      {
        id: '333222333222333',
        displayName: 'Management',
        no: 'WWI_123',
        status: 'bestanden',
        credits: '7,0',
        finalGrade: '1,3',
        exams: undefined,
      },
    ];
    const units = service.parseUnits(html);
    expect(units).toEqual(exspectedUnits);
  });

  it('should return the correct exams', async () => {
    const html = `
    <table>
      <tbody>
        <tr><td>&nbsp;</td></tr>
        <tr>
          <td>Attempt</td>
          <td>&nbsp;</td>
          <td>Exam</td>
          <td>Date</td>
          <td>Grade</td>
          <td>External accepted</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>Attempt  1</td>
          <td>&nbsp;</td>
          <td>
          </td>
        </tr>
        <tr>
          <td>Final module requirements</td>
        </tr>
        <tr>
          <td class="tbdata">SU 2020</td>
          <td class="tbdata">Neue Konzepte (100%)</td>
          <td class="tbdata">08.09.2020</td>
          <td class="tbdata">
          1,6
          </td>
          <td class="tbdata" style="text-align:center;">
          </td>
          <td class="tbdata">
          </td>
        </tr>
        <tr>
          <td class="tbdata">&nbsp;</td>
          <td class="tbdata">&nbsp;&nbsp;Künstliche Intelligenz ... - Prof. Dr. Mueller (60 P)</td>
          <td class="tbdata">&nbsp;</td>
          <td class="tbdata"> 49</td>
          <td class="tbdata">&nbsp;</td>
          <td class="tbdata">&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>Total 1</td>
          <td>&nbsp;</td>
          <td>1,6&nbsp;bestanden</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
      </tbody>
    </table>`;
    const exspectedExams: DualisExam[] = [
      {
        displayName: 'Neue Konzepte (100%)',
        grade: '1,6',
        date: '08.09.2020',
        externalAccepted: '',
        attempt: 'SU 2020',
      },
      {
        displayName: 'Künstliche Intelligenz ... - Prof. Dr. Mueller (60 P)',
        grade: '49',
        date: '',
        externalAccepted: '',
        attempt: '',
      },
    ];
    const exams = service.parseExams(html);
    expect(exams).toEqual(exspectedExams);
  });
});
