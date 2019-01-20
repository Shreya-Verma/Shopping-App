import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

  ingerdientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  ingredients: Ingredient[] =  [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingerdientChanged.next(this.ingredients.slice());
  }

  addIngredients (ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingerdientChanged.next(this.ingredients.slice());

  }

  getIngreditent(index: number) {
    return this.ingredients[index];
  }

  updateIngreditent(index: number , newIngreditent: Ingredient) {
    this.ingredients[index] = newIngreditent;
    this.ingerdientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingerdientChanged.next(this.ingredients.slice());
  }


}
