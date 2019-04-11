import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-first-comp',
  templateUrl: './first-comp.component.html',
  styleUrls: ['./first-comp.component.css']
})
export class FirstCompComponent implements OnDestroy {
  
  name="shashi";
  message="";
  num=1;
  card:[];
  width:number = 0;
  hidden:boolean= false;
  @ViewChild('text') text: ElementRef;

  Arrow_img_src='assets/images/arrow.svg';
  left_arrow_img_src='assets/images/left_arrow.svg';
  cards = [{_id: 1, src:'assets/images/card01.jpg',title:'Hi',content:'shgfkgsd',time:'1'},
           {_id:2, src:'assets/images/card02.jpg',title:'Bye',content:'sgfjsk',time:'2'},
           {_id:3, src:'assets/images/card01.jpg',title:'Hi',content:'shgfkgsd',time:'1'},
           {_id:4, src:'assets/images/card01.jpg',title:'Hi',content:'shgfkgsd',time:'1'},
          ];

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router : Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

increment(){
  this.num = this.num+1;
  console.log(`parent data = ${this.num}`);
  this.hidden = !this.hidden;
}

  ngOnInit() {
    console.log(`this before view = ${this.text.nativeElement}`)
  }

  ngAfterViewInit(){
    console.log(this.text.nativeElement.innerHTML);
  }

  openNav(){
   this.width = 250;
   console.log('hi');
  }  
  closeNav(){
    this.width = 0;
  }
  
  cardView(card){
    this.card=card;
   
  }

}
