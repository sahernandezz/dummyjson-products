import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  cartService = inject(CartService);
  private router = inject(Router);

  searchQuery = '';

  onSearch(): void {
    const query = this.searchQuery.trim();
    if (query.length > 0) {
      this.router.navigate(['/'], { queryParams: { q: query } });
    } else {
      this.router.navigate(['/']);
    }
  }

  onClearSearch(): void {
    this.searchQuery = '';
    this.router.navigate(['/']);
  }
}
