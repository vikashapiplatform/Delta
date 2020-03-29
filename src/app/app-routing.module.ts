import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddImageComponent } from "./components/add-image/add-image.component";
import { ArtistsComponent } from "./components/artists/artists.component";
import { SongsComponent } from "./components/songs/songs.component";


const routes: Routes = [
  { path: "addsong", component: AddImageComponent },
  { path: "artists", component: ArtistsComponent },
  { path: "songs", component: SongsComponent },
  { path: "", redirectTo: '/songs',
  pathMatch: 'full'},
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
