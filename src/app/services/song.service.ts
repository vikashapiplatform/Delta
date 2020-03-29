import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
// import { url } from 'inspector';


@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  getSongs(  ) {
    let query = "http://localhost:5000/songs"

    return this.http.get(query);
  }

  createSong( song:any ){
    const url = "http://localhost:5000/createsong"
    let header = new HttpHeaders({
      "Access-Control-Allow-Origin": "*"    });
   

    return this.http.post(url , song,{headers:header})
  }
  
  searchSong( name:any ){
    const url = "http://localhost:5000/searchsong"
    let header = new HttpHeaders({
      "Access-Control-Allow-Origin": "*"    });
   

    return this.http.post(url , name,{headers:header})
  }

}

