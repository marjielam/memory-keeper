class Api::V1::ImagesController < ApplicationController
  def index
    @day = Day.find(params[:day_id])
    @images = @day.images
    render json: @images
  end

  def create
    image_data = JSON.parse(request.body.read)
    @day = Day.find(params[:day_id])
    @image = Image.new(day: @day, image_url: image_data["image"]["url"])
    if @image.save
      @images = @day.images
      render json: @images
    end
  end

  def destroy
    @day = Day.find(params[:day_id])
    @image = Image.find(params[:id])
    @image.destroy
    @images = @day.images
    render json: @images
  end

  def env_variables
    @cloudinary_upload_url = ENV['CLOUDINARY_UPLOAD_URL']
    @cloudinary_upload_preset = ENV['CLOUDINARY_UPLOAD_PRESET']
    @nyt_api_key = ENV['NYT_API_KEY']
    render json:
      {
        url: @cloudinary_upload_url,
        preset: @cloudinary_upload_preset,
        nyt: @nyt_api_key
      }
  end
end
