# FlowForge Backend API

FlowForge is a workspace-based task management API built with Express,
MongoDB, JWT authentication, Socket.IO, Cloudinary, and Nodemailer.

## Quick Start

### Requirements

- Node.js 18 or later
- MongoDB instance
- Cloudinary account (required when registering with a profile image)
- Gmail SMTP credentials or an equivalent Nodemailer configuration

### Install and Run

```bash
cd backend
npm install
npm run dev
```

The development server listens on `http://localhost:5000` unless `PORT` is
set. There is currently no automated test script in `package.json`.

### Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/flowforge
JWT_SECRET=replace-with-a-long-random-secret

CLOUDINARY_API_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-app-password
```

`EMAIL_PASS` should be an email provider app password where required. Never
commit `.env` or expose these values in the frontend.

## API Basics

Base URL:

```text
http://localhost:5000/api
```

Protected HTTP endpoints accept either the `token` cookie or an
`Authorization: Bearer YOUR_JWT_TOKEN` header. Login and registration set the
cookie automatically. For a browser frontend using cookie authentication,
send requests with credentials enabled (`credentials: "include"`).

Replace placeholder values such as `WORKSPACE_ID`, `TASK_ID`, `USER_ID`,
`COMMENT_ID`, and `NOTIFICATION_ID` with real MongoDB IDs.

### Roles

Global roles are `admin`, `manager`, and `member`. Workspace roles are
`owner`, `manager`, and `member`. A global admin can access workspace-scoped
resources without a workspace membership record.

### Standard Error Response

Most controller errors use this response shape:

```json
{
  "success": false,
  "status": 400,
  "message": "Error message"
}
```

Validation errors use an `errors` array instead of `message`:

```json
{
  "success": false,
  "errors": [
    { "field": "email", "message": "valid email is required" }
  ]
}
```

## 1. Authentication

### Register User

- `POST /user/register`
- Content-Type: `multipart/form-data`

#### Form Fields

- `name`: string, required (minimum 5 characters)
- `email`: string, required
- `password`: string, required (minimum 8 characters)
- `image`: file, optional

#### Example Request

```bash
curl -X POST http://localhost:5000/api/user/register \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "password=12345678" \
  -F "image=@/path/to/profile.jpg"
```

### Verify OTP

- `POST /verify-otp`
- Content-Type: `application/json`
- The OTP expires after 5 minutes.

#### Request Body

```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

#### Example Request

```bash
curl -X POST http://localhost:5000/api/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "otp": "123456"
  }'
```

### Login User

- `POST /user/login`
- Content-Type: `application/json`

#### Request Body

```json
{
  "email": "john@example.com",
  "password": "12345678"
}
```

#### Example Request

```bash
curl -X POST http://localhost:5000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "12345678"
  }'
```

### Get Current User

- `GET /user/profile`
- Requires authentication.

```bash
curl http://localhost:5000/api/user/profile \
  -b "token=YOUR_JWT_TOKEN"
```

### Logout User

- `GET /logout`
- Requires authentication.

```bash
curl http://localhost:5000/api/logout \
  -b "token=YOUR_JWT_TOKEN"
```

## 2. User Management

All endpoints in this section require authentication.

### Get All Users

- `GET /get-users?page=1&limit=10`
- `page` and `limit` are optional; defaults are `1` and `10`.

```bash
curl "http://localhost:5000/api/get-users?page=1&limit=10" \
  -b "token=YOUR_JWT_TOKEN"
```

### Get Single User

- `GET /get-single-user/USER_ID`

```bash
curl http://localhost:5000/api/get-single-user/USER_ID \
  -b "token=YOUR_JWT_TOKEN"
```

### Update User Status or Role

- `PATCH /update-user-status-and-role/USER_ID`
- Required global role: `admin` or `manager`
- Body fields: `role` (`admin`, `manager`, or `member`) and/or `status` (`active` or `blocked`)

```bash
curl -X PATCH http://localhost:5000/api/update-user-status-and-role/USER_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "role": "manager",
    "status": "active"
  }'
```

### Delete User

