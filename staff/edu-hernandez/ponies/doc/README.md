CITIES

https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanpxeGl2MG9iYXR6Yjl1Z2I2NGR6NmtndjA0Z2gyNG00YnMycndiZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/hTZqITHNkgmX0fwt1C/giphy.gif

Functional

Use Cases

User

create post
events list
list events saved
toggle going to event
toggle like event
toggle follow event

UI | UX Design

Figma
[Figma](https://www.figma.com/design/2Jqh5rduEoNJAEK8olefch/cities-%7C-project?node-id=0-1&t=SdWvjTUZBZDr1jqC-1)

Tecnical

Blocks

App (user interface)
API (core logic)
DB (data storage)

Packages

api (server)
cor (core logic dependency to api)
com (common dependencies to api and app)
app (client)
doc (project documentation)

Technologies

HTML / CSS / JS
Node
Express
React
Mongo
Data Model
User

id (string)
email (string)
username (string)
password (string)
profile (string)
favs ([Post.id])
following ([User.id])
Post

id (string)
author (User.id)
image (string)
caption (string)
date (Date)
likes ([User.id])
