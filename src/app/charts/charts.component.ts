import { Component, OnInit } from '@angular/core';
import * as HighCharts from 'highcharts';
import { HttpClient } from '@angular/common/http';

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
        '#4572A7', 
        
        '#B5CA92'
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

  pieChartBrowser() {
    HighCharts.chart('pieChart', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Browser market shares in October, 2019'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        type: undefined,
        data: [{
          name: 'Chrome',
          y: 61.41,
          sliced: true,
          selected: true
        }, {
          name: 'Internet Explorer',
          y: 11.84
        }, {
          name: 'Firefox',
          y: 10.85
        }, {
          name: 'Edge',
          y: 4.67
        }, {
          name: 'Safari',
          y: 4.18
        }, {
          name: 'Sogou Explorer',
          y: 1.64
        }, {
          name: 'Opera',
          y: 1.6
        }, {
          name: 'QQ',
          y: 1.2
        }, {
          name: 'Other',
          y: 2.61
        }]
      }]
    });
  }
  ngOnInit(): void {

    this.http.get<any>('https://api.covid19india.org/data.json').subscribe(data => {
      console.log("DATA ", data)
      this.cases_time_series = data.cases_time_series.slice(data.cases_time_series.length-10,)
     for(let item of this.cases_time_series){
        console.log(item)
        this.dailyConfirmed.push(parseInt(item.dailyconfirmed))
        this.dailyDeceased.push(parseInt(item.dailydeceased))
        this.dailyRecovered.push(parseInt(item.dailyrecovered))
        this.date.push(item.date)
    }
      console.log("THISSSS ", this.dailyConfirmed, this.dailyDeceased, this.dailyRecovered, this.date)
      this.barChartPopulation();
    this.pieChartBrowser();
    })  



    
  }

  

  

 

}
