Rails.application.routes.draw do
  devise_for :users,
    controllers: { omniauth_callbacks: "omniauth_callbacks" }

  root "days#index"

  resources :days, only: [:index, :show, :create]

  namespace :api do
    namespace :v1 do
      resources :days, only: [:show, :create] do
        resources :answers, only: [:index, :create, :update]
      end
      resources :users, only: [:show] do
        resources :days, only: [:index, :show] do
          get 'previous_answers'
        end
      end
    end
  end
end
