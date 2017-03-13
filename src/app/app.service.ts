import { Http, Response, Headers } from "@angular/http";

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import 'rxjs/Rx';

@Injectable()
export class RatingService {
	headers = new Headers({'Content-type':'application/json'});

	url:string = 'http://ratings.ilsoda.co.za/ratings.php';
	constructor(private http:Http){}


	sendRating(body){
		return this.http.post(this.url, body, {headers:this.headers}).
		       map((response: Response)=>response.json()).
			   catch((response:Response)=>Observable.throw(response.json()));
	}
	getRatings(){
		return this.http.get(this.url).
		    map((response: Response)=>{
		       	return response.json();
	        }).
		    catch((response:Response)=>Observable.throw(response));
	}
	updateRating(id, type){
		return this.http.put(this.url+'/'+id+'/'+type, {'id':id}).
		    map((response: Response)=>response).
		    catch((response:Response)=>Observable.throw(response));
	}
}
