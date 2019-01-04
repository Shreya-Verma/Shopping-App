import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Chicken Kebab', 'Descript ', 'https://tse3.mm.bing.net/th?id=OIP.Qv2_X5D7MQDNlQgU-Pmj1AHaE3&pid=15.1&P=0&w=229&h=151', [
      new Ingredient('Meat', 1),
      new Ingredient('French Fries', 20)
    ]),
    new Recipe('Mutton Recipe', 'Descript Mutton', 'https://tse3.mm.bing.net/th?id=OIP.Qv2_X5D7MQDNlQgU-Pmj1AHaE3&pid=15.1&P=0&w=229&h=151', [
      new Ingredient('Chicken', 1),
      new Ingredient('French Fries', 20)
    ])
  ];

  constructor(private slServic: ShoppingListService) {
  }

  getRecipies() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredient: Ingredient[]) {
    this.slServic.addIngredients(ingredient);
  }

}
