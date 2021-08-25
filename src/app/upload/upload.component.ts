import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  SERVER_URL = "https://localhost:44372/api/Generate/InternalAppAssets";
  uploadForm!: FormGroup;
  text: string = '';

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });

    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost/assets/data/application.json", false);
    request.send(null);
    this.text = JSON.stringify(request.responseText);
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile')?.setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append("application", new Blob([JSON.stringify(this.text)], {
      type: 'application/json'
    }));
    formData.append('file', this.uploadForm.get('profile')?.value);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
