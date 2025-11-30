import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PacientePage } from './paciente.page';

describe('PacientePage', () => {
  let component: PacientePage;
  let fixture: ComponentFixture<PacientePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PacientePage],
      imports: [IonicModule.forRoot(), RouterTestingModule, IonicStorageModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
