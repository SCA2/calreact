Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  root 'appointments#index'
  resources :appointments, only: [:index, :create]
end
