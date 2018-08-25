# My-Sweets-Base
This web app helps Sweets makers(Including me!!). Yes, sweets pics below are all my works :)  
  
<img width="1386" alt="screen shot 2018-08-23 at 1 59 26 am" src="https://user-images.githubusercontent.com/30137645/44516451-fe26a800-a679-11e8-84af-c95ce610a4e6.png">

## Introduction
Sweets makers keep a lot of information in a variety of places. 
Recipes, ingredients which we have, the best way of arrangement, etc… 
We need to refer those information when we plan sweets to make next, but some information is always missing from our mind.  
  
<img width="912" alt="screen shot 2018-07-30 at 1 57 46 am" src="https://user-images.githubusercontent.com/30137645/43387714-0331b2d6-939c-11e8-932a-2a7286606bc9.png">
  
## Features
Integrate all information which helps sweets making.  
- `Works`: History of user’s works with useful information for next time
  - Image, Recipes, Note 
- `Wish List`: Records of sweets which fascinate user
  - Image, Recipes, Note
- `Storage`: Ingredients info with expiration date
  - Expiration date, Alert for expired ingredients
- `Dashboard`: Where user plans next sweets
  - Fields for each modules above, Shopping list
  
You can add multiple recipes
<img width="1382" alt="screen shot 2018-08-23 at 2 02 20 am" src="https://user-images.githubusercontent.com/30137645/44516579-5067c900-a67a-11e8-9f32-880d9b531df8.png">
  
When you click recipe link, you can see recipe and your storage at the same time while edit your shopping list.
<img width="1440" alt="screen shot 2018-07-30 at 12 44 38 am" src="https://user-images.githubusercontent.com/30137645/43388538-4c1ff2ee-939e-11e8-9e20-df742c472f41.png">

## Upcoming Features
- Recommendation: Recommend sweets to make next from `Works` and `Wish List` according to the inside of `Storage`
- Image auto fill: For `Wish List`, allow user to pick an image from recipe page 

## Ingredients of this app
- Vue.js
- Django
- Django REST Framework (library)
- SQLite
  
For deployment, I use following technologies:
- Heroku - server
- PostgreSQL - database (replacement of SQLite)
- Amazon S3 - storage for pictures which users upload
  
You can try this app by visiting https://my-sweets-base.herokuapp.com !
  
Note: The code in this repository works in local environment. Settings for deployment are not included.
