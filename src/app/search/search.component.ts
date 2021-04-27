import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  city: any = ""
  verified: any = false
  required: any = false
  nearMe: any = false
  other: any = ""
  twitterSearch: any = "https://twitter.com/search?q="

  requirements = new FormControl();
  requirementsList: string[] = ['Beds', 'Oxygen', 'ICU', 'Ambulance', 'Vantilator', 'Fabiflu', 'Remdesivir', 'Food', 'Plasma', 'Tocilizumab', 'Favipiravir'];
  requirementArray: any = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.city.length, this.other.length, this.requirementArray.length)
  }


  searchTwitter(){
    if(this.verified)
    {
      this.twitterSearch+='verified+'
    }
    if(this.city.length>0)
    {
      this.twitterSearch+=this.city+'+'
    }
 
    if(this.requirementArray.length>0)
    { 
      this.twitterSearch+= '%27'
      if(this.other.length>0)
      {
        this.twitterSearch+=this.other
        if(this.requirementArray.length>0)
        {
          this.twitterSearch+="+OR+"
        }
      }
      for(let i=0; i<this.requirementArray.length; i++)
      {
        this.twitterSearch+=this.requirementArray[i]
        if(i != this.requirementArray.length-1)
        {
          this.twitterSearch+='+OR+'
        }

      }
      this.twitterSearch+="%28"
    }
    if(this.verified)
    {
      this.twitterSearch+='-%22not+verified%22+-%22unverified%22'
    }
    if(!this.required)
    {
      this.twitterSearch+='-%22needed%22+-%22need%22+-%22require%22'
    }
    this.twitterSearch+='&f=live'
    if(this.nearMe)
    {
      this.twitterSearch+='&lf=on'
    }
    this.twitterSearch = this.twitterSearch.toString()
    window.open(this.twitterSearch, '_blank');

    
  }

  getRequirements(event)
  {
    console.log("event ",event)
    if(event.source._selected)
    {
      this.requirementArray.push(event.source.value)
    }
    else
    {
      
      this.requirementArray.splice(this.requirementArray.indexOf(event.source.value), 1);


    }
  }

  
}
