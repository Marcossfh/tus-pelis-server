# Project Name Cuenta tu peli

## [See the App!](https://tus-pelis-app.netlify.app)

## Description

Crea tu Peli es una app para compartir ideas sobre proyectos ideas o lo que salga de tu imaginación para lo que podria ser tu peli ideal. La app sirver para hacer un esquema de lo que serian tus ideas y que otros usuarios se inspiren y viceversa y poder hablar sobre ellas.

#### (https://github.com/Marcossfh/your-movie-client)

#### (https://github.com/Marcossfh/tus-pelis-server)

## Technologies & Libraries used

HTML, CSS, Javascript, React, axios, React Context

## Backlog Functionalities

Mejorar la presentacion de la app. Dar la opcion a los usuarios de subir sus propios videos. Enlazar las peliculas relacionadas con una pagina de cine tipo Imdb o Filmaffinitty.


## Server Routes


## API Endpoints (backend routes)

| HTTP Method              | URL                   | Request Body                   | Success status              | Error Status | Description                                    |
| ------------------------ | --------------------- | ------------------------------ | --------------------------- | ------------ | ---------------------------------------------- | --- |
| POST                     | `/auth/signup`        | {name, email, password}        | 201                         | 400          | Registers the user in the Database             |
| POST                     | `/auth/login`         | {username, password}           | 200                         | 400          | Validates credentials, creates and sends Token |
| GET                      | `/auth/verify`        |                                | 200                         | 401          | Verifies the user Token                        |
| GET                      | `/movies`             | {img,title, characters, genre, |
| sinopsis, relatedMovies} | 200                   | 400                            | Show movies in the DB       |
| POST                     | `/movies`             | {img,title, characters, genre, |
| sinopsis, relatedMovies} | 201                   | 400                            | Creates a new movie Document |
| GET                      | `/movies/:movieId`    |                                | 200                         | 400, 401     | Sends movie id Details                         |
| GET                      | `movies/:genre/genre` |                                | 200                         | 400, 401     | Get movie genre                          |
| DELETE                   | `/movies/:movieId`    |                                | 200                         | 401          | Deletes movie document                          |     |
| PUT                      | `/movies/:movieId`    |                                | 200                         | 401          | Adds movie to favourite                         |
| DELETE                   | `/comment/:comment`   |                                | 200                         | 401          | Delete comment                                 |
| POST                     | `/comment`            |                                | 200                         | 401          | Create comment                                 |
| GET                      | `/comment`            |                                | 200                         | 400          | Get comment                                    |
| GET                      | `/comment/:movieId`   |                                | 200                         | 400          | Get comment                                    |
| PUT                      | `/favorito`           |                                | 200                         | 400          | Create favourite                               |

## Other Components

- Navbar



### Collaborators

[Developer Marcos](https://github.com/Marcossfh)

### Project

[Repository Link Client](https://github.com/Marcossfh/your-movie-client)

[Repository Link Server](https://github.com/Marcossfh/tus-pelis-server)
