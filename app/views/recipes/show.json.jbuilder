json.extract! @recipe, :id, :title, :description, :created_at, :updated_at
json.image_urls @recipe.images.map { |image| url_for(image) }
json.video_url url_for(@recipe.video) if @recipe.video.attached?
