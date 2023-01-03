import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simplonApi2';
  showHead:any;
  constructor(private router: Router) {

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/login'||event.url === '/inscriptions'|| event.url === '') {
          this.showHead = false;
        } else {
          this.showHead = true;
          
        }
      }
    });
  }

}


