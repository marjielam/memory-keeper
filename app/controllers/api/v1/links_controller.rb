class Api::V1::LinksController < ApplicationController
  def index
    @day = Day.find(params[:day_id])
    @links = @day.links
    render json: @links
  end

  def create
    link_data = JSON.parse(request.body.read)
    @day = Day.find(params[:day_id])
    @label = link_data["link"]["label"]
    @url = link_data["link"]["url"]
    @comment = link_data["link"]["comment"]
    @link = Link.new(day: @day, label: @label, url: @url, comment: @comment)
    if @link.save
      @links = @day.links
      render json: @links
    end
  end

  def update
    links_data = JSON.parse(request.body.read)
    @day = Day.find(params[:day_id])
    @link = Link.find(params[:id])
    @label = links_data["link"]["label"]
    @url = links_data["link"]["url"]
    @comment = links_data["link"]["comment"]
    @links = @day.links
    if @link.update(label: @label, url: @url, comment: @comment)
      render json: @links
    end
  end

  def destroy
    @day = Day.find(params[:day_id])
    @link = Link.find(params[:id])
    @link.destroy
    @links = @day.links
    render json: @links
  end
end
