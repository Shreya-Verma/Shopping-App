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
    return this.http.put('your firebase project url/recipies.json', this.rService.getRecipes());
  }

  getRecipies() {
    const token = this.authService.getToken();
    return this.http.get('your firebase project url/recipies.json?auth=' + token)
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
      this.rService.setRecipes(recipes);
    });
  }


}
