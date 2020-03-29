import { Component } from '@angular/core';
import { SongService } from "./services/song.service";
import {Router} from "@angular/router"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test';

  constructor( public SongService:SongService , private router:Router){
    this.routerUrl = router.url; 
  }
  routerUrl;

  ngOnInit(): void {
    console.log(this.router.url);
  }

  hasRoute() {
    console.log("Inside has Route" + this.router.url);
    if( this.router.url == "/" || this.router.url == "/songs" )
    return true;
  }

  showSearch:boolean = false
  songs:any
  songName:any;

  
  
  searchSongs(){

    const argument = {
      "name":this.songName
    }
    this.SongService.searchSong(argument).subscribe( (result) => {
      this.songs = result
      this.showSearch = true
    })
  }
  
}
