Rails.application.routes.draw do
  devise_for :users,
    controllers: {
      omniauth_callbacks: "omniauth_callbacks",
      registrations: "registrations"
    }

  root "days#index"

  resources :days, only: [:index, :show, :create]
  resources :memories, only: [:index]

  namespace :api do
    namespace :v1 do
      get 'env_variables' => 'images#env_variables'
      resources :days, only: [:show, :create] do
        resources :answers, only: [:index, :create, :update]
        resources :images, only: [:index, :create, :destroy]
        resources :memories, only: [:index, :create, :update, :destroy]
        resources :links, only: [:index, :create, :update, :destroy]

      end
      resources :users, only: [:show] do
        resources :days, only: [:index, :show] do
          get 'previous_answers'
        end
        resources :memories, only: [:index]
      end
    end
  end

  get 'fitbit/users/:user_id/:resource/:date.json' => 'fitbit_api#data_request'
end
