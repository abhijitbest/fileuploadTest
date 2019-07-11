import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as myGlobals from '../globalPath';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  public baseurl: any;
  constructor(private http: HttpClient) {
    this.baseurl = myGlobals.baseUrl;
   }

  upload(){
    return this.http.get<any>(this.baseurl+'getFiles').pipe(map((res:any)=>{
      return res;
    }));
  }

  removeFile(id:string){
    return this.http.delete<any>(this.baseurl+'removeFile/'+id).pipe(map((res:any)=>{
      return res;
    }));
  }
  

}
