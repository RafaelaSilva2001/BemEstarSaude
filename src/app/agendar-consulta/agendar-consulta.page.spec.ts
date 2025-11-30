import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AgendarConsultaPage } from './agendar-consulta.page';

describe('AgendarConsultaPage', () => {
  let component: AgendarConsultaPage;
  let fixture: ComponentFixture<AgendarConsultaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgendarConsultaPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, IonicStorageModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AgendarConsultaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
