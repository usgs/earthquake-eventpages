import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

import { ContributorService } from './contributor.service';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>,
      component: AppComponent,
      contributorService;

  beforeEach(async(() => {
    const contributorServiceStub = {
      getContributors: jasmine.createSpy('contributorService::getContributors')
    };

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: ContributorService, useValue: contributorServiceStub}
      ]
    }).compileComponents();


    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    contributorService = fixture.debugElement.injector.get(ContributorService);
  }));


  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should get contributor information during construction', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.whenStable(() => {
      // TODO :: Make this work
      console.log(contributorServiceStub.getContributors);
      expect(contributorService.getContributors).toHaveNotBeenCalled();
    });
  }));
});
