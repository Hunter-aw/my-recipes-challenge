var RecipeApp = function () {

    var recipes = [
        // { 
        //     id: 1,
        //     name: 'Best Chicken Soup!', 
        //     image: 'https://static01.nyt.com/images/2016/11/29/dining/recipelab-chick-noodle-still/recipelab-chick-noodle-still-master675.jpg',
        //     ingredients: [
        //         { name: 'whole chicken' },
        //         { name: 'medium carrots'},
        //         { name: 'onions' },
        //     ] 
        // }
    ];

    var $recipes = $('.recipes');

    //id's for recipes
    var recId = 2;

    //id's for ingredients
    var ingId = 0;

    var createRecipe = function(name, image){
        var recipe = {
            name: name,
            image: image, 
            ingredients: [],
            id: recId
        };

        //keeps recipe ids unique 
        recId ++; 

        recipes.push(recipe);
    };

    var findRecipeId = function (currentIngredient) {
        var $clickedrecipe = $(currentIngredient).closest('.recipe')
        var id = $clickedrecipe.data().id;
        return id;
    };

    var _findRecipeById = function (id) {
        for (var i = 0; i < recipes.length; i += 1) {
          if (recipes[i].id === id) {
            return recipes[i];
          }
        }
      }

    var removeRecipe = function(recipeId) {
      var clickedRecipe = _findRecipeById(recipeId)

      recipes.splice(recipes.indexOf(clickedRecipe), 1);
    }
    
    var createIngredients = function(text){
        var ingredients = {
            text: text,
            ingId: ingId
        }
        ingId ++ 
        return ingredients;
    };
    
    var addIngredients = function(ingredient, id){
        var newIngredient = createIngredients(ingredient)
        var currentRecipe = _findRecipeById(id)

        currentRecipe.ingredients.push(newIngredient)

    }

    var _getIngredientsHTML = function(recipe){
               
        var recipesHTML = "";

        for (var x=0; x < recipe.ingredients.length; x ++){
            var ingredient = recipe.ingredients[x].text
            var ingredientHTML = '<li class="ingredient">' + ingredient + '</li>'
            recipesHTML += ingredientHTML
        }
        return recipesHTML;
    };

    var renderRecipes = function () {
        //empty recipes div
        $recipes.empty();

        for(var i = 0; i < recipes.length; i ++){
            //current recipe in iteration
            var recipe = recipes[i];

            //return HTML for all ingredients
            var ingredients = _getIngredientsHTML(recipe); //add code

            $recipes.append(
                '<div class="recipe col-md-6  offset-md-3 img-fluid shadow" data-id="' + recipe.id + '">' + 
                    '<div class="remove btn btn-danger" type="button" > Remove </div>' + 
                    '<h4 class="text-capitalize font-italic text-center">' + recipe.name + 
                    '</h4>' + 
                    '<img class="recipe-img" src="' + recipe.image + '"/>' +
                    '<hr>' +
                    '<h5 class="font-italic font-bold text-center">ingredients</h5>' +
                    '<form class="input-group mb-3 ingredients-form">' +
                        '<div class="input-group-prepend">' +
                            '<button class="add-ingredients input-group-text" type="button" id="basic-addon3">Add Ingredients</button>' +
                        '</div>' + 
                        '<input type="text" class="form-control ingredient-name" id="basic-url" aria-describedby="basic-addon3">' +
                        
                    '</form>' +
                    '<ul class="ingredients">' + ingredients + '</ul>'+
                '</div>'
            );
        }
    };

    return {
        createRecipe: createRecipe,
        renderRecipes: renderRecipes,
        findRecipeId: findRecipeId,
        removeRecipe: removeRecipe,
        createIngredients: createIngredients,
        addIngredients: addIngredients
    }
};

var app = RecipeApp();


//--------EVENTS

//add a recipe
$('.add-recipe').on('click', function(){
    //collect input text
    var name = $('#recipe-name').val();
    var image = $('#recipe-image').val();

    //add recipe to array and render
    app.createRecipe(name, image);
    app.renderRecipes();
});

//add ingredients to a recepie
$('.recipes').on('click','.add-ingredients',function(){
    var ingredient = $(this).closest('.ingredients-form').find('.ingredient-name').val()
    var recipeId = app.findRecipeId(this)
    app.addIngredients(ingredient, recipeId);

    app.renderRecipes();

})

//remove a recipie
$('.recipes').on('click', '.remove', function(){
    var recipeId = app.findRecipeId(this)
    app.removeRecipe(recipeId)
    app.renderRecipes()
})

