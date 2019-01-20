import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail: Recipe;
  id: number;
  constructor(private recipeService: RecipeService ,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
   this.route.params.subscribe(
    (params: Params) => {
      this.id = +params['id'];
      this.recipeDetail = this.recipeService.getRecipe(this.id);
    }
    );
  }

  onAddtoShoopingList() {
    this.recipeService.addIngredientToShoppingList(
      this.recipeDetail.ingredient
    );
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
