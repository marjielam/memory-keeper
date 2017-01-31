class Api::V1::DaysController < ApplicationController
  def show
    @day = Day.find(params[:id])
    render json: @day
  end
end
