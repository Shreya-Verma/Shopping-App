import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipes: Recipe[] = [
        new Recipe(
            'Chicken Kebab',
            'Descript ',
            'https://tse3.mm.bing.net/th?id=OIP.Qv2_X5D7MQDNlQgU-Pmj1AHaE3&pid=15.1&P=0&w=229&h=151',
            [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
        ),
        new Recipe(
            'Mutton Recipe',
            'Descript Mutton',
            'https://tse3.mm.bing.net/th?id=OIP.Qv2_X5D7MQDNlQgU-Pmj1AHaE3&pid=15.1&P=0&w=229&h=151',
            [new Ingredient('Chicken', 1), new Ingredient('French Fries', 20)]
        ),
    ];

    recipiesChanged = new Subject<Recipe[]>();

    constructor(private slServic: ShoppingListService) {}

    getRecipies() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientToShoppingList(ingredient: Ingredient[]) {
        this.slServic.addIngredients(ingredient);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipiesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipiesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipiesChanged.next(this.recipes.slice());
    }
}
