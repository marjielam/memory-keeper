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
    if current_user.fitbit_user?
      @name = params["user"]["name"]
      @email = params["user"]["email"]
      @reminder_email = params["user"]["reminder_email"]
      if current_user.update(
        name: @name,
        email: @email,
        reminder_email: @reminder_email
      )
        flash[:notice] = "Your account has been updated successfully."
        redirect_to "/"
      else
        flash[:notice] = current_user.errors.full_messages.to_sentence
        redirect_to "/users/edit"
      end
    else
      super
    end
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
