import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { application } from 'src/assets/application';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  private SERVER_URL = 'https://localhost:44372/api/generate/InternalAppAssets';
  // private SERVER_URL = 'https://localhost:44356/home/MoreUpload';        // test app

  constructor(private httpClient: HttpClient) { }

  onSubmit(e: any) {
    e.preventDefault();
    const files = (document.querySelector('[type=file]') as any)?.files;
    if (files?.length > 0) {
      const formData = new FormData();
      formData.append(
        'App',
        new Blob([JSON.stringify(application)], { type: 'application/json' }),
        'Application');

      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        formData.append('Assets', file, file.name);
      }
      this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    } else {
      this.httpClient.post<any>(this.SERVER_URL, application).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    }
  }
}


