class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :omniauthable,
    :recoverable, :rememberable, :trackable, :validatable

  has_many :days

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.display_name
      user.email = auth.info.email || "#{auth.uid}@#{auth.provider}.generated"
      user.password = Devise.friendly_token[0, 20]
      user.access_token = auth['credentials']['token']
      user.refresh_token = auth['credentials']['refresh_token']
      user.expires_at = auth['credentials']['expires_at']
    end
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

  def token_expired?
    Time.at(expires_at) < Time.now
  end
end
