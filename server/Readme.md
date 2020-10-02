#ANIME APP Server
anime app server is an entertainment application
* Restful endpoint for asset's operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### GET /register

>register user

_Request Header_
```
not needed
```
_Request Body_
```
"first_name" : "<first_name to get insert into>",
"last_name": "<last_name to get insert into>",
"email" : "<email to get insert into>",
"password": "<password to get insert into>"
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "email": "<posted name>"
}
```
_Response (400 - Bad Request)_
```
{
    "errors": [
        "First name required!",
        "Last name required!",
        "Email required!",
        "Invalid email format!",
        "Password required!"
    ]
}
```

### POST /login

>login to get token

_Request Header_
```
not needed
```

_Request Body_
```
"email" : "<email to get insert into>",
"password": "<password to get insert into>"
```

_Response (200)_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXNAZ21haWwuY29tIiwiaWF0IjoxNjAxNjAzMDA4fQ.V-mrw7fkHUcsJdrjoMdITkLMocr3TBfYmKKT9DH_v0I"
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "invalid email or password"
    ]
}
```

### GET /trivia

_Request Header_
```
token: <token from login>
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "trivia": "The name of the attack &quot;Kamehameha&quot; in Dragon Ball Z was named after a famous king of Hawaii.",
    "answer": "True"
}
```

### GET /gif

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

Response (200)_
```
{
    "data": {
        "height": "256",
        "width": "256",
        "size": "71699",
        "url": "https://media4.giphy.com/media/3ohhwxJ2W3AsRaGwAo/giphy.gif?cid=5a05bf0c5lrh4si6m3xcypoxnoeyrysaqy5y7gsk8g6ltigq&rid=giphy.gif"
    }
}
```