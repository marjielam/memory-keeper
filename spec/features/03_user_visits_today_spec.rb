require 'rails_helper'

feature 'user visits today page' do
  let!(:user) { FactoryGirl.create(:user) }
  let!(:day) { FactoryGirl.create(:day) }

  xscenario 'user clicks on today and sees question', js: true do
    visit '/'
    fill_in 'Email', with: user.email
    fill_in 'Password', with: 'password'
    click_on 'Log in'

    click_on 'TODAY'
    expect(page).to have_content "Show previous answers"
  end
end
