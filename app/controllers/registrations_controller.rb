class RegistrationsController < Devise::RegistrationsController
  def index
    super
  end

  def show
    super
  end

  def new
    super
  end

  def create
    super
  end

  def edit
    super
  end

  def update
    super
  end

  def destroy
    @user = current_user
    @days = @user.days
    @days.each do |day|
      @memories = day.memories
      @memories.each do |memory|
        memory.destroy
      end

      @images = day.images
      @images.each do |image|
        image.destroy
      end

      @answer = day.answer
      if @answer
        @answer.destroy
      end
      
      day.destroy
    end
    @user.destroy

    flash[:notice] = "Bye! Your account has been successfully cancelled. We
      hope to see you again soon."
  end
end
