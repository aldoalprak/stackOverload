# StackOverLoad

Brief description: this project tend to clone stack overflow website

Steps to Get Started

1. npm install
2. Add .env
3. npm run start

Routes

1. Users

| Route         | HTTP   | Description               |
|---------------|--------|---------------------------|
| /users/signin | POST   | signin                    |
| /users/signup | POST   | signup                    |
| /users/showOne| GET    | showOne                   |

2. Questions

| Route                   | HTTP   | Description                |
|-------------------------|--------|----------------------------|
| /questions/add          | POST   | add question               |
| /questions/show         | GET    | show all questions         |
| /questions/showOne/:id  | GET    | show specific question     |
| /questions/delete/:id   | DELETE | delete specific question   |
| /questions/update/:id   | PUT    | update specific question   |
| /questions/upvote/:id   | PUT    | upvote specific question   |
| /questions/downvote/:id | PUT    | downvote specific question |

3. Answers

| Route                     | HTTP   | Description              |
|---------------------------|--------|--------------------------|
| /answers/add              | POST   | add answer               |
| /answers/showbypostid/:id | GET    | show specific answer     |
| /answers/delete/:id       | DELETE | delete specific answer   |
| /answers/update/:id       | PUT    | update specific answer   |
| /answers/upvote/:id       | PUT    | upvote specific answer   |
| /answers/downvote/:id     | PUT    | downvote specific answer |