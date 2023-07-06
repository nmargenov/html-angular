import { Component } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  selectedFile: File | undefined;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }
}
