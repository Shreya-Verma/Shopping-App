import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
    id: number;
    editMode: boolean;
    recipeForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private rService: RecipeService) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];
            this.editMode = params['id'] != null;
            this.initForm();
        });
    }

    onSubmit() {
        if (this.editMode) {
            this.rService.updateRecipe(this.id, this.recipeForm.value);
        } else {
            this.rService.addRecipe(this.recipeForm.value);
        }
        this.onCancel();
    }

    onAddIngredient() {
        (<FormArray>this.recipeForm.get('ingredient')).push(
            new FormGroup({
                name: new FormControl(null, Validators.required),
                amount: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+[1-9]*$/)]),
            })
        );
    }

    private initForm() {
        let recipeName = '';
        let recipeImangePath = '';
        let recipeDescription = '';
        const recipeIngredients = new FormArray([]);

        if (this.editMode) {
            const recipe = this.rService.getRecipe(this.id);
            recipeName = recipe.name;
            recipeImangePath = recipe.imagePath;
            recipeDescription = recipe.description;
            if (recipe['ingredient']) {
                for (const ingredient of recipe.ingredient) {
                    recipeIngredients.push(
                        new FormGroup({
                            name: new FormControl(ingredient.name, Validators.required),
                            amount: new FormControl(ingredient.amount, [
                                Validators.required,
                                Validators.pattern(/^[0-9]+[1-9]*$/),
                            ]),
                        })
                    );
                }
            }
        }
        this.recipeForm = new FormGroup({
            name: new FormControl(recipeName, Validators.required),
            imagePath: new FormControl(recipeImangePath, Validators.required),
            description: new FormControl(recipeDescription, Validators.required),
            ingredient: recipeIngredients,
        });
    }

    getControls() {
        return (<FormArray>this.recipeForm.get('ingredient')).controls;
    }

    onCancel() {
      this.router.navigate(['../'], {relativeTo: this.route});
    }

    onDeleteIngredient(index: number) {
      (<FormArray>this.recipeForm.get('ingredient')).removeAt(index);
    }

}
