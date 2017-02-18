class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def authenticate_user!(options = {})
    if user_signed_in?
      super(options)
    else
      redirect_to new_user_session_path
    end
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :reminder_email])
    devise_parameter_sanitizer.permit(
      :account_update,
      keys: [:name, :reminder_email]
    )
  end
end
