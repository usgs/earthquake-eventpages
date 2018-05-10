import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

import { EventService } from '../../core/event.service';

import { OafService } from '../oaf.service';

import { CommentaryComponent } from './commentary.component';



describe('CommentaryComponent', () => {
  let component: CommentaryComponent;
  let fixture: ComponentFixture<CommentaryComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      product$: of(null)
    };

    const oafServiceStub = {
      oaf$: of(null)
    };

    TestBed.configureTestingModule({
      declarations: [
        CommentaryComponent
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub},
        {provide: OafService, useValue: oafServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
