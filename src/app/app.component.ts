import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    loadedFeature = 'recipe';

    ngOnInit() {
        firebase.initializeApp({
            apiKey: 'AIzaSyA_B0iqsmEpkldqJ_82MnV1jfkkD_yWQqk',
            authDomain: 'udmey-angular-124b7.firebaseapp.com',
        });
    }

    onNavigate(feature: string) {
        this.loadedFeature = feature;
    }
}
