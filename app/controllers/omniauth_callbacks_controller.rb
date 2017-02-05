class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def fitbit
    @user = User.from_omniauth(request.env["omniauth.auth"])
    if @user.persisted?
      sign_in_and_redirect @user, event: :authentication
      if is_navigational_format?
        set_flash_message(:notice, :success, kind: "Fitbit")
      end
    else
      redirect_to new_user_registration_url
    end
  end
end
