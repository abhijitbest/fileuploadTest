import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadTestComponent } from './fileUploadTest/file-upload-test/file-upload-test.component';
import { UploadFileDirectiveDirective } from './customDirective/upload-file-directive.directive';


@NgModule({
  declarations: [
    AppComponent,
    FileUploadTestComponent,
    UploadFileDirectiveDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
