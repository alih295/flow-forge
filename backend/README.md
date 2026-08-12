# FlowForge Backend API Documentation

This README documents the current backend endpoints available for authentication and user management.

Base URL:
- http://localhost:5000/api

## 1. Register User

Register a new user and send an OTP to the provided email address.

### Endpoint
- POST /user/register

### Request
Use `multipart/form-data` to upload a profile image.

#### Body Parameters
- name: string (required)
- email: string (required)
- password: string (required)
- image: file (optional)

### Example Request
```bash
curl -X POST http://localhost:5000/api/user/register \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "password=12345678" \
  -F "image=@/path/to/profile.jpg"
```

> Exact request field names:
> - `name`
> - `email`
> - `password`
> - `image` (optional file upload)

### Success Response
- Status: 201 Created

```json
{
  "success": true,
  "message": "OTP sent to your email. Please verify to continue.",
  "email": "john@example.com"
}
```

### Error Responses
- Status: 400 Bad Request
```json
{
  "message": "user is already exist"
}
```

- Status: 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## 2. Verify OTP

Verify the OTP sent to the user email.

### Endpoint
- POST /verify-otp

### Request Body
- email: string (required)
- otp: string (required)

### Example Request
```bash
curl -X POST http://localhost:5000/api/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "otp": "123456"
  }'
```

### Success Response
- Status: 200 OK

```json
{
  "message": "email is verified you can now login "
}
```

### Error Responses
- Status: 400 Bad Request
```json
{
  "message": "Invalid OTP"
}
```

```json
{
  "message": "OTP is Expire"
}
```

```json
{
  "message": "user is not found"
}
```

---

## 3. Login User

### Endpoint
- POST /user/login

### Request Body
- email: string (required)
- password: string (required)

### Example Request
```bash
curl -X POST http://localhost:5000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "12345678"
  }'
```

### Success Response
- Status: 200 OK

```json
{
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "isVerify": true,
    "role": "member",
    "status": "active",
    "profile": {
      "profilePic": "https://..."
    }
  },
  "token": "..."
}
```

---

## 4. Get Current User Profile

### Endpoint
- GET /user/profile

### Description
Returns the currently authenticated user's profile.

### Authorization
- Requires a valid auth cookie: `token`

### Example Request
```bash
curl -X GET http://localhost:5000/api/user/profile \
  -b "token=YOUR_JWT_COOKIE"
```

---

## 5. Logout User

### Endpoint
- GET /logout

### Description
Clears the auth cookie and logs out the current user.

### Example Request
```bash
curl -X GET http://localhost:5000/api/logout \
  -b "token=YOUR_JWT_COOKIE"
```
```

---

## 6. User Management Endpoints

### Get All Users
- GET /user/get-users
- Query parameters:
  - `page`: number (optional, defaults to 1)
  - `limit`: number (optional, defaults to 10)

### Example Request
```bash
curl -X GET "http://localhost:5000/api/user/get-users?page=1&limit=10" \
  -b "token=YOUR_JWT_COOKIE"
```

### Get Single User
- GET /user/get-single-user/:id

### Example Request
```bash
curl -X GET http://localhost:5000/api/user/get-single-user/USER_ID \
  -b "token=YOUR_JWT_COOKIE"
```

### Update User Status and Role
- PATCH /user/update-user-status-and-role/:id

#### Request Body
- role: string (optional, allowed values: `admin`, `manager`, `member`)
- status: string (optional, allowed values: `active`, `blocked`)

### Example Request
```bash
curl -X PATCH http://localhost:5000/api/user/update-user-status-and-role/USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "role": "manager",
    "status": "active"
  }' \
  -b "token=YOUR_JWT_COOKIE"
```

### Delete User
- DELETE /user/delete-user/:id

### Example Request
```bash
curl -X DELETE http://localhost:5000/api/user/delete-user/USER_ID \
  -b "token=YOUR_JWT_COOKIE"
```

---

## Notes
- The registration endpoint stores a JWT token in a cookie after successful registration.
- OTP expiration is set for 5 minutes.
- The user model supports profile picture upload through Cloudinary.
