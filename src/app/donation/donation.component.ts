import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  akshayPatra()
 {
   window.open("https://www.akshayapatra.org/covid-relief-services?gclid=CjwKCAjw7J6EBhBDEiwA5UUM2qQKSnDDm2xAYSLYYPMp-M8e1kRACwKsZ2VV1ljjmZKQFFeXOd-JdhoCU7IQAvD_BwE", "_blank")
 }
  covidResources()
 {
   window.open("https://donate.indiacovidresources.in/#Home", "_blank")
 }
}
