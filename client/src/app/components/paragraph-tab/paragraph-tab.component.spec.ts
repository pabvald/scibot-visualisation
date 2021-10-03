import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphTabComponent } from './paragraph-tab.component';

describe('ParagraphTabComponent', () => {
  let component: ParagraphTabComponent;
  let fixture: ComponentFixture<ParagraphTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParagraphTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
