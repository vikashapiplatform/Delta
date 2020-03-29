import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ImageUploadService {
  private images: object[] = [];
  private url: string = "https://api.imgur.com/3/image";
  private clientId: string = "69b331e03bd9c09";
  imageLink: any;

  constructor(private http: HttpClient) {}

  async uploadImage(imageFile: File, infoObject: {}) {
    let formData = new FormData();
    formData.append("image", imageFile, imageFile.name);

    let header = new HttpHeaders({
      "authorization": 'Client-ID '+this.clientId
    });

    const imageData = await this.http
      .post(this.url, formData, { headers: header })
      .toPromise()
    
    return imageData;
    
    // this.imageLink = imageData["data"].link;
    // console.log("Inside the service " + this.imageLink);
    // return this.imageLink;
  }

  getImages() {
    return this.images;
  }
}
