require 'rails_helper'

feature 'user can sign up and sign in' do
  scenario 'user signs up for account' do
    visit '/'
    click_on 'Sign up'
    fill_in 'Email', with: 'marjie123@gmail.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'
    click_on 'Sign up'

    expect(page).to have_content 'Welcome! You have signed up successfully.'
  end

  scenario 'user signs up without email or password' do
    visit '/'
    click_on 'Sign up'
    click_on 'Sign up'

    expect(page).to have_content 'Email can\'t be blank'
    expect(page).to have_content 'Password can\'t be blank'
  end

  scenario 'user signs in' do
    FactoryGirl.create(:user)

    visit '/'
    fill_in 'Email', with: 'email1@factory.com'
    fill_in 'Password', with: 'password'
    click_on 'Log in'

    expect(page).to have_content 'Signed in successfully.'
  end

  scenario 'user signs in with invalid credentials' do
    visit '/'
    click_on 'Log in'

    expect(page).to have_content 'Invalid Email or password.'
  end

  scenario 'user signs out' do
    FactoryGirl.create(:user)

    visit '/'
    fill_in 'Email', with: 'email2@factory.com'
    fill_in 'Password', with: 'password'
    click_on 'Log in'
    click_on 'LOG OUT'

    expect(page).to have_content 'Signed out successfully.'
  end
end
