import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalStatusComponent } from './animal-status.component';

describe('AnimalStatusComponent', () => {
  let component: AnimalStatusComponent;
  let fixture: ComponentFixture<AnimalStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
