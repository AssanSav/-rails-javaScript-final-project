# Rails API with JavaScript Front-end Full CRUD and Users Authentications

## summary 
This APP uses a Rails API back-end and a JavaScript front-end using the `fetch()` method to fetch the back-end, gets the JSON uses the `json()` method to instantiate javaScript Objects and saves them in `Recipe.all` and `Comment.all` so it won't hit the API for the next request. This APP follows the concerns principal such as request related to `Json API` requests are happenning in the `Api class`, rendering `markup texts`, `logic statements` not related to `DOM` manupulations, instatiating `new Object` instances, saving them in a class variable happen in the `Recipe` and `Comment` classes. Everything related to `DOM` manupulation happen in the `events liteners`.
This APP has users `authentications` via `devise gem` and to fully use the APP you would have to create and account `follow below`. This APP allows users to create FOOD RECIPES to be shared among others users, leave COMMENTS...

## Ruby version
- ruby 2.6.1

## Start
- Fork and clone this repository

## System dependencies
* Ensure those gems are in your Gemfile
- gem "devise", "~> 4.7"
- gem "fast_jsonapi", "~> 1.5"
- gem "pry", "~> 0.12.2"
- gem "typhoeus", "~> 1.3"
- gem 'rails', '~> 6.0.2', '>= 6.0.2.1'
then run `bundle install` 


## Configuration
- run `yarn install --check-files` to update yarn
- run `rails db:migrate` to create the migrations
- run `rails s` to start the rails server
- head to `http://localhost:3000/` on your browser and click on `signup` to create a new account 
- head back to your terminal and run `rails db:seed` to seed the database
- Go back to your browser and you should see new records of Recipes. 



