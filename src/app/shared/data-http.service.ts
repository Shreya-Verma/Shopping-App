import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class DataHttpService {

  constructor(private http: Http,
    private rService: RecipeService,
    private authService: AuthService) { }

  storeRecipies() {
    return this.http.put('https://udmey-angular-124b7.firebaseio.com/recipies.json', this.rService.getRecipies());
  }

  getRecipies() {
    const token = this.authService.getToken();
    return this.http.get('https://udmey-angular-124b7.firebaseio.com/recipies.json?auth=' + token)
    .pipe(
      map((resp: Response) => {
        const recipies: Recipe [] = resp.json();
        for (const r of recipies) {
          if (!r['ingredient']) {
            r['ingredient'] = [];
          }
        }
        return recipies;
      })
    )
    .subscribe((recipes: Recipe[]) => {
      this.rService.setRecipies(recipes);
    });
  }


}
