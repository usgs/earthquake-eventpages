import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

import { ContributorService } from './core/contributor.service';


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


  it('should create the AppComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should get contributor information during construction', async(() => {
    fixture.whenStable().then(() => {
      expect(contributorService.getContributors).toHaveBeenCalled();
    });
  }));
});
