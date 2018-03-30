import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EventService } from '../../../..';
import { MatDialog } from '@angular/material';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-tell-us',
  templateUrl: './tell-us.component.html',
  styleUrls: ['./tell-us.component.scss']
})
export class TellUsComponent implements AfterViewInit, OnInit {

  constructor (
    public dialog: MatDialog,
    public eventService: EventService
  ) { }

  ngAfterViewInit () {
    this.showForm();
  }

  ngOnInit () {
  }

  showForm () {
    this.dialog.open(FormComponent, {

    });
  }

}
