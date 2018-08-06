import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs/observable/of';

import { OafService } from '../oaf.service';
import { ModelComponent } from './model.component';


describe('ModelComponent', () => {
  let component: ModelComponent;
  let fixture: ComponentFixture<ModelComponent>;

  beforeEach(async(() => {
    const oafServiceStub = {
      model$: of(null)
    };

    TestBed.configureTestingModule({
      declarations: [
        ModelComponent
      ],
      providers: [
        {provide: OafService, useValue: oafServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
