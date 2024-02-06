import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INav } from 'src/app/interfaces/inav';
import { paths } from 'src/config/paths';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  constructor(private http:HttpClient){}
  nav!: INav[];
  ngOnInit(): void {
    //this.printMenu()
  }
  // getMenu():Observable<INav[]>{
  //   //return this.http.get<INav[]>(paths.jsonPath + "nav.json")
  // }
  // printMenu():void{
  //   this.getMenu().subscribe((result)=>{
  //     this.nav = result;
  //   });
  // }
}
