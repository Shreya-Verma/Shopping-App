import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] ;
  private subsctiption: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subsctiption = this.shoppingListService.ingerdientChanged.subscribe(
      (ing: Ingredient[]) => this.ingredients = ing
      );
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }


  ngOnDestroy() {
    this.subsctiption.unsubscribe();
  }
}
