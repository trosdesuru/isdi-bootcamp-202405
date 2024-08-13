
![logo_cities 1](https://github.com/user-attachments/assets/67f8e7ba-74d7-4453-8fa6-f0ad7a69f7af)


FUNCTIONAL

The project will try to help better manage the leisure time of our users, offering relevant information in real time to make the best decisions when choosing where to go, both day and night. Among the functions we should highlight the capacity in real time, ticket prices, in case you have to pay, the theme of the event, duration and more generic information about the event. The real-time mode will not be entirely accurate at the moment because to implement the 'in-real-time-mode' model requires many users with the app installed on their device, so it will be a future feature. Cities has all kinds of information about events in the city so that you can enjoy the events in the city, both well-known events as well as those that are very local or even organised by neighbours of a street. The information is taken from official sources, specialised event accounts on the most popular social networks, neighbourhood party groups and commercial hubs in all the city's neighbourhoods.

USE CASES

Create Event: Users can create events to share information about or share their experiences.

Events List: Users can view a comprehensive list of available events, filtering by category, location, and date.

List Saved Events: Users can save events for future reference and view a list of their saved events.

Toggle Going to Event: Users can indicate whether they plan to attend a specific event, enabling them to receive notifications related to that event.

Toggle Like Event: Users can like events, helping highlight the most popular events in the app.

Toggle Follow User: Users can follow specific profiles to receive updates and changes about them.

USER

- create event.
- events list.
- list events saved.
- toggle going to event.
- toggle like event.
- toggle follow profile username.

UI | UX DESIGN

Figma
[Figma](https://www.figma.com/design/2Jqh5rduEoNJAEK8olefch/cities-%7C-project?node-id=0-1&t=SdWvjTUZBZDr1jqC-1)

TECHNICAL

BLOCKS
The project is divided into several key components:

- App (User Interface): The client application where users interact.
- API (Core Logic): The API that handles the main logic and serves data to the app.
- DB (Data Storage): Database for persistent data storage.

PACKAGES
The project is organized into the following packages:

- api (server)
- cor (core logic dependency to api)
- com (common dependencies to api and app)
- app (client)
- doc (project documentation)

TECHNOLOGIES

- HTML / CSS / JS
- Node
- Express
- React
- Tailwind
- Mongo
- Data Model

DATA MODEL

- id (string): Unique identifier for the user.
- email (string): User's email address.
- username (string): Profile username.
- password (string): User's password (stored securely by method 'hash').
- profile (string): URL or path to the user's profile image.
- favs ([Post.id]): List of IDs of posts marked as favorites.
- following ([User.id]): List of IDs of followed users.

EVENTS

- id (string): Unique identifier for the event.
- author (User.id): ID of the user who created the event.
- image (string): URL or path to the event image.
- caption (string): Description or comment of the event.
- date (Date): Date and time of the event.
- going to (user.id): List of IDs of users pretneding go to the event.
- likes ([User.id]): List of IDs of users who have liked the event.
