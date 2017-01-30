class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  protected

  def authenticate_user!(options={})
    if user_signed_in?
      super(options)
    else
      redirect_to new_user_session_path
    end
  end
end
