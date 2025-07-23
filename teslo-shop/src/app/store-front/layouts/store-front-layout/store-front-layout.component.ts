import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StoreNavbarComponent } from '../../components/store-navbar/store-navbar.component';

@Component({
  selector: 'app-store-front-layout',
  imports: [RouterOutlet, StoreNavbarComponent],
  templateUrl: './store-front-layout.component.html'
})
export class StoreFrontLayoutComponent { }
