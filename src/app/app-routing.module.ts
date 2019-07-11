import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadTestComponent } from './fileUploadTest/file-upload-test/file-upload-test.component';

const routes: Routes = [ { path: '**', component: FileUploadTestComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
