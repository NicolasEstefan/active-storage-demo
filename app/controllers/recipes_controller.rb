class RecipesController < ApplicationController
  def show
    @recipe = Recipe.find(params[:id])
  end

  def create
    recipe = Recipe.new(recipe_params)

    if recipe.save
      render json: recipe, status: :created
    else
      render json: { errors: recipe.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def recipe_params
    params.expect(recipe: [ :title, :description, :video, images: [] ])
  end
end
