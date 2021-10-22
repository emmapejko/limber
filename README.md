# limber

Limber is a web application aimed at helping people build a productive and personalized yoga practice. Limber facilitates the building of yoga sequences, encourages connection with others as well as the documentation of one's progress and favorite sequences.
### features

1) User Profile -
    all user information is displayed on the users profile page. This includes the sequences they have built and chosen to save, a dashboard presenting some statistics about their progress, and the poses they have placed in the following categories: what they know, and what they are working on.

    the goal of the profile page is to have a centralized place for a user to view their activity on the app.

2) Build -
    users can choose to find a video or build a sequence based on two constraints: length and body parts. The user can choose body parts to focus on by clicking the areas on the diagram, and can choose a length from the dropdown. If the user choose to build a flow, this information is based to the back end where a sequence is built based upon the relationships between poses and the relationships between poses & body parts. If a user choose to find a video, we search youtube for videos matching their criteria and return the results to the user.

    Using the sequence builder users have the option to view a tutorial for each pose, switch out any pose in the sequence for another, and then save the sequence to the database for future use.

3) Connect -
    users can connect with others using this component through live text and video chat. Users can host a class and others can join as they wish.
### getting started

To start using or developing with this app, make a .env file. The file needs the following contents:

  - CLIENT_ID
  - CLIENT_SECRET
  - SESSION_SECRET
  - POSTGRES_USERNAME
  - POSTGRES_PASSWORD
  - AWS_ACCESS_KEY_ID
  - AWS_SECRET_ACCESS_KEY
  - YOUTUBE_API_KEY

- Authentication is handled through Google OAuth2 and Passport
- Have Postgres running on your machine, and create a database called 'limber'
- Pose images are stored in an AWS S3 bucket
- YouTube's V3 API is used to find videos matching a users requests

scripts:

1. npm install
2. npm run build (or npm run build-prod for production)
3. npm start