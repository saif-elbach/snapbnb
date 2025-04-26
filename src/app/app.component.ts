import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, inject, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { CarouselComponent } from "../carousel/carousel.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FiltersBarComponent } from "../filters-bar/filters-bar.component";
import { NgIf } from '@angular/common';
import { ModalLanguagesComponent } from "../modal-languages/modal-languages.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchBarComponent, CarouselComponent, TranslateModule, FiltersBarComponent, ModalLanguagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isScrolled = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 30; // adjust scroll threshold
  }
  


  translate: TranslateService = inject(TranslateService);
  translateText(language: string){
    this.translate.use(language);
  }

  isMobileMenuOpen = false;

  // Automatically open menu when screen size is under 1024px (Tailwind's `lg`)
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    if (width < 1024) {
      this.isMobileMenuOpen = true;
    } else {
      this.isMobileMenuOpen = false;
    }
  }

  ngOnInit() {
    // On component load, check initial screen size
    this.isMobileMenuOpen = window.innerWidth < 1024;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  
  


}
