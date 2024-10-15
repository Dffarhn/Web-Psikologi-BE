# **API Documentation KeepUp**

**Created By: Dffarhn As Web Backend Developer**

# USER

## Authentikasi

### Login

Endpoint : POST auth/login

Request Body :

```
{
    "email":"d.raihan2004@gmail.com",
    "password":"dapa123"
}
```

Response Body (succes) :

```
{
    "statusCode": 200,
    "message": "Login Successfully",
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRhZWVmZGUxLWFiNWYtNDEyOS1iZGUyLTlmZWFjZThlOTMxNSIsInVzZXIiOiJNdWhhbW1hZCBEYWZmYSBSYWloYW4gcHN5Y2hvbG9nIiwicm9sZSI6ImVmOTVjMDhmLTg1NmUtNDljYy1hNzVhLTBhYzkyOGI0YWJjZCIsImlhdCI6MTcyODk5NzE3OCwiaXNzIjoiQXBpS2VlcFVwIiwiYXVkIjoiS2VlcFVwIiwiZXhwIjoxNzI5MDAwNzc4fQ.sAnpvxLE_TGnNaSDZ9vcOxV0hHuPBo6T38Tttz30glY"
    }
}
```

### Register

Endpoint : POST auth/register

Request Body :

```
{
  "email": "daffaraihan2004.work@gmail.com",
  "username": "Muhammad Daffa Raihan client",
  "password": "@Daffaraihan2004",
  "retypedpassword": "@Daffaraihan2004",
  "roleId":"76e175bf-25d3-4ab6-83fd-5b6e60e39352"
}

```

Response Body (succes) :

```
{
    "statusCode": 201,
    "message": "Register Successfully",
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU4NzNiYzA5LTg5OTYtNGY0NS1hMTM1LTNjOGZjZGMwMTE0OSIsInVzZXIiOiJNdWhhbW1hZCBEYWZmYSBSYWloYW4gY2xpZW50Iiwicm9sZSI6Ijc2ZTE3NWJmLTI1ZDMtNGFiNi04M2ZkLTViNmU2MGUzOTM1MiIsImlhdCI6MTcyODk5NzQyNCwiaXNzIjoiQXBpS2VlcFVwIiwiYXVkIjoiS2VlcFVwIiwiZXhwIjoxNzI5MDAxMDI0fQ.OURizTZio0YoIg9EVrOX2LUg2mxUZpQmwoxlPOzy6mE",
        "created_at": "2024-10-15T13:03:44.171Z"
    }
}

```

### Refresh Access Token

Endpoint : POST auth/refresh

Authorization: access_token

Cookie: refresh_token

Response Body (succes) :

```
{
    "statusCode": 201,
    "message": "Successfully Create New Access Token",
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRhZWVmZGUxLWFiNWYtNDEyOS1iZGUyLTlmZWFjZThlOTMxNSIsInJvbGUiOiJlZjk1YzA4Zi04NTZlLTQ5Y2MtYTc1YS0wYWM5MjhiNGFiY2QiLCJpYXQiOjE3Mjg5OTc2MzUsImlzcyI6IkFwaUtlZXBVcCIsImF1ZCI6IktlZXBVcCIsImV4cCI6MTcyOTAwMTIzNX0.kYhWxJZpO06P_Dp7xCCdZJ1xLH01uJnPLty9T3t9TN4"
    }
}

```

### Resend Confirmation

Endpoint : POST auth/resendConfirmation

Authorization: access_token

Response Body (succes) :

```
{
    "statusCode": 200,
    "message": "Successfully Resend Confirmation Email"
}

```

### Confirmation Email

Endpoint : GET /auth/confirm?authId=scsacsa&token=cascas

Response Body (succes) : Redirect to Login Page FrontEnd
