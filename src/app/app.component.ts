import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { ModalComponent } from './modal/modal.component';

import { RatingService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RatingService]
})
export class AppComponent implements OnInit{

	//@Member properties
 	btnText:string 	   = 'Rate';
 	platform:string    = 'site';
 	isFormOpen:boolean = true;
 	ratingValue:number = 0;
 	ratingComplete:boolean = true;
 	waiting:boolean =  false;
 	AppTitle:string = "Home - Ilsoda";
 	//@Member Input fields
  name:string = '';
 	emailAddress:string = '';
 	comment:string = '';

 	formErrors = {
 		message: ''
 	};

 	//@Server updated properties
 	ratingResponse:any = {
 		title: '',
 		message: '',
 		status: true
 	}

  	ngOnInit() {
  		this.titleService.setTitle(this.AppTitle);
  	}
 	constructor(private ratingService:RatingService,private titleService: Title){

 	}
 	//@member functions
 	openRatingForm () :boolean{
 		return this.isFormOpen = !this.isFormOpen;
 	}

 	substring (val) {
 		return val.substring(0, val.indexOf('@'));
 	}

 	removeActive (elements) {
 		for(let i =1;i <=elements.length;i++) {
 			document.getElementById(i.toString()).classList.remove('active');
 		}
 	}

 	rateService (evt) {
 		let from = evt.target.getAttribute('id');

 		let getStars = document.getElementsByClassName('stars');

 		this.removeActive(getStars);
 		this.ratingValue = from;

 		for(let i = 1;i <=from;i++) {

 			let currentStar = document.getElementById(i.toString());

 			currentStar.classList.remove('glyphicon-star-empty');
 			currentStar.classList.add('glyphicon-star');
 		}
 	}

 	sendRatingData () {
 		//Some form validations
    let name=this.name;
 		let emailAddress=this.emailAddress;
 		let comment=this.comment;

 		let emailRegExp = /^([A-Za-z0-9_\.\-])+\@([A-Za-z0-9_\.\-])+\.([net|com|co.za|info|biz|edu|ac.za|org|int|mil|gov])+$/;

 		if(emailAddress.match(emailRegExp) && comment.length > 0 && this.ratingValue > 0) {

 			this.formErrors.message = '';
 			this.waiting = true;
 			this.ratingService.sendRating({
 				'name'   : name,
        'email'   : emailAddress,
 				'message' : comment,
 				'rating'  : this.ratingValue
 			}).subscribe(
				data => {
					this.ratingResponse.title   = data.title;
          this.ratingResponse.name = data.name;
					this.ratingResponse.message = data.message;
					this.ratingResponse.status = data.status;

					if(this.ratingResponse.status) {
						this.ratingComplete = false;
						document.getElementById('showPopup').click();
					}
				},
				error => {
					this.ratingResponse.title   = error.title;
					this.ratingResponse.name = error.name;
          this.ratingResponse.message = error.message;
					this.ratingResponse.status = error.status;

					if(!this.ratingResponse.status) {
						this.ratingComplete = false;
						document.getElementById('showPopup').click();
					}
				}
			);
 		}
 		else{
 			 this.formErrors.message = 'Please make sure you enter a valid email address, type in your message and click a star.';
 		}
 	}
}
