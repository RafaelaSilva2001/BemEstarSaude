import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MedicosPage } from './medicos.page';

describe('MedicosPage', () => {
  let component: MedicosPage;
  let fixture: ComponentFixture<MedicosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicosPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
