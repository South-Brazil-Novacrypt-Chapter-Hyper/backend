# backend

## Available routes

### Accounts

Route to login
```
GET /login/:email/:password   
```

Ex.: http://localhost:3333/login/user@gmail.com/1234

Route to register
```
POST /login   

BODY:
{
  "username": "string",
  "email": "string",
  "password": "string",
  "github": "string" (optional)
}
```

Ex.: http://localhost:3333/login

Body:    
{   
  "username": "new-user",   
  "email": "user@gmail.com",   
  "password": "1234",   
  "github": ""   
}   

### Projects

Route to list projects
```
GET /project
```

Ex.: http://localhost:3333/project

Route to create project
```
POST /project

Body:
{
  "name": "string",
  "platform": "string",
  "description": "string",
  "scope": "string",
  "account": [Array of ids of the users]
}
```

Ex.: http://localhost:3333/project

Body:
{
  "name": "API",
  "platform": "Windows",
  "description": "A simple API Rest",
  "scope": "Open Source",
  "account": [1]
}

OBS: The account[0] is always the project creator
