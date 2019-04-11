import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

   width:number;

  constructor(private router:Router) {
   
  }

  
  ngOnInit() {
  }

  openNav(){
    this.width = 250;
    console.log('hi');
   }  
   closeNav(){
     this.width = 0;
   }

   Create_card(){
    this.router.navigate(['create_card']);
   }
}
