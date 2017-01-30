Rails.application.routes.draw do
  devise_for :users

  root "days#index"

  resources :days, only: [:index, :show]

end
