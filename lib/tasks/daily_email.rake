namespace :daily_email do
  desc "Emails reminder email to all users"
  task daily_email: :environment do
    @users = User.all
    @users.each do |user|
      DailyMailer.daily_email(user).deliver_later
    end
  end
end
