import { Component, HostListener  } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const yOffset = window.pageYOffset;
    if (yOffset > 200) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }
  scrollToTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}


