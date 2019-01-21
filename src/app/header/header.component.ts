import { Component, OnInit } from '@angular/core';

import { DataHttpService } from '../shared/data-http.service';
import { Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    constructor(private dataService: DataHttpService, private authService: AuthService) {}

    ngOnInit() {}

    onSaveData() {
        this.dataService.storeRecipies().subscribe((response: Response) => {
            console.log(response);
        });
    }

    onFetchData() {
        this.dataService.getRecipies();
    }

    onLogOut() {
        this.authService.logout();
    }
}
