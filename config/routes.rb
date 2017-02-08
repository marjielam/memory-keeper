Rails.application.routes.draw do
  devise_for :users,
    controllers: { omniauth_callbacks: "omniauth_callbacks" }

  root "days#index"

  resources :days, only: [:index, :show, :create]

  namespace :api do
    namespace :v1 do
      get 'env_variables' => 'images#env_variables'
      resources :days, only: [:show, :create] do
        resources :answers, only: [:index, :create, :update]
        resources :images, only: [:index, :create, :destroy]
        resources :memories, only: [:index, :create, :update, :destroy]
      end
      resources :users, only: [:show] do
        resources :days, only: [:index, :show] do
          get 'previous_answers'
        end
      end
    end
  end

  get 'fitbit/users/:user_id/:resource/:date.json' => 'fitbit_api#data_request'
end
