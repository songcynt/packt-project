# Packt / Boundless
## Product Details

#### Q1: What are you planning to build?

We are planning on building a web application for our partner Packt, which will allow them to streamline the management of their reusable coffee bag rentals. Currently, it is tedious, prone to human error, and time-consuming to manage coffee bag rentals, potentially involving manual inputs and filters on a spreadsheet by administrators and coffee shop employees, while renters are unable to track their rented bags and their respective return dates. We want to make it easier for all three groups who interact with the Packt system.

For the administrators, we would like to build a simple web application to view and manage coffee bag rentals and communications with renters. Administrators are in need of an intuitive and efficient system that allows them to view data such as their renters and any associated rented bags, along with the return date of those bags. They would also like to be able to automate messages to be sent out to renters upon certain events (for example, sending a reminder for bag return seven days before the return date), and potentially also to manually send messages if bags are not returned on time. 

For renters, a system for quick bag returns is needed, where a renter can quickly indicate how many bags they have returned at a certain location. Additionally, the web application could be used to view their own bags and return dates, and potentially locations where they can return bags, although this is an optional feature. 

As for coffee shop employees, we would like to be able to integrate their point of sale system with our application. As we currently know, they will be using Shopify, Silverware, and Clover as their point of sale systems, so we are looking to build a simple app that will integrate with one of these systems, and can be used quickly and efficiently by employees, and can communicate with our application backend in real-time upon any new rentals. 


#### Q2: Who are your target users?

We have three main groups of target users for our application. 

* Administrators of Packt who are looking to keep track of and manage the logistics and communications surrounding bags. 
* Busy coffee shop employees working at coffee shops partnered with Packt, who would like to be able to rent out Packt bags while committing the minimal extra time and effort on top of their regular point-of-sale system. 
* Coffee bean purchasers who are renting Packt bags to reduce their environmental footprint. 

#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

By each main group of users:

* Administrators require a way to retrieve and manage data around the Packt bags and their renters. Compared to manual inputs and filters to a spreadsheet, our application’s visual interface will significantly reduce the amount of effort and time needed to retrieve relevant data, such as a list of all expired Packt bags, and their respective renters. Additionally, automated messages sent out to renters will reduce manual efforts needed to keep up with a growing number of outbound rentals.
* Busy coffee shop employees can have long lineups at the counter and do not want to spend extra time handling Packt rentals if they do not need to. As such, our Shopify app can integrate with their point-of-sale system to allow them to notify Packt of rentals with minimal time and interaction instead of requiring manual spreadsheet entries. 
* Renters of Packt bags will require a way to return rental bags to the shops easily. We can provide a technical solution that minimizes time needed to indicate rental returns, and eliminates the need for human interaction. The optional feature of adding a web application section for renters would allow them to access new information, namely that of their rental expiry dates and potential locations to drop off rentals. 

#### Q4: How will you build it?

For our technology stack, we plan to use React for the frontend, Node.js and Express for the backend, and PostgreSQL for the database. For the required SMS communication functionality, we plan to use Twilio. Additionally, we will use GitHub Actions as a CI/CD tool, and deploy onto Google Cloud Run.

We will structure our application architecture around the popular model-view-controller pattern. By separating code into three components with different responsibilities, code is both easier to read and easier to test individually.

Our testing strategy will be behavior-driven, and based around fulfilling the requirements of our user-stories.  We will use Jest as the testing framework for both the Node.js backend and React frontend.

#### Q5: What are the user stories that make up the MVP?

1. 
   - As a Packt user, I want to log in to Packt so that I may view the number of coffee bags I have rented out, and how many days are remaining until I have to return them.
   - Given that I am a registered user of Packt, when I enter my credentials and click submit, then I should be taken to the personal account page, where I can view my currently rented bags, along with their individual return dates.

2. 
   - As a Packt administrator, I want to log in to Packt so that I may view the number of coffee bags that are currently rented out, how many bags each user currently possesses, and how many days are remaining until users are expected to return bags.
   - Given that I am a registered administrator of Packt, when I enter my credentials and click submit, then I should be taken to the administration dashboard, where I can view data about users and bags. I should be able to sort and filter this data to see important information such as the users who have bags due to return within a week.
3. 
   - As an employee of a coffee roaster, I want to use the integrated Packt app on my point-of-sale system to enter a customer’s information at checkout, in order to keep track of the number of Packt bags that the customer is renting.
   - Given that I am an employee of a coffee roaster, when I enter the customer’s personal information and add the number of bags they are renting to the cart, then the app integrated into the point-of-sale system should automatically add the cost of the rental to the cart, and call an API on the web server to add those bags to the customer’s account.
