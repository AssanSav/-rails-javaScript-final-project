Rails.application.routes.draw do
  resources :comments

  resources :recipes do 
    resources :comments
  end

  root 'welcome#home'
  
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
