import { Component, OnInit, ElementRef } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { ROUTES } from '../app/users/sidebar/sidebar.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private listTitles!: any[];
    location!: Location;
    private toggleButton: any;
    private sidebarVisible!: boolean;

  currentDate = new Date();
  CurrentTime: any;
  title = 'simplonApi2';
  showHead:any;
  history: Set<any> = new Set()
  hist: any[] = []
  constructor(private userService : UsersService, private router: Router,location: Location,  private element: ElementRef ) {
    setInterval(() => {
      this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds()}, + 1);
  

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/login'|| event.url === '/') {
          this.showHead = false;
        } else {
          this.showHead = true;
          
        }
      }
    });

    /* this.router.events.subscribe(() => {
   
      this.history.add(this.router.routerState.snapshot.url)
      this.hist = Array.from(this.history)
      let routeIndex = this.hist.indexOf(this.router.routerState.snapshot.url)
      this.hist.forEach((value:any, index) => {
        if(this.hist.indexOf(value) > routeIndex) {
          delete this.hist[this.hist.indexOf(value)]
          this.history.delete(value)
        }
      })
    }) */

    this.location = location;
    this.sidebarVisible = false;
  }

  logout() {
    this.userService.getLogOut();
    this.router.navigateByUrl('login')
  }

  ngOnInit(){
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
  }
  sidebarOpen() {
      const toggleButton = this.toggleButton;
      const body = document.getElementsByTagName('body')[0];
      setTimeout(function(){
          toggleButton.classList.add('toggled');
      }, 500);
      body.classList.add('nav-open');

      this.sidebarVisible = true;
  };
  sidebarClose() {
      const body = document.getElementsByTagName('body')[0];
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
  };
  sidebarToggle() {
      // const toggleButton = this.toggleButton;
      // const body = document.getElementsByTagName('body')[0];
      if (this.sidebarVisible === false) {
          this.sidebarOpen();
      } else {
          this.sidebarClose();
      }
  };

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

}


