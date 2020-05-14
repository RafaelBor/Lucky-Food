import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRestauranteComponent } from './crear-restaurante.component';

describe('CrearRestauranteComponent', () => {
  let component: CrearRestauranteComponent;
  let fixture: ComponentFixture<CrearRestauranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearRestauranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
