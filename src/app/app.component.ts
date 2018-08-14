import { Component, OnInit } from '@angular/core';

import { ContributorService } from './core/contributor.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(public contributorService: ContributorService) {}

  ngOnInit() {
    this.contributorService.getContributors();
  }
}
