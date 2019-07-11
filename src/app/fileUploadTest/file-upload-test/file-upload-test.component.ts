import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/_services/upload.service';
import * as myGlobals from '../../globalPath';
@Component({
  selector: 'app-file-upload-test',
  templateUrl: './file-upload-test.component.html',
  styleUrls: ['./file-upload-test.component.css']
})
export class FileUploadTestComponent implements OnInit {
  public baseurl: any;
  public url=""; // upload url (api)
  files:any=[]; // all files to show in table
  previewImgs:String=""; // html preview string

  constructor(private uploadService:UploadService) { 
   
  }

  ngOnInit() {
    this.baseurl = myGlobals.baseUrl;
    this.url=this.baseurl+"upload"
    this.getFiles()
  }

  /* get files updated list on new file upload */
  filesData($event){   
    if($event == true){
      this.getFiles();
    }
  }

  /* api call to get an all the uploaded images from db */
  getFiles(){
    this.uploadService.upload().subscribe((res:any)=>{  
      this.files=[]
      if( res.result.length > 0){
        res.result.forEach(element => {
          element.image='data:image/jpeg;base64,'+element.image;
          this.files.push(element)
        });        
      }else{
        console.log('Files not found')
      }
    },(error)=>{
      console.log(error)
    })
  }

  /* Remove file by id  */
  removeFile(id:string){
    this.uploadService.removeFile(id).subscribe((res:any)=>{     
      if(res.result == 'success'){
        alert("Image removed successfully")
        this.getFiles();
      }
    },(error)=>{
      console.log(error)
    })
  }

  /* Preview uploaded images */
  previewImg($event){    
    if($event !=undefined){
      this.previewImgs=$event;
    }
  }
}
