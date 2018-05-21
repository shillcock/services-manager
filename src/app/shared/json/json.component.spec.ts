import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonComponent } from './json.component';

describe('JsonComponent', () => {
  let component: JsonComponent;
  let fixture: ComponentFixture<JsonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JsonComponent]
    });

    fixture = TestBed.createComponent(JsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const query = (elem: any, selector: any) => elem.querySelector(selector);
  const innerText = (elem: any, selector: any): string =>
    query(elem, selector).innerText;

  const mockData = {
    aString: 'foo',
    aNumber: 42,
    aBoolean: true,
    aNull: null
  };

  it('should render json with syntax highlighting', () => {
    component.data = mockData;
    fixture.detectChanges();

    const elem: any = fixture.nativeElement;
    const keyNodes: any = elem.querySelectorAll('.json-key');
    expect(keyNodes.length).toBe(4);
    expect(keyNodes[0].innerText).toBe('"aString":');
    expect(innerText(elem, '.json-string')).toBe(`"${mockData.aString}"`);
    expect(innerText(elem, '.json-number')).toBe(`${mockData.aNumber}`);
    expect(innerText(elem, '.json-boolean')).toBe(`${mockData.aBoolean}`);
    expect(innerText(elem, '.json-null')).toBe(`${mockData.aNull}`);
  });

  it('should render json with no syntax highlighting', () => {
    component.data = mockData;
    component.syntaxHighlight = false;

    fixture.detectChanges();

    const elem: any = fixture.nativeElement;
    const keyNodes: any = elem.querySelectorAll('.json-key');
    expect(keyNodes.length).toBe(0);
    expect(query(elem, '.json-string')).toBeNull();
    expect(query(elem, '.json-number')).toBeNull();
    expect(query(elem, '.json-boolean')).toBeNull();
    expect(query(elem, '.json-null')).toBeNull();
  });
});
