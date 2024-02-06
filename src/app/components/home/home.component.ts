import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INav } from 'src/app/interfaces/inav';
import { paths } from 'src/config/paths';
import { TokenValidateServiceService } from 'src/app/services/token-validate-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private tokenService: TokenValidateServiceService) { }
  ngOnInit(): void {
    this.tokenService.redirectBasedOnToken();
  }
}
