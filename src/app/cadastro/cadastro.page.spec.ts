import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CadastroPage } from './cadastro.page';

describe('CadastroPage', () => {
  let component: CadastroPage;
  let fixture: ComponentFixture<CadastroPage>;

  beforeEach(async () => {
    const alertControllerMock = {
      create: jasmine.createSpy('create').and.returnValue(Promise.resolve({
        present: jasmine.createSpy('present')
      }))
    };

    await TestBed.configureTestingModule({
      declarations: [CadastroPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, IonicStorageModule.forRoot()],
      providers: [
        { provide: AlertController, useValue: alertControllerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
