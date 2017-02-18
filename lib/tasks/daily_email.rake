namespace :daily_email do
  desc "Emails reminder email to all users who have opted in"
  task daily_email: :environment do
    @users = User.where(reminder_email: true)
    @users.each do |user|
      DailyMailer.daily_email(user).deliver_later
    end
  end
end
