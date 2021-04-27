import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  whoCovid()
  {
    window.open('https://www.who.int/emergencies/diseases/novel-coronavirus-2019', '_blank')
  }
  cdcCovid()
  {
    window.open('https://www.cdc.gov/coronavirus/2019-ncov/communication/print-resources.html?Sort=Date%3A%3Adesc', '_blank')
  }

}
