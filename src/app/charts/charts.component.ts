import { Component, OnInit } from '@angular/core';
import * as HighCharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';

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
  selectedStates: any;
  metaStates: any;
  showState: boolean = true;
  districts: any = []
  metaDistricts: any;
  districtData: any = [];
  count: number =2;


  constructor(private http: HttpClient, public breakpointObserver: BreakpointObserver) {


  }
  barChartPopulation() {
    HighCharts.chart('barChart', {
      credits: {
        enabled: false
      },
      chart: {
        type: 'line'
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
      legend: {
        layout: 'vertical',
        align: 'center',
        verticalAlign: 'bottom'
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
        text: this.currentState + ' data'
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
          y: parseInt(this.barChartData.active),
          sliced: true,
          selected: true
        }, {
          name: 'confirmed',
          y: parseInt(this.barChartData.confirmed)
        }, {
          name: 'deaths',
          y: parseInt(this.barChartData.deaths)
        }]
      }]
    });
  }
  ngOnInit(): void {

    this.breakpointObserver
    .observe(['(max-width: 700px)'])
    .subscribe((state: BreakpointState) => {
     if(state.matches)
     {
       this.count = 1
     }
    })
    document.getElementById('right').style.opacity = "50%"
      document.getElementById('left').style.opacity = "100%"

    this.http.get<any>('https://api.covid19india.org/data.json').subscribe(data => {
      this.cases_time_series = data.cases_time_series.slice(data.cases_time_series.length - 10)

      for (let item of this.cases_time_series) {
        this.dailyConfirmed.push(parseInt(item.dailyconfirmed))
        this.dailyDeceased.push(parseInt(item.dailydeceased))
        this.dailyRecovered.push(parseInt(item.dailyrecovered))
        this.date.push(item.date)
      }
      this.stateData = data.statewise.slice(0)
      for (let item of this.stateData) {
        this.states.push(item.state)
      }
      this.metaStates = this.states
      this.barChartData = this.stateData.find(o => o.state === 'Total');
      this.barChartPopulation();
      this.pieChartBrowser('Total');
    })

    this.http.get<any>('https://api.covid19india.org/state_district_wise.json').subscribe(data => {
     
      let keys = Object.keys(data)
      for (let i = 0; i < keys.length; i++) {
        this.districts.push(...Object.keys(data[keys[i]].districtData))
        this.districtData.push(...Object.values(data[keys[i]]))
      }
      this.metaDistricts = this.districts
    })



  }


  changeState(event) {
    if (event.isUserInput && this.showState) {
      this.currentState = event.source.value
      this.barChartData = this.stateData.find(o => o.state === event.source.value);
      this.pieChartBrowser(event.source.value)
    }
    else if (event.isUserInput && !this.showState) {
      this.currentState = event.source.value
      for (let item of this.districtData) {

        if (typeof (item) == 'object') {

          if (item[event.source.value]) {
            this.barChartData = item[event.source.value]
            this.barChartData.deaths = this.barChartData.deceased
          }
        }

      }
      this.pieChartBrowser(event.source.value)
    }


  }
  onKey(value) {
    if (this.showState) {
      this.states = this.search(value);
    }
    else {
      this.districts = this.search(value);
    }

  }

  // Filter the states list and send back to populate the selectedStates**
  search(value: string) {
    if (this.showState) {
      this.states = this.metaStates
      let filter = value.toLowerCase();
      let filtered = []
      for (let i = 0; i < this.states.length; i++) {
        if (this.states[i].toLowerCase().includes(filter)) {
          filtered.push(this.states[i])
        }
      }
      return filtered

    }
    else {
      this.districts = this.metaDistricts
      let filter = value.toLowerCase();
      let filtered = []
      for (let i = 0; i < this.districts.length; i++) {
        if (this.districts[i].toLowerCase().includes(filter)) {
          filtered.push(this.districts[i])
        }
      }
      return filtered
    }

  }

  showChart(type) {
    if (type === 'state') {
      this.showState = true
      document.getElementById('right').style.opacity = "50%"
      document.getElementById('left').style.opacity = "100%"
      this.onKey('')
      this.changeState({isUserInput: true, source: {value: 'Total'}})
      
    }
    else {

      this.showState = false
      document.getElementById('left').style.opacity = "50%"
      document.getElementById('right').style.opacity = "100%"
      this.changeState({isUserInput: true, source: {value: 'Total'}})

    }

  }




}
