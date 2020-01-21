import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { AppComponent } from '@app/component';
import { configureTestSuite } from 'ng-bullet';
import { AppTestingModule } from './app-testing.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        AppTestingModule
      ]
    })
      .overrideTemplate(AppComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
