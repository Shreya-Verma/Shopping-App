import { Component, OnInit,
        ElementRef, ViewChild, OnDestroy
       } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService:  ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
        .subscribe(
          (index: number) => {
            this.editedItemIndex = index;
            this.editMode = true;
            this.editedItem = this.shoppingListService.getIngreditent(index);
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            });
          }
        );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngerdient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngreditent(this.editedItemIndex, newIngerdient);
    } else {
      this.shoppingListService.addIngredient(newIngerdient);
    }
    this.editMode = false;
    form.reset();
  }


  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
