# FlowForge Backend API Documentation

This README documents the current authentication endpoints available in the backend.

Base URL:
- http://localhost:5000/api

## 1. Register User

Register a new user and send an OTP to the provided email address.

### Endpoint
- POST /user/register

### Request
Use form-data if you want to upload a profile image.

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
  "message": "email is verified you can now login"
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

### Note
The login route is defined, but the controller logic is not implemented yet in the current version.

---

## Notes
- The registration endpoint stores a JWT token in a cookie after successful registration.
- OTP expiration is set for 5 minutes.
- The user model supports profile picture upload through Cloudinary.
