require 'rails_helper'

feature 'user can edit or delete account' do
  let!(:user) { FactoryGirl.create(:user) }

  scenario 'user can edit account' do
    visit '/'
    fill_in 'Email', with: 'marjielam@gmail.com'
    fill_in 'Password', with: 'password'
    click_on 'Log in'
    click_on 'ACCOUNT SETTINGS'

    fill_in 'Email', with: 'marjie123@gmail.com'
    fill_in 'Current password', with: 'password'
    fill_in 'New password', with: 'password123'
    fill_in 'Confirm new password', with: 'password123'
    click_on 'Update'

    expect(page).to have_content 'Your account has been updated successfully.'
  end

  scenario 'user can delete account' do
    visit '/'
    fill_in 'Email', with: 'marjielam@gmail.com'
    fill_in 'Password', with: 'password'
    click_on 'Log in'
    click_on 'ACCOUNT SETTINGS'
    click_on 'Cancel my account'

    expect(page).to have_content 'Bye! Your account has been successfully cancelled. We hope to see you again soon.'
  end
end
