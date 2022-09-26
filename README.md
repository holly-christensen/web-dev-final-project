# web-dev-final-project
Final project for CS4550 Web dev
Margaret Morehead, Holly Lovejoy

### Project Description
We created a Podcast App that allows users to search for Podcasts, Rate and Review podcasts and post comments on podcast Episodes. 

### User Roles
##### Consumer (also referred to as User)
* Access all site content
* Personalized list of followed podcasts on the Homepage
* Can follow and unfollow podcasts
* Can write reviews on Podcasts
* Can write comments on Episodes
* Can edit their profile details
* Can like and dislike comments from other users
* Can view their Comments, Reviews, and Followed podcasts on their profile page
##### Creator: 
* Same privileges as Consumer
* Become a creator by going to “upgrade to Creator” in the user profile
* The User object is updated and a new Creator object is created which is linked to the User by the User’s id
* Can delete Comments on episodes
* Has a special profile page with additional information about the creator
##### Signed Out User:
* Can view a list of trending podcasts on the homepage
* Can search for Podcasts
* Can view Podcast and Episode details, including Comments and Reviews
* Can not like, delete, or post comments
* Can not write reviews
* Can not follow podcasts

### CRUD Operations
* Create Comment, Create Review, Create User, Upgrade User to Creator
* Read Users, Comments, Reviews, and Creators
* Update User, Update Comment (like/dislike)
* Delete Comment, Delete Review

### Lightweight UML Diagram 
<img width="490" alt="Screen Shot 2022-09-26 at 11 10 48 AM" src="https://user-images.githubusercontent.com/42592575/192313794-b80ace41-6a4f-4ad9-a188-12b4d41adf9f.png">

