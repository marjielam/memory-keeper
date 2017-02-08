class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :omniauthable,
    :recoverable, :rememberable, :trackable, :validatable

  has_many :days

  def self.from_omniauth(auth)
    user = User.where(
      provider: auth.provider,
      uid: auth.uid
    ).first_or_create do |new_user|
      new_user.provider = auth.provider
      new_user.uid = auth.uid
      new_user.name = auth.info.display_name
      new_user.email = auth.info.email ||
        "#{auth.uid}@#{auth.provider}.generated"
      new_user.password = Devise.friendly_token[0, 20]
    end

    user.access_token = auth['credentials']['token']
    user.refresh_token = auth['credentials']['refresh_token']
    user.expires_at = auth['credentials']['expires_at']

    user
  end

  def fitbit_user?
    provider == "fitbit"
  end

  def fitbit_client
    FitgemOauth2::Client.new(
      token: access_token,
      client_id: ENV['FITBIT_CLIENT_ID'],
      client_secret: ENV['FITBIT_CLIENT_SECRET'],
      user_id: uid
    )
  end
end
