import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import flatpickr from 'flatpickr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements AfterViewInit {

  constructor(private http: HttpClient) {}
  
  ngAfterViewInit(): void {
    flatpickr('.date-input', {
      dateFormat: 'Y-m-d',
      minDate: 'today',
      disableMobile: true
    });
  }

  citySuggestions: string[] = [];
  searchText = '';
  showSuggestions = false;

  onCityInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (!value.trim()) {
      this.citySuggestions = [];
      return;
    }

    const headers = new HttpHeaders({
      'X-RapidAPI-Key': '3e05adca53mshbeffe2fcdf22040p10c05ajsn2bbfff84d112',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    });

    this.http.get<any>(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${value}`,
      { headers }
    ).subscribe((res) => {
      this.citySuggestions = res.data.map((city: any) => `${city.city}, ${city.country}`);
      console.log("our data : ", this.citySuggestions);
    });
  }

  selectCity(suggestion: string) {
    this.searchText = suggestion;
    this.citySuggestions = [];
    this.showSuggestions = false;
  }

  hideSuggestions() {
    // Add a small delay to allow (mousedown) event to fire
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }
}

