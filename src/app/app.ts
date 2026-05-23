import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CartComponent } from './features/cart/cart.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ScrollTopComponent } from './shared/components/scroll-top/scroll-top.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CartComponent, ToastComponent, ScrollTopComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
