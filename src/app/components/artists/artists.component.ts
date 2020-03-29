import { Component, OnInit } from '@angular/core';
import { Artist } from "../../models/artist.model";
import {  ArtistService} from "../../services/artist.service";


@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  constructor( private ArtistService:ArtistService) { }
  artists:any;
  ngOnInit(): void {
    this.getArtists();
  }

  getArtists(){
    this.ArtistService.getArtists().subscribe( (result) => {
      this.artists  = result;
    });
  }

}
