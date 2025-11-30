import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ConsultaPage } from './consulta.page';

describe('ConsultaPage', () => {
  let component: ConsultaPage;
  let fixture: ComponentFixture<ConsultaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultaPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, IonicStorageModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
