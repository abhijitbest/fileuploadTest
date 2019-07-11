import { Directive, ElementRef, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadService } from '../_services/upload.service';


@Directive({
  selector: '[appUploadFileDirective]'
})
export class UploadFileDirectiveDirective {
  @Input() public url: any; //upload url (api)
  @Output() public filesData = new EventEmitter<boolean>(); // on success/failure of file upload return true/false
  @Output() public previewHtml = new EventEmitter<any>(); // returning  preview array html string
  element: ElementRef;

  public mime_psd: string[] = [
    'image/jpeg',
    'image/jpg',
    'image/png'
  ];  // file type check array

  constructor(element: ElementRef, uplaodService: UploadService) {
    this.element = element;   
  }

  @HostListener('change')
  public onChange(): any {
    let files = this.element.nativeElement.files;    
    let list: any = [];
    for (let file of files) {
      if (this.getMimeClass(file) == 'image') {
        list.push(file);
      } else {
        alert('Unsupported file format found');
      }
    }
    let formData = new FormData();
    formData.append('upload', list);
    if (list.length > 0 && this.url != undefined) {
      this.makeFileRequest(this.url, list);
    }
  }

  /* Actual uplaod file to the sever/db and on success created file preview  string */
  makeFileRequest(url: string, files: Array<File>) {
    var that = this;
    return Observable.bind(new Promise((resolve, reject) => {
      let formData: any = new FormData()
      let xhr = new XMLHttpRequest()
      for (let file of files) {
        formData.append("uploads", file, file.name)
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            that.filesData.emit(true)
            resolve(JSON.parse(xhr.response))
          } else {
            that.filesData.emit(false);
            reject(xhr.response)
          }
        }
      }
      xhr.open("POST", url, true)
      xhr.send(formData)
    }).then((response: any) => {
      var html = "";
      response.forEach(element => {
        html += '<div class="col-sm-4"><img class="img-responsive" width="304" height="236" src=' + element.image + '></div>';
      });
      this.previewHtml.emit(html);
    }).catch((err) => {
      console.log(err)
    }));
  }

  /* Checking for validation of image type (extention) */
  public getMimeClass(file: any): string {
    let mimeClass = 'application';
    if (this.mime_psd.indexOf(file.type) !== -1) {
      mimeClass = 'image';
    }
    return mimeClass;
  }


}
