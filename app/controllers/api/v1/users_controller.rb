class Api::V1::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def all_memories
    @user = User.find(params[:user_id])
    @memories = []
    @days = @user.days
    @days.each do |day|
      @memories.concat(day.memories)
    end
    render json: @memories
  end
end
