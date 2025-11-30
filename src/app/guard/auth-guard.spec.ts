import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth-guard';
import { Router } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy }
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
