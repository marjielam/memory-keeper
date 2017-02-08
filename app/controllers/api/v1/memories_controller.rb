class Api::V1::MemoriesController < ApplicationController
  def index
    @day = Day.find(params[:day_id])
    @memories = @day.memories
    render json: @memories
  end

  def create
    memories_data = JSON.parse(request.body.read)
    @day = Day.find(params[:day_id])
    @memory = Memory.new(day: @day, body: memories_data["memory"]["body"])
    if @memory.save
      @memories = @day.memories
      render json: @memories
    end
  end

  def update
    memories_data = JSON.parse(request.body.read)
    @day = Day.find(params[:day_id])
    @memory = Memory.find(params[:id])
    @memories = @day.memories
    if @memory.update(body: memories_data["memory"]["body"])
      render json: @memories
    end
  end

  def destroy
    @day = Day.find(params[:day_id])
    @memory = Memory.find(params[:id])
    @memory.destroy
    @memories = @day.memories
    render json: @memories
  end
end