- `DELETE /delete-user/USER_ID`
- Required global role: `admin`

```bash
curl -X DELETE http://localhost:5000/api/delete-user/USER_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 3. Workspace Management

### Create Workspace

- `POST /workspace/create`
- Required global role: `admin` or `manager`
- Body: `name` required, `description` optional

```bash
curl -X POST http://localhost:5000/api/workspace/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Product Development",
    "description": "Workspace for the product team"
  }'
```

### Get Workspaces

- `GET /workspace/get`

```bash
curl http://localhost:5000/api/workspace/get \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Workspace by ID

- `GET /workspace/by-id/WORKSPACE_ID`
- Requires membership in the workspace, unless the user is a global admin.

```bash
curl http://localhost:5000/api/workspace/by-id/WORKSPACE_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Workspace

- `PATCH /workspace/update/WORKSPACE_ID`
- Required global role: `admin` or `manager`
- Body fields: `name` and/or `description`

```bash
curl -X PATCH http://localhost:5000/api/workspace/update/WORKSPACE_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Updated Product Development",
    "description": "Updated workspace description"
  }'
```

## 4. Workspace Members

### Get Workspace Members

- `GET /workspaces/WORKSPACE_ID/members`

```bash
curl http://localhost:5000/api/workspaces/WORKSPACE_ID/members \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Add Workspace Member

- `POST /workspace/WORKSPACE_ID/add-members`
- Required role: global `admin` or `manager` at the route level. The
  controller also supports workspace `owner`/`manager` membership.
- Body: `userId` required and `role` (`member` or `manager`) required

```bash
curl -X POST http://localhost:5000/api/workspace/WORKSPACE_ID/add-members \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "userId": "USER_ID",
    "role": "member"
  }'
```

### Remove Workspace Member

- `DELETE /workspace/WORKSPACE_ID/remove-member/USER_ID`
- Required role: global `admin` or workspace `owner`.
- The workspace owner cannot be removed.

```bash
curl -X DELETE http://localhost:5000/api/workspace/WORKSPACE_ID/remove-member/USER_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 5. Tasks

### Create Task

- `POST /workspaces/WORKSPACE_ID/tasks`
- Required role: global `admin`, or workspace `owner`/`manager`
- Body: `title` required; `description`, `assignedTo`, `priority`, and `dueDate` optional
- `priority`: `low`, `medium`, `high`, or `urgent`

```bash
curl -X POST http://localhost:5000/api/workspaces/WORKSPACE_ID/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Prepare release notes",
    "description": "Document the changes for the next release",
    "assignedTo": "USER_ID",
    "priority": "high",
    "dueDate": "2026-09-01"
  }'
```

### Get Workspace Tasks

- `GET /workspace/WORKSPACE_ID/get-tasks`

```bash
curl http://localhost:5000/api/workspace/WORKSPACE_ID/get-tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

The response includes `tasks`, with populated `assignedTo` and `createdBy`
user name and email fields.

### Update Task Details

- `PATCH /workspace/WORKSPACE_ID/tasks/TASK_ID`
- Required role: global `admin`, or workspace `owner`/`manager`
- Body fields: `title`, `description`, `priority`, `dueDate`, and/or `assignedTo`

```bash
curl -X PATCH http://localhost:5000/api/workspace/WORKSPACE_ID/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Finalize release notes",
    "priority": "urgent"
  }'
```

### Update Task Status

- `PATCH /workspace/WORKSPACE_ID/tasks/TASK_ID/status`
- Body: `status` must be `todo`, `in-progress`, or `completed`
- Allowed for global admins, workspace owners/managers, or the assigned user.

```bash
curl -X PATCH http://localhost:5000/api/workspace/WORKSPACE_ID/tasks/TASK_ID/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "status": "completed"
  }'
```

### Delete Task

- `DELETE /workspace/WORKSPACE_ID/tasks/TASK_ID`
- Required role: global `admin`, or workspace `owner`/`manager`

