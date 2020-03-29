import { Component, OnInit } from '@angular/core';
import { Artist } from "../../models/artist.model";
import {  SongService} from "../../services/song.service";


@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  constructor( private SongService:SongService) { }
  songs:any;
  ngOnInit(): void {
    this.getSongs();
  }

  getSongs(){
    this.SongService.getSongs().subscribe( (result) => {
      this.songs  = result;
    });
  }

}
