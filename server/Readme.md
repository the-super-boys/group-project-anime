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

> get 3rd api trivia

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

_Response (401)_
```
{
    "errors": [
        "Failed to authenticate!"
    ]
}
```

### GET /gif

> get 3rd party gif

_Request Header_
```
{
    "token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
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

_Response (401)_
```
{
    "errors": [
        "Failed to authenticate!"
    ]
}
```

### GET /jikans

>get 3rd party jikan

_Request Header_
```
{
    "token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
``
{
    "status": 200,
    "msg": "Success Find all",
    "todos": [
        {
            {
            "mal_id": 38786,
            "url": "https://myanimelist.net/anime/38786/Kensaku_to_Enjin_no_Atarashii_Tomodachi__Query_Toujou",
            "image_url": "https://cdn.myanimelist.net/images/anime/1702/97014.jpg?s=587df5384a786a66b776309c1164e662",
            "title": "Kensaku to Enjin no Atarashii Tomodachi: Query Toujou!",
            "airing": false,
            "synopsis": "Yahoo!'s Kensaku to Enjin franchise gained a new character: Query. She wants to be an idol, loves fashion, and gets quite the motor mouth when angry. This short 2D animation debuts her on stage.",
            "type": "ONA",
            "episodes": 1,
            "score": 0,
            "start_date": "2018-07-03T00:00:00+00:00",
            "end_date": "2018-07-03T00:00:00+00:00",
            "members": 111,
            "rated": "G"
        },
        },
        .....
    ]
}
```

_Response (401)_
```
{
    "errors": [
        "Failed to authenticate!"
    ]
}
```


