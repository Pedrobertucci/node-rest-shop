# Learn Node.js

This project was create to learn Node.js

## User Manager

### Sign up user

`POST /user/signup`

**Body**
```bash
{ "email": "your email", "password": "your password" }
```
**Response** | Status: 201
```bash
{ "message": "User created" }
```
**Response** | Status: 409
```bash
{ "message": "Mail already registered" }
```
---

### Sign in user
**header** Authorization - JWT 

`POST /user/signin`

**Body**
```bash
{ "email": "your email", "password": "your password" }
```
**Response** | Status: 200
```bash
{ "message": "Auth successful", "token": "Your JWT" }
```
* User data inside in JWT

**Response** | Status: 401
```bash
{ "message": "Auth failed" }
```
**Response** | Status: 404
```bash
{ "message": "User not found" }
```
---

### Delete user
**header** Authorization - JWT 

`DELETE /user/:userId`

**Response** | Status: 200
```bash
{ "message": "User Deleted" }
```
**Response** | Status: 409
```bash
{ "message": "Mail already registered" }
```
---
