Rails.application.routes.draw do
  get 'comment/index'
  get 'comment/create'
  get 'comment/update'
  get 'comment/destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post 'api/test', to: 'application#test'
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :index]
    resource :session, only: [:show, :create, :destroy]
    resources :posts, except: [:edit, :new]
    resources :comments, except:[:new, :edit]
  end
  
  #catch all routes to serve up frontend files
  get '*path', to: "static_pages#frontend_index"
end
