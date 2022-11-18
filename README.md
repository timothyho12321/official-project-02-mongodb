# CARousel

Access live demo site [here]()

![Mock-up]()

## Background

There are many car buyers and hobbyists. They enjoying learning and looking at different kinds of cars. However, there is not a website that allows users to crowdsource different types of cars and create reviews about it. 

## Project Overview

Prospective car buyers or hobbyists usually find information on the car showroom website. They want to know the look, price, functionalities and features of the car. 

Looking at the rating of cars from other users are useful for them to determine if this is a well-received car. 
Sharing these information allow them to know about the potential of buying a certain car they have in mind. 

---

## The Five Planes of UI/UX

### Strategy

#### Organization's Goals
I usually get information on cars by reading car magazines or showroom website description. This car review site centralises all the information of different brands of cars and gives users a convenient and unbiased description of cars that they may be interested in. 

#### Users' Goals
 The users of this site are usually aged 25 -35, use the internet for researching items they want to buy and enjoy reading other's reviews of using certain products. They would like to know the benefits of a certain car, compare with other types of cars, and see the reception of other users toward the functionality of a car. 

1. **Organisation**
   - Objective: To aggregate users postings and reviews about different types of cars onto a website

2. **Users: Travellers**
   - Objective: To find a certain type of car they want to know more about and get more details on the specific functions of the car 

   - Needs:
      - Search about the car they may be interested in 
      - Create posting on cars they want to review
   
   - Demographics and Characteristics:
       - Working young people
       - Interest in car
       - Enjoys reading review websites 
   
   - Pain point:
       - want to know the specifications of a car
       - Want to see the look of a car
       - Want to know other user’s opinions of the car



User Stories | Acceptance Criteria(s)
------------ | -------------
As a car hobbyist, I want to share my reviews about a car with other user | Website must allow creating of post and adding details of car. 
As a car hobbyist, I want to learn more about new cars by viewing others review post on car
| Website must allow searching and display of information of car to users
As a car hobbyist, I would like to comment and ask user about car | Website must allow user to ask questions or comment on other's reviews.  
As a car hobbyist, I require a search rating of car and car name | Website should allow search of car by name and current rating by reviewer
Know specific features of a car | Website must display the features of the car so users know whether this is the car of their choice

### Scope

### Database

An Express server is used to store the information and access endpoints on a MongoDB. 

#### Content
The content about cars is contributed by the public. Users can view the overview of the site on the main landing page. 

#### Functional
- Search current car posting by name, feature, rating
- Create new article function
- Edit and Delete each car posting 
- Require to create account with email and login in order to edit car review. 

#### Non-functional
- Mobile responsiveness: Able to navigate on the handphone and access website features
- Accessibility: Clear readable font in specific size and color to enable concise communication. 
- Performance: Ensure the website does not have jerky transition while data is loading and once it has been loaded. 

### Structure

![Site-map]()


### Skeleton
Initial prototyping is seen here ![prototype1](./src/Images/wireframe1.jpg)![prototype2](./src/Images/wireframe2.jpg)

The prototype is done with a mobile first approach and throughout the project it have been re-visited several times while working on the project and styling across devices. 

#### Color Scheme

![Colour-Scheme](./src/Images/project2_colour_theme.jpg)

- The duller colours like light grey are use to present the webpage as a more comtemporary modern website at the landing page 
- The rest of the colors are then randomly generated via [Coolors](https://coolors.co/)
- The yellowish series of colours were meant to bring out the warm happy feelings associated with reminiscing about travels
- Darker colors are chosen to be used for text, shadows and for overlaying images
- Feedback was that the yellowish colours were rather contrasting with the comtemporary feels the main landing page provides. Therefore, there will be further changes made to the colour theme 

#### Font
VT323 have been chosen as the font for headings, titles, subtitles, etc, because it looked compatible with the colours 

Verdana, Geneva, sans-serif is used for all body text meant for reading, to server as a contrast to the former font with its thinner weight and lining.

There was also feedback that font-use was rather contrasting between those meant for reading and those meant for subtitles, there will also be changes made to this when colour theme is changed

---

## Testing
Test Cases can be found [here](./src/Testcases.pdf)

---

## Dependencies and Sources

### Backend
1. [Express](https://expressjs.com/) as the framework for routing to project's endpoints 
2. [MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/current/) for accessing database on MongoDB using their API
3. [cors](https://www.npmjs.com/package/cors) as middleware to enable CORS
4. [dotenv](https://www.npmjs.com/package/dotenv) to separate code from envrionment variables
5. [Yup](https://github.com/jquense/yup) is used for validation of forms in the backend

### Frontend
1. [React](https://reactjs.org/) as the frontend framework
2. [Axios](https://axios-http.com/) as HTTP client to Express server endpoints
3. [React-Bootstrap](https://react-bootstrap.github.io/) is used to do most of the styling of the website including forms
4. [Yup](https://github.com/jquense/yup) is used for validation of forms 


### Platforms and Software
1. [Git](https://git-scm.com/) for version control
2. [GitHub](http://github.com) for the repository
3. [Heroku](https://www.heroku.com/) for deployment of Express server
4. [Netlify](https://www.netlify.com/) for deployment of React app

### Logos and Images
1. Logo used is designed using canva [Canva](https://www.canva.com/q/pro/)
2. Landing page background photo is by [Garrett Parker](https://unsplash.com/@garrettpsystems) downloaded from [Unsplash](https://unsplash.com)

   
### Other Attributions
1. [Paul Chor](https://github.com/kunxin-chor) for all his guidance and using his tutorials as references for the codes 
2. [Keeguon](https://gist.github.com/keeguon/2310008) for the data used in MongoDB's Countries collection

---

## Deployment

### Build
Backend is build using Node.js and Express. Frontend have been created with create-react-app which includes a webpack that builds the files for production environment.

### Backend Deployment
Express server is deployed using [Heroku](https://www.heroku.com/).

Prerequisites:
- Heroku is connected and authorized to Github account under "Deploy"
- Correct repository is selected under "App connected to Github"
- Automatic deploys have been enabled for continuous deployment

Steps to publish:
1. After connecting to repository, ensure edits were added, commited, and pushed to Github repository
2. Heroku will perform automatic deployments upon detecting changes

### Frontend Deployment
[![Netlify Status](https://api.netlify.com/api/v1/badges/f573eaaf-f00e-4539-9ada-cb55e4687f2c/deploy-status)](https://app.netlify.com/sites/the-wanderlust-experience/deploys)

The React app is hosted using [Netlify](https://www.netlify.com/).

Prerequisites:
- Any edits were added, commited, and pushed to Github repository
- Netlify is connected and authorized to Github account
- Netlify is connected to GitHub repository via "New site from Git"
- "GitHub"  has been selected for continuous deployment

Steps to publish:
1. After connecting to repository, ensure edits were added, commited, and pushed to Github repository
2. Netlify will start to build and perform automatic deployments upon detecting changes

---