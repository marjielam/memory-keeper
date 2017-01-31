class DaysController < ApplicationController
  before_filter :authenticate_user!

  def index
    @days = Day.find_by(user: current_user)
  end

  def show
    @day = Day.find_by(user: current_user, id: params[:id])
    @day_month = @day.date.month
    @day_day = @day.date.day
    @question_date = Date.parse("2000-#{@day_month}-#{@day_day}")
    @question = Question.find_by(date: @question_date)
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
