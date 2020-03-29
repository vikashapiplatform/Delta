import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from "../../services/image-upload.service";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ArtistService } from "../../services/artist.service";
import { SongService } from "../../services/song.service";
import { strict } from 'assert';
import { stringify } from 'querystring';
import {Router} from "@angular/router"


@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  constructor(private imageService: ImageUploadService, private fb: FormBuilder, public ArtistService: ArtistService, public SongService: SongService , private router: Router) {

    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
      name: "hello"
    })
  }
  showArtist:boolean = false
  Data: any;
  ngOnInit(): void {
    this.getAllArtist();
  }

  private imageTitle: string;
  private imageDescription: string;
  private imageFile: File;

  song = {
    "name": "Name",
    "dor": "09-01-1991",
    "image": "Good at bgm",
    "artists": "Artists",
    "artistid": "5e7f411709081f7c9c29737a",
    "rating": "2",
  }

  artist = {
    "name": "Name",
    "dob": "09-01-1991",
    "bio": "Good at anything",
    "rating": "2",
  }


  ratings = ["1", "2", "3", "4", "5"]

  form: FormGroup;

  toggleShowArtist(){
    this.showArtist = !this.showArtist;
  }

  getAllArtist(){
    this.ArtistService.getArtists().subscribe((result) => {
      this.Data = result
    })
  }


  getArtistName(id) {
    var i;
    for (i = 0; i < this.Data.length; i++) {
      if (id == this.Data[i].id) {
        return this.Data[i].name;
      }
    }
  }


  imageInputChange(imageInput: any) {
    this.imageFile = imageInput.files[0];
    console.log("Image input got");
  }

  // addImage() {
  //   let infoObject = {
  //     title: this.imageTitle,
  //     description: this.imageDescription
  //   };
  //   const link = this.imageService.uploadImage(this.imageFile, infoObject).then(
  //     (result) => {
  //       console.log("Image Link in the component " + result["data"].link);
  //     }

  //   );
  //   // console.log(link);
  //   this.imageTitle = "";
  //   this.imageDescription = "";
  // }

  onSubmit() {
    // console.log(this.song.rating);
    // console.log(this.form.value);

    let infoObject = {
      title: this.imageTitle,
      description: this.imageDescription
    };
    const link = this.imageService.uploadImage(this.imageFile, infoObject).then(
      (result) => {
        console.log("Image Link in the component " + result["data"].link);
        this.song.image = result["data"].link;
        if (this.form.value.checkArray.length > 0) {
          var artists = "" + this.getArtistName(this.form.value.checkArray[0]);
          var artistid = "" + this.form.value.checkArray[0];
          for (var i = 1; i < this.form.value.checkArray.length; i++) {
            artistid += "," + this.form.value.checkArray[i];
            artists += "," + this.getArtistName(this.form.value.checkArray[i]);
          }
        }

        this.song.artists = artists;
        this.song.artistid = artistid;

        console.log(this.song);

        this.SongService.createSong( this.song ).subscribe( (result ) => { console.log( " Success " + result);
        this.router.navigate(['/songs']);
      }
        
        ,(error)=>{
          console.log("error" + error);
          this.router.navigate(['/songs']);
        }
        )

      }

    );
    // console.log(link);
    this.imageTitle = "";
    this.imageDescription = "";
  }



  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  addArtist(){
      console.log(this.artist);
      this.ArtistService.createArtist( this.artist ).subscribe( (result ) => { 

        this.ArtistService.getArtists().subscribe((result) => {
          this.Data = result
        })
        // this.router.navigate(['/songs']);
      }),(error)=>{
        console.log("error" + error);
        // this.router.navigate(['/songs']);
      }
    }
}
