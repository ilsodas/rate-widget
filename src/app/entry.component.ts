import { Component, OnInit } from '@angular/core';
import { RatingService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './entry.component.html',
  providers: [RatingService]
})
export class EntryComponent{}