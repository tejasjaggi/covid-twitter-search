import { Component, OnInit } from '@angular/core';
import * as HighCharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  cases_time_series: any = [];
  dailyConfirmed: any = [];
  dailyDeceased: any = [];
  dailyRecovered: any = [];
  date: any = [];
  stateData: any = [];
  states: any = [];
  barChartData: any;
  state = new FormControl();
  currentState: any = "Total";
 

  constructor(private http: HttpClient) {

    
   }
   barChartPopulation() {
    HighCharts.chart('barChart', {
      credits: {
        enabled: false
      },
      chart: {
        type: 'column'
      },
      title: {
        text: 'COVID 19 Stats'
      },
      xAxis: {
        categories: this.date,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Count',
          align: 'high'
        },
      },
      tooltip: {
        valueSuffix: ' people'
      },
      colors: [
        '#00adb5', 
        
        '#2978b5'
        ],
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        type: undefined,
        name: 'Total Confirmed',
        data: this.dailyConfirmed
      }, {
        type: undefined,
        name: 'Total Recovered',
        data: this.dailyRecovered
      }]
    });
  }

  pieChartBrowser(state) {
    HighCharts.chart('pieChart', {
      credits: {
        enabled: false
      },
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: this.currentState+' data'
      },
      tooltip: {
        pointFormat: '{series.name}: <br>{point.percentage:.1f} %<br>total: {point.y}'
      },
      colors: [     
        '#f39189',
        '#9b3675',
        '#f5c0c0',
        ],
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
            format: '{point.percentage:.1f} %<br>count: {point.y}'
          },
          showInLegend: true
        }
      },
      series: [{
        name: state,
        colorByPoint: true,
        type: undefined,
        data: [{
          name: 'active',
          y:parseInt(this.barChartData.active),
          sliced: true,
          selected: true
        }, {
          name: 'confirmed',
          y:parseInt( this.barChartData.confirmed)
        }, {
          name: 'deaths',
          y: parseInt(this.barChartData.deaths)
        } ]
      }]
    });
  }
  ngOnInit(): void {

    this.http.get<any>('https://api.covid19india.org/data.json').subscribe(data => {
      console.log("DATA ", data)
      this.cases_time_series = data.cases_time_series.slice(data.cases_time_series.length-10,)
     
     for(let item of this.cases_time_series){
        this.dailyConfirmed.push(parseInt(item.dailyconfirmed))
        this.dailyDeceased.push(parseInt(item.dailydeceased))
        this.dailyRecovered.push(parseInt(item.dailyrecovered))
        this.date.push(item.date)
    }
    this.stateData = data.statewise.slice(0,)
    for(let item of this.stateData){
      this.states.push(item.state)
  }
  this.barChartData = this.stateData.find(o => o.state === 'Total');
  console.log("THIS ", this.barChartData,)
      this.barChartPopulation();
    this.pieChartBrowser('Total');
    })  


  
  }

  
changeState(event) {
  if(event.isUserInput)
  {
      console.log("EVENT", event)
  this.currentState = event.source.value
  this.barChartData = this.stateData.find(o => o.state === event.source.value);
  this.pieChartBrowser(event.source.value)
  }


}
  

 

}
