import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFrComponent } from './news-fr.component';

describe('NewsFrComponent', () => {
  let component: NewsFrComponent;
  let fixture: ComponentFixture<NewsFrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsFrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
