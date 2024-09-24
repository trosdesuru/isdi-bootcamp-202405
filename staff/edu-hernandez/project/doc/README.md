# Cities

Cities is an application designed to explore, create, and manage events within different cities. 
The primary objective is to connect users to events and provide tools for users to search for, 
create, and modify events by location and other key details.

![Cities Image](https://media.giphy.com/media/39DV0pT9v42Fq/giphy.gif?cid=ecf05e47m4kzmaq2wr3vcwdlfcfo7fgconr1yjonyfor0zy7&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

The application offers a platform for users to interact, explore cities, and stay informed about city-based events through:

- A main section where users can create, modify, and delete their own events.
- An interactive map or list to display events by location, and allow users to explore events near them.
- A search tool to find events by location, title, or description.
- An event management section to allow users to modify or delete their own events.

### Use Cases

User
- Create event
- List events by city
- Search events by location, title, or description
- Modify own event
- Delete own event
- Follow cities to receive notifications of events
- Explore cities and view events

### UIUX Design
[Figma](https://www.figma.com/proto/2Jqh5rduEoNJAEK8olefch/ISDI-Project-%7C-cities?page-id=47%3A270&node-id=83-33&node-type=canvas&viewport=-303%2C877%2C0.39&t=5vC2tVC4q8nyme1o-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=83%3A33)

## Technical

### Blocks

- App (user interface)
- API (core logic)
- DB (data storage)

### Packages

- api (server)
- cor (core logic dependency to api)
- com (common dependencies to api and app)
- app (client)
- doc (project documentation)

### Technologies

- HTML / CSS / JS
- Node
- Express
- React
- MongoDB
- Mongoose
- Bcrypt
- JWT

### Data Model

User 
- id (auto)
- name (string)
- email (string)
- password (string)
- avatar (string, optional)
- followingCities ([City.id])

Event
- id (auto)
- author (User.id)
- image (string, optional)
- title (string)
- description (string)
- location ([Number, Number])
- startDate (Date)
- endDate (Date, optional)
- tickets (string, optional)
- createdAt (Date)

City
- id (auto)
- name (string)
- country (string)
- coordinates ([Number, Number])

Comment
- id (auto)
- text (string)
- author (User.id)
- event (Event.id)
- date (Date)

### Test Coverage

![Test Coverage](./test-coverage.png)
