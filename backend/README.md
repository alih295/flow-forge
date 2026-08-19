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

## 7. Workspace Endpoints

All workspace endpoints require authentication. Send either the `token` cookie or an `Authorization: Bearer YOUR_JWT_TOKEN` header.

### Create Workspace

- POST `/workspace/create`
- Required user role: `admin` or `manager`
- Content-Type: `application/json`

#### Request Body Fields

- `name`: string (required)
- `description`: string (optional)

#### Example Request

```bash
curl -X POST http://localhost:5000/api/workspace/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Product Development",
    "description": "Workspace for the product team"
  }'
```

#### Success Response

- Status: `200 OK`

```json
{
  "success": true,
  "workspace": {
    "_id": "WORKSPACE_ID",
    "name": "Product Development",
    "description": "Workspace for the product team",
    "owner": "USER_ID",
    "status": "active"
  }
}
```

### Get Workspaces

- GET `/workspace/get`
- Returns all workspaces for the authenticated user. An admin receives all workspaces.

#### Example Request

```bash
curl -X GET http://localhost:5000/api/workspace/get \
  -b "token=YOUR_JWT_COOKIE"
```

#### Success Response

- Status: `200 OK`

```json
{
  "success": true,
  "workspace": [
    {
      "_id": "WORKSPACE_ID",
      "name": "Product Development",
      "description": "Workspace for the product team",
      "owner": "USER_ID",
      "status": "active"
    }
  ]
}
```

### Get Workspace by ID

- GET `/workspace/by-id/:id`
- `id`: workspace ObjectId (required)
- The authenticated user must be an active workspace member, unless the user is an admin.

#### Example Request

```bash
curl -X GET http://localhost:5000/api/workspace/by-id/WORKSPACE_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Workspace

- PATCH `/workspace/update/:id`
- `id`: workspace ObjectId (required)
- Required user role: `admin` or `manager`
- Content-Type: `application/json`

#### Request Body Fields

- `name`: string (optional)
- `description`: string (optional)

#### Example Request

```bash
curl -X PATCH http://localhost:5000/api/workspace/update/WORKSPACE_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Updated Product Development",
    "description": "Updated workspace description"
  }'
```

#### Success Response

- Status: `201 Created`

```json
{
  "success": true,
  "updateWorkspace": {
    "_id": "WORKSPACE_ID",
    "name": "Updated Product Development",
    "description": "Updated workspace description"
  }
}
```

---

## 8. Workspace Member Endpoints

All workspace member endpoints require authentication. The `:id` parameter is the workspace ObjectId. Workspace access is checked before the controller runs, except that admins can access any workspace.

### Get Workspace Members

- GET `/workspaces/:id/members`
- Returns workspace-member records with populated user details. The current controller returns all workspace-member records after validating access to the requested workspace.

#### Example Request

```bash
curl -X GET http://localhost:5000/api/workspaces/WORKSPACE_ID/members \
  -b "token=YOUR_JWT_COOKIE"
```

#### Success Response

- Status: `200 OK`

```json
{
  "success": true,
  "workspaceMembers": [
    {
      "_id": "MEMBERSHIP_ID",
      "workspace": "WORKSPACE_ID",
      "user": {
        "_id": "USER_ID",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "role": "member",
      "status": "active",
      "joinedAt": "2026-08-19T00:00:00.000Z",
      "invitedBy": "INVITER_USER_ID"
    }
  ]
}
```

### Add Workspace Member

- POST `/workspace/:id/add-members`
- Required user role: global `admin`, or workspace `owner`/`manager`
- Content-Type: `application/json`

#### Request Body Fields

- `userId`: string/ObjectId (required)
- `role`: string (required, allowed values: `member`, `manager`)

#### Example Request

```bash
curl -X POST http://localhost:5000/api/workspace/WORKSPACE_ID/add-members \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "userId": "USER_ID",
    "role": "member"
  }'
```

#### Success Response

- Status: `200 OK`

```json
{
  "succes": true,
  "member": {
    "workspace": "WORKSPACE_ID",
    "user": "USER_ID",
    "role": "member",
    "status": "active",
    "invitedBy": "INVITER_USER_ID"
  }
}
```

### Remove Workspace Member

- DELETE `/workspace/:id/remove-member/:userId`
- `userId`: user ObjectId (required)
- Only the workspace owner or a global admin can remove a member. The workspace owner cannot be removed.

#### Example Request

```bash
curl -X DELETE http://localhost:5000/api/workspace/WORKSPACE_ID/remove-member/USER_ID \
  -b "token=YOUR_JWT_COOKIE"
```

#### Success Response

- Status: `200 OK`

```json
{
  "success": true,
  "nessage": "user removed successfully"
}
```

---

## Workspace Error Status Codes

Errors use this response format:

```json
{
  "success": false,
  "status": 400,
  "message": "Error message"
}
```

Common workspace and workspace-member errors:

| Status | Meaning | Examples |
|---|---|---|
| `400 Bad Request` | Invalid request or workspace access denied | Invalid member role; user is not allowed to access the workspace; a non-owner attempts removal; owner cannot be removed |
| `401 Unauthorized` | Authentication is missing | No `token` cookie or bearer token |
| `403 Forbidden` | Authenticated user role is not allowed | A `member` attempts to create/update a workspace |
| `404 Not Found` | Workspace or member does not exist | Workspace not found; workspace member not found |
| `409 Conflict` | Request conflicts with existing data | User is invalid; user is already a member of the workspace |
| `500 Internal Server Error` | Unexpected server or database error | Unhandled backend error |

## Notes
- The registration endpoint stores a JWT token in a cookie after successful registration.
- OTP expiration is set for 5 minutes.
- The user model supports profile picture upload through Cloudinary.