4. 
   - As a Packt user who is returning bags at a coffee shop, I want to be able to quickly submit a form so that I can indicate how many bags I am returning.
   - Given that I am a Packt user attempting to return bags at a coffee shop, when I scan the QR code at the return bin using a mobile device, then I should be directed to a webpage form that I can submit to indicate how many bags I am returning.
5. 
   - As a Packt administrator, I want to send communications to users at certain breakpoints in their bag rental durations so that I can remind users to return their bags.
   - Given that I am a Packt administrator who is logged in, when I navigate to the view for managing communications with renters, then I should be able to set new automated communications by entering date thresholds (ex. Seven days before return date) and message strings. The Packt system should then automatically send the entered message upon hitting the date threshold.

----
## Intellectual Property Confidentiality Agreement 
We discussed what we would be able to publicly display after project completion with our partners, and came to the agreement that we would be able to upload a portion of the code to GitHub. The portion includes all of the frontend work, and anything in the backend that would not be a security concern for the resulting final product.

----

## Process Details

#### Q6: What are the roles & responsibilities on the team?

We have three main roles making up the structure of our team.

Members with the **Frontend** role are responsible for the visual design of the web application. They determine how each page is structured and designed, implementing visual and interactive UI/UX elements as code. Their goal is to achieve the right balance between form and function with a beautiful design that the target users can appeal to and engage with effortlessly.

Members with the **Backend & Database** role are responsible for the brains of the web application. They determine how data is interpreted, processed, and dispatched using server-side logic and databases. They develop utilities such as services and APIs that Frontend members can use when designing the application interface. Their goal is to seamlessly integrate a responsive, high-performing server and database with an intuitive, attractive user interface designed by the Frontend members.

Members with the **DevOps & QA** role are responsible for optimizing the team's ability to develop, test, and deploy the application, ensuring it meets a certain standard of quality. They will collaborate closely with members of other roles and utilize automation tools for continuous integration and delivery. Their goal is to help make the workflow and reliability of developing the application efficient.We introduce the members of our team, their responsibilities, and their backgrounds.

**Chris** (Backend, DevOps & QA) will be responsible for handling database management and forming the business logic of the application. Additionally he will be managing the project and communicating with Packt as a team representative. His technical strengths are in JavaScript development, unit testing and mocking, as well as user experience design. His technical shortcomings are knowledge in CI/CD utilities, PostgreSQL, and deployment solutions.

**Cynthia** (Frontend, Backend) will be responsible for designing and testing the user interface and user experience of the application. Her technical strengths are knowledge in PostgreSQL, UI/UX design, React Hooks, AWS Amplify, and the general Agile development process based on industry experience. Her technical shortcomings are integrating the frontend, backend, and database together, as well as getting stuck on unfamiliar technologies.

**Jedwin** (Frontend, DevOps & QA) will be responsible for user interface development and quality assurance. His technical strengths are knowledge in UI design, JavaScript, React Native, and HTML/CSS. His technical shortcomings are knowledge in databases and the backend, as well as CI/CD utilities.

**Kavin** (Frontend, DevOps & QA) will be responsible for frontend development, DevOps, and communicating with Packt as a team representative. His technical strengths are knowledge in HTML/CSS, React, Node, as well as general JavaScript and TypeScript. Additionally, he is familiar with Google Cloud Functions and Firebase. His technical shortcomings are working with REST APIs and knowledge in UI/UX design.

**Lucas** (Frontend, Backend) will be responsible for backend development and its integration with the frontend. His technical strengths are knowledge in HTML/CSS, unit testing, PostgreSQL, and Microsoft Azure. His technical shortcomings are knowledge in JavaScript web development which include React and Node, as well as CI/CD utilities.

#### Q7: What operational events will you have as a team?

Partner meetings with Packt will be recurring every Tuesday at 6-7pm through Google Meet, followed by a Stand-up team meeting for task checkup purposes at 7-7:30pm. Ad hoc team meetings are planned in-person for Fridays on campus at around 7-9pm. Weekly meetings with the team and TA mentor will happen during the Monday class tutorials (8-9pm) at BA 1190.

During our meetings with Packt, we will cover progress made on the application and keep them up to speed. The meetings will allow us to ask questions and it will allow them to provide feedback to us as well. During team meetings, work will be done on important group submissions, and feedback will be given on work done by team members.

We have met with Packt's representatives on a number of occasions. The first meeting happened on September 20 at 4:30pm and lasted around half an hour. After introductions, we asked a few questions based on what we read in the spreadsheet listing. We clarified our priority on being able to upload source code, namely the frontend and parts of the backend, to GitHub for future reference. In addition, we started to understand their business model, their story as a startup, and their future plans. The meeting concluded with the major decision being that the solution would be web based, targeting three demographics: the consumers (for notifications and reminders), the administrators (to keep track of rented bags), and the employees of participating coffee roasters and shops (to integrate bag rentals with sales).

