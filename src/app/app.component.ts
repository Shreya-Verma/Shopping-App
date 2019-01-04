import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shopping-list-app';
  loadedFeature = 'recipe';

  // Temp Navigate
  onNavigate(featureName: string) {
    this.loadedFeature = featureName;
  }
}
