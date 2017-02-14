class DailyMailer < ApplicationMailer
  def daily_email(user)
    @user = user
    mail(
      to: user.email,
      subject: "Reminder to fill out Memory Keeper"
    )
  end
end
