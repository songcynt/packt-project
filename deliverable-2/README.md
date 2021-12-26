# Packt/Boundless

## Description 
 * Provide a high-level description of your application and it's value from an end-user's perspective
 * What is the problem you're trying to solve?
 * Is there any context required to understand **why** the application solves this problem?

This application provides an intuitive and streamlined way for our project partners (Packt Admins) to edit Packt Member and Client information and manage coffee bag rentals from various coffee shops on a web browser they can easily access from any devices.
For Packt Members (users renting bags from coffee shops), this application sends SMS notification when their rental bag is due for renewal, and stores any relevant account activity (such as when their bag is returned to the shop) which users can easily view via their Overview page on the web application.
We are also building an application that can be used alongside Packt Clients’ (coffee shop owners’) point of sale system to provide status updates on rentals and Packt Members. We will assume that Packt Clients will use this application together with their Shopify platform, as we originally planned to build this application as a shopify plugin, but later changed it to a standalone application.

The source code the application can be found here:
https://github.com/tankedman/csc301-team23-packt-shopify

Currently our project partners rely on spreadsheets to keep track of Member and rental information, which means when a new user signs up, or when a bag is due for return, everything from adding new user or rental data to sending out notifications are done manually by the administrators, which are very tedious and error prone. In addition, there’s no way for Members to view the status of their rentals or perform actions such as requesting an extension other than contacting the administrators.

With our app, SMS notifications can be automated by the administrators instead of sending them manually, and Members can keep track of or renew their rental status without contacting the admins for support.


## Key Features
 * A SMS notification system: 
     - automatically sends a text message to alert the user before their bag is due
     - or when a notification is triggered by an admin from within the app

 * A shopify application: 
     - Directly integrates with Packt Clients' point of sale system (Shopify POS)

 * A application interface where users can edit their personal and contact information, configure their notifications, and view their rental informations and any relevant account activities. 

## Instructions
 * Clear instructions for how to use the application from the end-user's perspective

Go to https://packt-project-development.herokuapp.com/, the app will automatically route to the login page. From here, you can click on the `Sign Up` link, enter your 10 digit phone number and profile password, and click `Sign Up`. You will see a short message saying you've successfully signed up, or an error message if, for instance, the user already exists.

After seeing the success message, click on `Log in` to go back to the login page. Enter the information from earlier, and click the login button to go to the overview page.

The Overview page holds all the summary information a member of Packt would need to see, including current number of bags rented, their next upcoming due date, and account activity.

Users can go to their Profile page to edit their contact and account information, such as their phone number and login password. Click on the top right edit icon to toggle edit mode, click again to exit edit mode. Currently the save feature for profile edits are not yet implemented.

The Settings page is used to edit notifications. Click on the left toggle button to allow or disable specific forms of notifications.

The Customers page contains a summary table of all Packt customers. Click on any row to direct to go to the Customer's Profile page. Note that only the first Placeholder customer has a working profile page.

When switching between different pages, the format of the page components may occasionally be out of place. This issue has been solved when we updated Material UI to the latest version, but has not been thoroughly tested. If any issue comes up, simply refresh the current page by hitting F5 or re-enter the current page url.

 * How do you access it? Are accounts pre-created or does a user register? Where do you start? etc. 

A user will need to first register with their phone number and password from the sign up page, accessible from the sign up link on login page. Currently all implemented pages are accessible from the navigation bar upon login. The latest deployed app can be accessed via the link https://packt-project-development.herokuapp.com/. Later on, certain pages will only be accessible to member level users or admin level users.

 * Provide clear steps for using each feature described above

Currently only a portion of the backend (Database and SMS notification) are connected with the frontend systems. Instructions for navigating the frontend user interface is above, and documentation for backend functionalities can be found below.


 * This section is critical to testing your application and must be done carefully and thoughtfully



### SMS Notifications

The SMS notification infrastructure is part of the backend, and can be officially tested by performing requests on functions within the `/sms` endpoint.

The current limitations on this module are as follows:
* Testing is currently being done on a Twilio trial account, with the restriction being that only numbers manually verified by the account can be texted to.
* A frontend interaction has not been implemented for this module yet.

The proposed features to implement next are as follows:
* A scheduler that runs once per day sending one or more queued SMS messages (e.g. 7 days until end of rental period) to the applicable registered phone numbers.

