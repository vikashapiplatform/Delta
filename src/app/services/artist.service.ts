import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor( private http: HttpClient ) { }


  getArtists(  ) {
    let query = "http://localhost:5000/artists"

    return this.http.get(query);
  }

  createArtist( artist:any ){
    const url = "http://localhost:5000/createartist"
    return this.http.post(url , artist)
  } 
}
