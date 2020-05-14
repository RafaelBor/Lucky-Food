import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuJuegosPage } from './menu-juegos.page';

describe('MenuJuegosPage', () => {
  let component: MenuJuegosPage;
  let fixture: ComponentFixture<MenuJuegosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuJuegosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuJuegosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
