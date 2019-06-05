import { Component, OnInit, DoCheck, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PlaceOrderService } from './place-order.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit, AfterViewInit {
  samples:any;
  white_samples;
  grey_samples;
  main_imageSrc=[];
  description=[];
  price=[];
  selectedColor='white';
  selectedCard:String;
  type:string;
  colors=[];
  err_message;
  user_imagePath;
  imgURL;
  add_cart_message:string;
  image01:File;
  image02:File;
  image03:File;
  @ViewChild('image_container') sample_image:ElementRef;
  
  constructor(private designService:PlaceOrderService, private activatedRouter:ActivatedRoute) { }

  ngOnInit() {

  //this.white_samples = [{description:'single lengthy image',src:'assets/images/cup_sample01.jpg'},{description:'single image with writings',src:'assets/images/cup_sample02.jpg'},{description:'single image with writings',src:'assets/images/cup_sample02.jpg'}];
  //this.grey_samples =  [{description:'single lengthy image',src:'assets/images/greyCup_sample01.jpg'},{description:'single image with writings',src:'assets/images/greyCup_sample02.jpg'},{description:'single image with writings',src:'assets/images/greyCup_sample03.jpg'}];
  //this.samples = this.white_samples;  

  this.activatedRouter.queryParams.subscribe(params=>{
    this.selectedCard = params.selected_card;
    this.type = params.type;
  });

    this.designService.getDesign(this.selectedCard).subscribe((res)=>{
        console.log('design '+res);
        this.main_imageSrc.push(res.main_img);
        this.description.push(res.description);
        this.price.push(res.price);
        this.samples = res.samples;
        this.colors.push('white','grey','red');

    },(err:HttpErrorResponse)=>{ console.log('error in reponse of design '+err)})
 }

  //ngDoCheck(){
    //console.log(this.selectedColor);
    //
  //}
  
changeColor(color){
  console.log(color);

    this.designService.getDesign_byColor(this.selectedCard,this.selectedColor).subscribe((res)=>{
      console.log('design '+res);
      this.main_imageSrc.splice(0,1,res.main_img);
      this.description.splice(0,1,res.description);
      this.price.splice(0,1,res.price);
      this.samples = res.samples;

  },(err:HttpErrorResponse)=>{ console.log('error in reponse of design '+err)})
  
}

preview(files) {
  if (files.length === 0)
    return;

  var mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    this.err_message = "Only images are supported.";
    return;
  }

  var reader = new FileReader();
  this.user_imagePath = files;
  reader.readAsDataURL(files[0]); 
  reader.onload = (_event) => { 
    this.imgURL = reader.result; 
  }
}

img_upload(file){
  console.log(file.files);

  if(!this.image01){
    this.image01 = file.files[0]; 
    console.log('img01: '+this.image01);return;
  }
  if(this.image01 && !this.image02){
      this.image02 = file.files[0];
      console.log('img02: '+this.image02);return;
  }
  if(this.image01 && this.image02){
    this.image03 = file.files[0];
    console.log('img03: '+this.image03);return;
  }
}

add_to_cart(){
    const formData = new FormData();

    formData.append('image01', this.image01, this.image01.name);
    formData.append('image02', this.image02, this.image02.name);
    formData.append('image03', this.image03, this.image03.name);

    console.log(formData);
}  

change_img0(sample){
   this.sample_image.nativeElement.src = sample.sub_imgSrc[0];
   console.log(this.sample_image);
}
change_img1(sample){
  this.sample_image.nativeElement.src = sample.sub_imgSrc[1];
  console.log('change image is trigeered')
}

ngAfterViewInit(){
  setTimeout(() => { console.log(this.sample_image);
    
  }, 2000);
}

}
