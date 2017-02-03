require 'rails_helper'

feature 'user visits today page' do
  let!(:user) { FactoryGirl.create(:user) }
  let!(:day) { FactoryGirl.create(:day) }

  xscenario 'user clicks on today and sees question', js: true do
    visit '/'
    fill_in 'Email', with: user.email
    fill_in 'Password', with: 'password'
    click_on 'Log in'

    expect(page).to have_content "Select a day"
  end
end