The second meeting happened on September 27 at 12pm and lasted a full hour. Specifics on app features and the overall application objectives were discussed. Suggested readings and resources were also shared, and detailed user stories were conceptualized. In particular, a requested feature in discussion was for the application to integrate with a POS service such as Shopify, which was a feature that required further research and understanding by our members after the meeting. Contact information with Packt's current participating shops was exchanged to better understand how this feature will work. We decided on a weekly meeting schedule with Packt as described above.

#### Q8: What artifacts will you use to self-organize?

For task management, we will be using Trello. For documents, note-taking, and schedules, we will be using Google Drive and Docs. For primary communication and sharing, we will use Facebook Messenger and Discord.

Tasks will be assigned according to the role they fall under (e.g. Backend) and between available members with these roles. Once a task is assigned, it will be created on Trello for tracking.

Tasks will generally be prioritized in the following order from most to least important: hotfixes, bugs and miscellaneous fixes, scoped features, and larger/epic features. Depending on how valuable a certain task is to the project, it may override these priorities. An impactful feature may take precedence over cosmetic bug fixes, for example.

Status of work will mainly be assessed through team meetings and Trello updates (e.g. Not Started, In Progress, Completed). During development, separate branches will be created for certain tasks like bug fixes. Thorough testing and merging via pull requests, to both development and main, will also be considered as a progress metric.

#### Q9: What are the rules regarding how your team works?

**Communications**: Members should respond to messages on Messenger or Discord by the same day or within 24 hours for messages sent past 5 pm. If they are tagged in messages, they should indicate that they have read them using reactions or emotes. If a member is unable to complete a task by its expected due date, a 24 hour notice should be provided by them such that others can fill in.We will have meetings with our partner representatives every week to go over progress made and to collect feedback. Similarly, if something previously promised cannot be delivered on time, we will let them know 24 hours in advance of the meeting time. Regarding tasks that are certainly possible given just a little more time, we will request it from our partner. Regarding tasks we think are out of our scope or expertise, we will request advice from our TA mentor and let our partner know about our concerns, possibly offering to do a compromise or a simpler version of the task instead.

**Meetings**: People will be held accountable for attendance and tasks via a simple honour system. As a team of five, we are quite close with each other and have developed a decent level of trust.

**Conflict Resolution**:  

1. **Disagreements on technical implementation**: A short meeting will be held to discuss the pros and cons of each option, ending with a five-way vote. If absolutely necessary, we will bring this discussion up with the TA and/or have them make the decision for us.  
2. **Non-responsive team member**: If a member does not respond on time, we will attempt to talk to them to determine the reason. If it becomes an ongoing issue (two major instances), then a warning will be issued to that member. If no response or reasonable explanation is received within 48 hours, then we will report this issue to our TA. 
3. **Incomplete or late work**: If a member does not finish their work on time without notice, we will attempt to talk to them to determine the reason. If it becomes an ongoing issue (two major instances), then a warning will be issued to that member. If no response or reasonable explanation is received within 48 hours, then we will report this issue to our TA.




----
## Highlights

The first key decision made was about one of Packt’s feature requests for the application: the ability for it to integrate with POS systems of participating shops. None of us had experience working with POS systems, so naturally we had some initial doubts. After further discussion, the representatives pointed us to Shopify’s POS system, and upon further investigation we discovered their API and documentation. By this point, we considered whether we had enough time and resources to develop this module or not. The major factor was how fast we could learn and incorporate the API, or an alternative service of similar features, into our solution. We decided that we would try to develop it, after estimating how much time we would need.

The second key decision made was on how notifications would be delivered to the consumer outside of the application. Our options were to do either one of or both SMS text messages and email. We decided to develop only SMS texting capability for notification purposes, since the least a customer needs to have as identification upon purchasing a product of Packt is their phone number. In addition, email notifications may become redundant when combined with SMS notifications.

The third key decision made was on team meetings. There were conflicting schedules between our members based on course load, commute times, and availability to meet. The options we were considering were conducting completely ad hoc meetings, completely regular/recurring meetings, or both. Completely ad hoc meetings can be held periodically and quickly, though not enough members may be able to join in at arbitrary times. Completely regular meetings are longer to organize, but are potentially more engaging. In the end, we chose to consider both a regular weekly schedule, for Packt and ourselves as a team, as well as an ad hoc session when close to an important date. This is described in further detail under Section Q7.
