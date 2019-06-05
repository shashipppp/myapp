import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardService } from '../card.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit,OnChanges {
  
  atitle:string = 'Hi buddy';
  success = false;
  Card_Form: FormGroup;
  result:string;
  
@ViewChild('card_image') card_image:ElementRef;

  constructor(private fb: FormBuilder, private cardService:CardService) { }

  ngOnInit() {
    console.log(this.atitle);
   this.Card_Form = this.fb.group({
     title:['',[Validators.required,Validators.minLength(4)]],
     summary:['',[Validators.required]],
     category: ['',[Validators.required]],
     content: [''],
     parental_view: [false,[Validators.required]],
     approved:[false],
     image: ['',[Validators.required]]
   }) 
  }

  ngOnChanges(changes: SimpleChanges){
    
    console.log(this.atitle);

  }

  onSubmit(){
    const formValue = this.Card_Form.value;
    console.log(this.card_image);
    const image = this.card_image.nativeElement;
    const ImageFile:File = image.files[0];
    
    const currentUser = JSON.parse(sessionStorage.getItem('myapp_user'));
    const created_by = currentUser.USERID;

    const formData = new FormData();
    formData.append('title', formValue.title);
    formData.append('summary',formValue.summary);
    formData.append('content',formValue.content);
    formData.append('category',formValue.category);
    formData.append('parental_view',formValue.parental_view);
    formData.append('approved',formValue.approved);
    formData.append('image',ImageFile,ImageFile.name);
    formData.append('created_by', created_by);
    this.cardService.cardPost(formData).subscribe((res:HttpResponse<any>)=>{
      console.log(res);
      this.success = true;
    
    },(err:HttpErrorResponse)=>{
      console.log(err);
    })
  }
}
