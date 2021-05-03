import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  currentCity: any = ""
  verified: any = false
  required: any = false
  nearMe: any = false
  other: any = ""
  twitterSearch: any = "https://twitter.com/search?q="
  state = new FormControl();

  requirements = new FormControl();
  requirementsList: Object[] = [
    { value: 'Beds', icon: 'fa fa-bed' },
    { value: 'Oxygen', icon: 'fa fa-lungs' },
    { value: 'Ambulance', icon: 'fas fa-ambulance' },
    { value: 'ICU', icon: 'fa fa-procedures' },
    { value: 'Ventilator', icon: 'fa fa-head-side-mask' },
    { value: 'Fabiflu', icon: 'fa fa-pills' },
    { value: 'Remdesivir', icon: 'fa fa-syringe' },
    { value: 'Tocilizumab', icon: 'fa fa-capsules' },
    { value: 'Favipiravir', icon: 'fa fa-tablets' },
    { value: 'Food', icon: 'fa fa-utensils' },
    { value: 'plasma', icon: 'fa fa-disease' },
  ];
  requirementArray: any = [];
  cities: any = [];
  metaCities: any;
  countTwitterWidgets: number = 4;
  isSmallScreen: boolean = false;
  countNewsWidgets: number = 2;

  constructor(private http: HttpClient, public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 700px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.countTwitterWidgets = 1
          this.countNewsWidgets = 1
        }
      })
    this.http.get<any>('https://api.covid19india.org/state_district_wise.json').subscribe(data => {
      let keys = Object.keys(data)
      console.log(data)
      for (let i = 0; i < keys.length; i++) {
        this.cities.push(...Object.keys(data[keys[i]].districtData))
      }
      this.cities.push('Delhi', 'Bangalore', 'Bengaluru', 'Pondicherry', "Mangalore")

      this.metaCities = this.cities


    })
  }
  changeState(event) {
    this.currentCity = event.source.value
  }


  searchTwitter() {
    this.twitterSearch = "https://twitter.com/search?q="
    if (this.verified) {
      this.twitterSearch += 'verified+'
    }
    if (this.currentCity.length > 0) {

      this.twitterSearch += this.currentCity + '+'
    }
    if (this.other.length > 0) {
      this.twitterSearch += this.other + '+'
    }
    if (this.required) {
      this.twitterSearch += 'required+needed+requirement+'
    }

    if (this.requirementArray.length > 0) {
      this.twitterSearch += '%28'
      if (this.requirementArray.length > 0) {
        this.twitterSearch += "+OR+"
      }

      for (let i = 0; i < this.requirementArray.length; i++) {
        this.twitterSearch += this.requirementArray[i].value
        if (i != this.requirementArray.length - 1) {
          this.twitterSearch += '+OR+'
        }

      }
      this.twitterSearch += "%29"
    }
    if (this.verified) {
      this.twitterSearch += '-%22not+verified%22+-%22unverified%22'
    }
    if (!this.required) {
      this.twitterSearch += '-%22needed%22+-%22requirement%22+-%22required%22+-%22needs%22+-%22need%22+-%22require%22'
    }
    this.twitterSearch += '&f=live'
    if (this.nearMe) {
      this.twitterSearch += '&lf=on'
    }
    this.twitterSearch = this.twitterSearch.toString()
    window.open(this.twitterSearch, '_blank');


  }

  getRequirements(event) {
    if (event.source._selected) {
      this.requirementArray.push(event.source.value)
    }
    else {

      this.requirementArray.splice(this.requirementArray.indexOf(event.source.value), 1);


    }
  }

  onKey(value) {

    this.cities = this.search(value);


  }

  // Filter the states list and send back to populate the selectedStates**
  search(value: string) {
    this.cities = this.metaCities
    let filter = value.toLowerCase();
    let filtered = []
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].toLowerCase().includes(filter)) {
        filtered.push(this.cities[i])
      }
    }
    return filtered

  }


}
