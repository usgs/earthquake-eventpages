import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';
import { of } from 'rxjs';

import { ContributorService } from '@core/contributor.service';
import { EventService } from '@core/event.service';
import { AppComponent } from './app.component';
import { Event } from './event';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>,
    component: AppComponent,
    contributorService;

  beforeEach(async(() => {
    const contributorServiceStub = {
      getContributors: jasmine.createSpy('contributorService::getContributors')
    };

    const titleServiceStub = {
      setTitle: jasmine.createSpy('Title::setTitle')
    };

    const eventServicedStub = {
      event$: of(new Event({}))
    };

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: EventService, useValue: eventServicedStub },
        { provide: ContributorService, useValue: contributorServiceStub },
        { provide: Title, useValue: titleServiceStub }
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

  describe('onEvent', () => {
    it('calls titleService', () => {
      spyOn(component.eventTitlePipe, 'transform').and.returnValue(
        'test title'
      );
      component.onEvent(new Event({}));
      expect(component.eventTitlePipe.transform).toHaveBeenCalled();
      expect(component.titleService.setTitle).toHaveBeenCalledWith(
        'test title'
      );
    });

    it('sets title correctly when event is null', () => {
      component.onEvent(null);
      expect(component.titleService.setTitle).toHaveBeenCalledWith(
        'Unknown Event'
      );
    });
  });
});
