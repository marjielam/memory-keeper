class ApplicationMailer < ActionMailer::Base
  default from: "\"Memory Keeper\" <no-reply@memory-keeper.herokuapp.com>"
  layout 'mailer'
end
