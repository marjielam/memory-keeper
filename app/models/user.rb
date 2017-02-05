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
      user.password = Devise.friendly_token[0,20]
    end
  end

  def fitbit_user?
    self.provider == "fitbit"
  end
end
