import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simplonApi2';
  showHead:any;
  history: Set<any> = new Set()
hist: any[] = []
  constructor(private userService : UsersService, private router: Router) {

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/login'|| event.url === '/') {
          this.showHead = false;
        } else {
          this.showHead = true;
          
        }
      }
    });

    this.router.events.subscribe(() => {
   
      this.history.add(this.router.routerState.snapshot.url)
      this.hist = Array.from(this.history)
      let routeIndex = this.hist.indexOf(this.router.routerState.snapshot.url)
      this.hist.forEach((value:any, index) => {
        if(this.hist.indexOf(value) > routeIndex) {
          delete this.hist[this.hist.indexOf(value)]
          this.history.delete(value)
        }
      })
    })
  }

  logout() {
    this.userService.getLogOut()
  }

}


