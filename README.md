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

# Kuisioner

## Get All Kuisioner


Endpoint : GET /kuisioner

Authorization: access_token

Response Body (succes) :

```
{
    "statusCode": 200,
    "message": "Successfully Get All Kuisioner",
    "data": [
        {
            "id": "3c94344f-7476-44e0-8a31-303c3f6b3bc3",
            "title": "TesKuisioner1",
            "isActive": true,
            "createdAt": "2024-10-04T10:32:42.557Z",
            "updatedAt": "2024-10-04T10:32:42.557Z"
        },
        {
            "id": "1667321d-25f3-43ba-b90c-cca473d127d0",
            "title": "Kuisioner Screening 1",
            "isActive": true,
            "createdAt": "2024-10-04T10:43:23.202Z",
            "updatedAt": "2024-10-04T10:43:23.202Z"
        }
    ]
}
```

## Get Spesific Kuisioner


Endpoint : GET /kuisioner/:kuisioner_id

Params: kuisioner_id (UUID)

Authorization: access_token

Response Body (succes) :

```
{
    "statusCode": 200,
    "message": "Successfully Get Kuisioner",
    "data": {
        "id": "1667321d-25f3-43ba-b90c-cca473d127d0",
        "title": "Kuisioner Screening 1",
        "isActive": true,
        "createdAt": "2024-10-04T10:43:23.202Z",
        "updatedAt": "2024-10-04T10:43:23.202Z",
        "subKuisioners": [
            {
                "id": "cd191bdd-8fea-4d6a-81b5-380de93cad59",
                "title": "SubKuisioner Stress",
                "createdAt": "2024-10-04T12:12:53.351Z",
                "updatedAt": "2024-10-04T12:12:53.351Z"
            },
            {
                "id": "47a65933-fe35-41e9-9610-c55805c92b93",
                "title": "SubKuisioner Kecemasan",
                "createdAt": "2024-10-04T13:07:06.846Z",
                "updatedAt": "2024-10-04T13:07:06.846Z"
            },
            {
                "id": "22fb61dd-f54d-4bec-bb98-26d90f94d16b",
                "title": "SubKuisioner Depresi",
                "createdAt": "2024-10-16T11:09:08.223Z",
                "updatedAt": "2024-10-16T11:09:08.223Z"
            },
            {
                "id": "744f79d7-2692-422c-9d63-b24cec2f8d6b",
                "title": "SubKuisioner Prokrastinasi",
                "createdAt": "2024-10-16T11:09:51.779Z",
                "updatedAt": "2024-10-16T11:09:51.779Z"
            },
            {
                "id": "4964861f-962a-416f-b2a0-6a0c93adea91",
                "title": "SubKuisioner Kecanduan Ponsel",
                "createdAt": "2024-10-16T11:10:18.529Z",
                "updatedAt": "2024-10-16T11:10:18.529Z"
            }
        ]
    }
}
```

# SubKuisioner

## Get Spesific SubKuisioner

Endpoint : GET /subkuisioner/:subKuisioner_id

Params: subKuisioner_id (UUID)

Authorization: access_token

Response Body (succes) :

```
{
    "statusCode": 200,
    "message": "Successfully Get Sub Kuisioner",
    "data": {
        "id": "22fb61dd-f54d-4bec-bb98-26d90f94d16b",
        "title": "SubKuisioner Depresi",
        "createdAt": "2024-10-16T11:09:08.223Z",
        "updatedAt": "2024-10-16T11:09:08.223Z",
        "symtompId": {
            "id": "52801a1d-32e6-49d8-bed4-162374630e46",
            "name": "Depresi"
        },
        "questions": [
            {
                "id": "51ee586e-6333-4d9d-a961-071a9ac4e1f7",
                "question": "Saya sama sekali tidak dapat merasakan perasaan positif (contoh: merasa gembira, bangga, dsb).",
                "createdAt": "2024-10-16T11:25:34.554Z",
                "updatedAt": "2024-10-16T11:25:34.554Z",
                "answers": [
                    {
                        "id": "6e8aa530-4d74-4e8c-babd-274b66ba6b69",
                        "answer": "Sangat tidak setuju",
                        "score": 1
                    },
                    {
                        "id": "8a245a89-7254-42d9-b8fd-2eac410a5585",
                        "answer": "Tidak setuju",
                        "score": 2
                    },
                    {
                        "id": "34c2c6e6-a3d9-4d0f-97f9-954087748564",
                        "answer": "Netral",
                        "score": 3
                    },
                    {
                        "id": "98f85e33-a435-40d8-b83c-b6d3d6b12f6b",
                        "answer": "Setuju",
                        "score": 4
                    },
                    {
                        "id": "1ac64d88-fe0d-45be-899c-2707beb75d68",
                        "answer": "Sangat setuju",
                        "score": 5
                    }
                ]
            },
            {
                "id": "3b89d150-a078-486a-a107-e1843db6db6e",
                "question": "Saya merasa sulit berinisiatif melakukan sesuatu.",
                "createdAt": "2024-10-16T11:25:43.546Z",
                "updatedAt": "2024-10-16T11:25:43.546Z",
                "answers": [
                    {
                        "id": "e904973e-dec8-405b-b085-ad3090267a7a",
                        "answer": "Sangat tidak setuju",
                        "score": 1
                    },
                    {
                        "id": "71d05faf-8913-4073-a401-7ee58d09559c",
                        "answer": "Tidak setuju",
                        "score": 2
                    },
                    {
                        "id": "6c0eeba4-a22a-4e64-8058-ab328711b8b0",
                        "answer": "Netral",
                        "score": 3
                    },
                    {
                        "id": "1651c8cb-6285-41d7-b329-6fd81e347e7e",
                        "answer": "Setuju",
                        "score": 4
                    },
                    {
                        "id": "217d5a58-2236-461f-a326-6338e0a9f113",
                        "answer": "Sangat setuju",
                        "score": 5
                    }
                ]
            },
        ]

    }
}

```


