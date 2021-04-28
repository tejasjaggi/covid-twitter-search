import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('scroll', [
      state('on', style({left: '-500px'})),
      transition('* => *', [
        style({left: '-500px'}),
        animate(20000, style({left: '100%'}))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'covidSearch';
  isSmallScreen: boolean = false;
  state: any = 0;


  constructor(private router: Router, public breakpointObserver: BreakpointObserver) {

  }


  ngOnInit() {
    this.breakpointObserver
      .observe(['(max-width: 700px)'])
      .subscribe((state: BreakpointState) => {
        this.isSmallScreen = state.matches;
      });
    // if (window.location.href.includes('resources')) {
    //   this.goToResources()

    // }
    // else if (window.location.href.includes('donation')) {
    //   this.goToDonation()

    // }
    // else {
    //   this.goToSearch()
    // }
  }


  goToSearch() {
    this.router.navigate(['search'])
    let search = document.getElementById('search');
    let resources = document.getElementById('resources');
    let donation = document.getElementById('donation');

    search.style.borderBottom = '3px solid white'
    resources.style.borderBottom = ''
    donation.style.borderBottom = ''
  }
  goToDonation() {
    this.router.navigate(['donation'])
    let search = document.getElementById('search');
    let resources = document.getElementById('resources');
    let donation = document.getElementById('donation');

    donation.style.borderBottom = '3px solid white'
    resources.style.borderBottom = ''
    search.style.borderBottom = ''
  }
  goToResources() {
    this.router.navigate(['resources'])
    let search = document.getElementById('search');
    let resources = document.getElementById('resources');
    let donation = document.getElementById('donation');

    resources.style.borderBottom = '3px solid white'
    search.style.borderBottom = ''
    donation.style.borderBottom = ''
  }

  scrollDone() {
    this.state++;
  }


  jagmeister()
 {
   window.open("https://www.tejasjaggi.com", '_blank')
 }}
