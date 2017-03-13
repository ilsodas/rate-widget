import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'modal-component',
  styleUrls: ['./modal.component.css'],
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit{
	@Input() ratingResponse;

	constructor(private app:AppComponent){
	}

	ngOnInit () {
	}
}