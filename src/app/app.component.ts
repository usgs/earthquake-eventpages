import { Component, OnInit } from '@angular/core';

import { ContributorService } from './core/contributor.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor (public contributorService: ContributorService) { }

  ngOnInit () {
    this.contributorService.getContributors();
  }
}