Following is a [video demonstration](https://youtu.be/m3qejGiGzUY) of how we currently test the SMS notifications.



### Main Backend

Backend functionality has been built but is only partially connected with the frontend via Axios API calls. Included in the backend work are models for Users, Clients, Contacts, and Rentals, alongside associated REST API routes.  A description of routes will be provided below:

`/register` POSTs can be used to create new users using a `phoneNumber` and a `password` in the request body.  The phone number provided must not already be in use for an existing user.  The server will return a JWT token as a cookie on a successful registration.

`/login` POSTs can be used to authenticate users using a `phoneNumber` and a `password` in the request body.  The server will check if the credentials match an existing user, and will return a JWT token as a cookie on a successful login.

The JWT tokens provided by the authentication routes record the user's id, phone number, and admin status.  



The below routes are only accessible with a valid JWT token:

The `/users` prefix route is used for accessing data related to Users.

* `/users` GETs can be used to access all user data if the request comes from an admin.  If the request comes from a non-admin, the route will only return data for the user that made the request.
* `/users/:id` GETs can be used to access user data for a specific user ID.  An admin can access any user's data, but a non-admin can only access their own data.
* `/users/phoneNumber` POSTs can be used to access user data for a specific user `phoneNumber` in the request body.  An admin can access any user's data, but a non-admin can only access their own data.
* `/users` POSTs can be used to create a new user.  Only admins are able to create new users this way.
* `/users/:id` PUTs can be used to edit a user's data.  Only admins are able to edit user data.
* `/users/:id` DELETEs can be used to delete a user.  Only admins are able to delete users.
* `/users/:id/rentals` GETs can be used to retrieve all rentals for a given user.  An admin can access any user's rentals, but a non-admin can only access their own rentals.

The `/clients` prefix route is used for accessing data related to Clients.

* `/clients` GETs can be used to access all client data if the request comes from an admin.  Only admins are able to retrieve client data.
* `/clients/:id` GETs can be used to access client data for a specific client ID.  Only admins are able to retrieve client data.
* `/clients` POSTs can be used to create a new client .  Only admins are able to create new clients this way.
* `/clients/:id` PUTs can be used to edit a client's data.  Only admins are able to edit client data.
* `/clients/:id` DELETEs can be used to delete a client.  Only admins are able to delete clients.

The `/contacts` prefix route is used for accessing data related to Contacts.

* `/contacts` GETs can be used to access all contact data.  Only admins are able to retrieve contact data.
* `/contacts/:id` GETs can be used to access contact data for a specific contact ID.  Only admins are able to retrieve contact data.
* `/contacts` POSTs can be used to create a new contact.  Only admins are able to create new contacts this way.
* `/contacts/:id` PUTs can be used to edit a contact's data.  Only admins are able to edit contact data.
* `/contacts/:id` DELETEs can be used to delete a contact.  Only admins are able to delete contacts.

The `/rentals` prefix route is used for accessing data related to Rentals.

* `/rentals` GETs can be used to access all rental data if the request comes from an admin.  If the request comes from a non-admin, the route will only return data for the rentals of the user that made the request.
* `/rentals/:id` GETs can be used to access rental data for a specific rental ID.  Only admins are able to retrieve rentals by ID.
* `/rentals` POSTs can be used to create a new rental.  Only admins are able to create new rentals this way.
* `/rentals/:id` PUTs can be used to edit a rental's data.  Only admins are able to edit rental data.
* `/rentals/:id` DELETEs can be used to delete a rental.  Only admins are able to delete rentals.

## Development requirements
* If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?

A standard PC with Microsoft Windows OS is sufficient to setup this project. Install Visual Studio Code, and Git to clone the repository. Specific frameworks or libraries that need to be installed to run the backend or frontend are described below.

 * Briefly describe instructions for setting up and running the application (think a true README).

### Backend Development Guide

To get started on backend development, begin by using the ```yarn install``` command at the root directory to install required dependencies.  

You will need to setup a local PostgreSQL server to run tests on meaningful data as well.  You can find PostgreSQL downloads at this link:
https://www.postgresql.org/download/

Once PostgreSQL is installed, you will need to save the credentials for your server as environment variables for the application.  You can find the environment variables under the ```.env``` file at the root directory, under ```DB_NAME``` (name of the database you want to use within your server), ```DB_USER``` (the username of the server owner), and ```DB_PASS``` (the password of the server owner).  Mock data is available within the ```database/setup.js``` file, and can be loaded into your database by navigating to the directory and using the ```node setup``` command.  

To start the web server, navigate to the root directory and use the ```node server``` command.



The Express API is structured into three sections:

* The `express/routes` directory contains files that define available paths in the API
* The `express/controllers` directory contains files that define implementations for the routes in their respective `express/routes` file, handling data validations and business logic
  * These files can be modularly replaced to switch implementations of routes
* The `express/dao` directory contains files that are used by the controller to access stored data
  * These files can be modularly replaced to switch implementations of data storage

More details about Express API development can be found through online documentation [here](https://expressjs.com/en/4x/api.html).



The project uses the Sequelize ORM to manage PostgreSQL data.  New data models can be added within the `sequelize/models` directory.  Associations between models can be added in the `sequelize/extra-setup.js` file.  

Details about how to use Sequelize can be found through online documentation [here](https://sequelize.org/master/).



The Express API and PostgreSQL database for the development and production environments are hosted on Heroku.  Details for the PostgreSQL database, such as credentials, can be found in the Resources tab under the respective Heroku app administration page.  Tools like pgAdmin can be used to monitor and make adjustments to the database remotely, using SQL queries.

### Frontend Development Guide

This project was bootstrapped with create-react-app and uses Yarn as its package manager. Packages such as @mui/material can be installed from the terminal by running `yarn add package-name`. Additional documentation on yarn scripts and create-react-app can be found in `client/frontend-dev-guide.md`.

[Material UI v5](https://mui.com/) is the framework being used in this project. It is built on top of the [Soft UI Dashboard](https://www.creative-tim.com/product/soft-ui-dashboard-react) theme developed by Creative Tim.

For those unfamiliar with Material UI (MUI), it is highly suggested that you go through the basic [documentation](https://mui.com/getting-started/learn/).

Soft UI Dashboard (SUI) codebase that can be download [here](https://www.creative-tim.com/product/soft-ui-dashboard-react). It is highly suggested that you go through the codebase to understand the patterns that are used how to project is structured. [Reference documentation](https://www.creative-tim.com/learning-lab/react/colors/soft-ui-dashboard)

When creating a new component here are the following guidelines to follow:

* Components will be created in the `client/src/components/` folder as a folder with a mandatory `index.js` file. The folder name will be in *PascalCase*. `index.js` will contain the `export` statement of the component. If there significant amount of styling then it should be in a separate `styles.js` file.
  
* All components must implement props type checking. An example can be found in `client/src/components/BreadCrumbs` component.

* To apply css to a component use the [`makeStyles`](https://mui.com/styles/api/#makestyles-styles-options-hook) MUI function. To apply custom CSS to specific MUI (or SUI) nested component use the `SuiBox` wrapper component. It is built on top of the [`Box`](https://mui.com/components/box/#main-content) mui component.

* Before creating a new component, check the SUI dashboard codebase to see if it is already implemented. Try as much as possible to reuse those components.

* When creating CSS styles use only the theme colors, NEVER use hardcoded color specification. In the `SuiBox` component there is a `color` prop that takes only specific values like *primary, secondary...etc*. These strings map to a color that is specified in the base theme defined in `assets/theme` folder. You can find all the valid color strings in the SUI reference [documentation](https://www.creative-tim.com/learning-lab/react/colors/soft-ui-dashboard).

* For text styling & sizing use the `SuiTypography` component. Don't use HTML5 tags like `<p>, <h6>...etc`.

## Project Structure

* `client/src/` - contains all the React code
  * `assets/` - contains static assets like image files & theming
  * `components/` - contains components that are used to build pages.
    * `sui-components` - contains all the components in the sui codebase.
  * `context/index.js` - React `Context` to handle sidebar and navigation bar state (ie. sidebar open/collapsed...etc)
  * `features/` - Redux global states, currently used to store user profile information and authentication token.
  * `notifications/` - reusable alert components with a set timer.
  * `pages/` - Contains the different pages in the application. Routes will link to the components in this folder.
  * `App.js` - global React `Context`s go in this file, as well as routing.
  * `routes.js` - contains routing configuration array that maps to the items in the sidebar.

All other files/folders in the project are more or less standard JS project files and/or self explanatory.

For guidelines on how to setup environment for frontend development, navigate over to the `clients/frontend-dev-guide.md` documentation.

 ## Deployment and Github Workflow

Our workflow is as follows:

When we have a new feature that must be implemented, we create a card on our team Trello board.  Then, when we begin working on the feature, we create a new branch off of ```develop``` in our local environments, and follow the naming convention of ```feature/{branchName}```.  Once we have completed our feature, we push to a new branch by the same name in our remote repository, and then create a pull request to ```develop```.  We require a different member of the team to review the code and merge the branch in.  By doing things this way, we keep our branches organized, and we merge better code by ensuring that it is reviewed by another programmer.

Automated deployments are set up on Heroku for both the ```develop``` branch and ```main``` branch on our remote repository.  We merge ```develop``` into ```main``` when we need a stable version of our application to display, such as when we are submitting for a deliverable.  

 ## Licenses 

We will not be applying a license to our codebase.  When we began this project we talked about the use of our code with our partners, and agreed that we will be using some sections of the codebase as part of our portfolios for employment opportunities.  We do not want the code to be used or distributed externally, and so we do not intend to license it and make it open source.

In our original agreement with Packt, we will allow:
 1) The use and distribution of the deployed project to end users, which include the Packt Admins (Beth and Agatha), Clients (coffee shop owners and employees), and Members (users renting out coffee bags).
 2) Modifying the codebase for maintenance or additional features after the conclusion of this project at the end of the semester.

In exchange, Beth and Agatha have agreed that we are allowed to:
 1) Include a link to the deployed project its description in our Github portfolio and resume.
 2) Publish the source code of the frontend components and include it in our public Github repository.
 3) Include any backend source code that do not pose a security risk.

We also agreed that we will not be including the database as it can contain sensitive information on Packt Clients and Members, especially if the application is deployed and starts collecting data prior to the end of the semester.
