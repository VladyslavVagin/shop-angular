import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-store-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './store-navbar.component.html'
})
export class StoreNavbarComponent {
  authService = inject(AuthService);
 }
