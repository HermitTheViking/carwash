import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WashPage } from './wash.page';
import { MenuComponent } from '../menu/menu.component';

describe('WashPage', () => {
  let component: WashPage;
  let fixture: ComponentFixture<WashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WashPage],
      imports: [IonicModule.forRoot(), MenuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
