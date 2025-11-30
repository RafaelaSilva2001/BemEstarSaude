import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EspecialidadesPage } from './especialidades.page';

describe('EspecialidadesPage', () => {
  let component: EspecialidadesPage;
  let fixture: ComponentFixture<EspecialidadesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EspecialidadesPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(EspecialidadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