```bash
curl -X DELETE http://localhost:5000/api/workspace/WORKSPACE_ID/tasks/TASK_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 6. Comments

### Create Comment

- `POST /workspace/WORKSPACE_ID/tasks/TASK_ID/comments`
- Body: `content` required

```bash
curl -X POST http://localhost:5000/api/workspace/WORKSPACE_ID/tasks/TASK_ID/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "content": "The release notes are ready for review."
  }'
```

### Get Task Comments

- `GET /workspace/WORKSPACE_ID/tasks/TASK_ID/comments`

```bash
curl http://localhost:5000/api/workspace/WORKSPACE_ID/tasks/TASK_ID/comments \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Comment

- `PATCH /workspace/WORKSPACE_ID/tasks/TASK_ID/comment/COMMENT_ID`
- Requires authentication and workspace access.
- Only the comment author or a global admin can update it.
- Body: `content` required.

```bash
curl -X PATCH http://localhost:5000/api/workspace/WORKSPACE_ID/tasks/TASK_ID/comment/COMMENT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "content": "Updated review comment."
  }'
```

### Delete Comment

- `DELETE /workspace/WORKSPACE_ID/tasks/TASK_ID/comment/COMMENT_ID`
- Only the comment author, a workspace owner/manager, or a global admin can
  delete it.

```bash
curl -X DELETE http://localhost:5000/api/workspace/WORKSPACE_ID/tasks/TASK_ID/comment/COMMENT_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 7. Dashboards

### Get Admin Dashboard

- `GET /admin/dashboard`
- Required global role: `admin`

```bash
curl http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Workspace Dashboard

- `GET /workspace/WORKSPACE_ID/dashboard`

```bash
curl http://localhost:5000/api/workspace/WORKSPACE_ID/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 8. Notifications

### Get Notifications

- `GET /notifications`

```bash
curl http://localhost:5000/api/notifications \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Mark Notification as Read

- `PATCH /notification/NOTIFICATION_ID/read`

```bash
curl -X PATCH http://localhost:5000/api/notification/NOTIFICATION_ID/read \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Mark All Notifications as Read

- `PATCH /notification/read-all`

```bash
curl -X PATCH http://localhost:5000/api/notification/read-all \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 10. Health Check

This endpoint is outside the `/api` prefix and does not require
authentication:

```http
GET http://localhost:5000/health
```

Successful response:

```text
good
```

## 11. Realtime Notifications

The backend exposes Socket.IO on the same origin as the HTTP server. The
connection must include a JWT in the `auth.token`, `token` header, or query
parameter.

```js
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  auth: { token: YOUR_JWT_TOKEN },
});

socket.on("connect", () => {
  console.log("Connected", socket.id);
});
```

Authenticated clients join a user-specific room. The server is intended to
emit notification events as `new notification`; clients should handle that
event and refresh notification state when received.

## 12. Frontend Integration Checklist

- Use the `/api` base URL for all REST requests and `/health` only for health
  checks.
- Send `Authorization: Bearer <token>` when storing the token in application
  state, or use cookie credentials when relying on the `token` cookie.
- Use `multipart/form-data` for registration when uploading `image`; only
  image MIME types are accepted.
- Verify the email OTP before attempting login.
- Store IDs returned by workspace, task, comment, and notification responses
  for subsequent route parameters.
- Treat `401` as an authentication failure and `403` as an authorization
  failure; display validation `errors` field-by-field for `400` responses.

## 13. Common HTTP Statuses

| Status | Meaning |
|---|---|
| `400 Bad Request` | Invalid input or workspace access denied |
| `401 Unauthorized` | Authentication is missing or invalid |
| `403 Forbidden` | Authenticated user role is not allowed |
| `404 Not Found` | Resource does not exist |
| `409 Conflict` | Request conflicts with existing data |
| `500 Internal Server Error` | Unexpected server or database error |

## Notes

- The registration and login endpoints set the JWT in the `token` cookie.
- Profile images are uploaded to Cloudinary under the `user_profiles` folder.
- Multer keeps uploaded images in memory before sending them to Cloudinary.
- Activity logs and notifications are created by several workspace actions.
- CORS is configured for Socket.IO with a wildcard origin; configure a
  restricted origin before deploying to production.
