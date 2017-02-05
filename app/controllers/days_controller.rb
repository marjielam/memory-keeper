class DaysController < ApplicationController
  before_filter :authenticate_user!

  def index
  end

  def show
  end

  def create
    @day = Day.new(day_params)
    @day.user = current_user

    if @day.save
      redirect_to @day
    end
  end

  private

  def day_params
    params.require(:day).permit(:date)
  end
end
