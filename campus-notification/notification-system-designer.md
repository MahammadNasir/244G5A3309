# Campus Notifications Microservice - Stage 1

## Overview

This project implements the Stage 1 requirements of the Campus Notifications Microservice assessment.

The objective is to fetch notifications from the provided API and display the top 10 most important unread notifications based on:

1. Notification Type Priority
2. Notification Recency

## Priority Rules

Notifications are prioritized according to the following weights:

| Notification Type | Priority Weight |
| ----------------- | --------------- |
| Placement         | 3               |
| Result            | 2               |
| Event             | 1               |

If two notifications have the same type, the most recent notification (latest timestamp) is given higher priority.

## Technology Stack

* JavaScript (Node.js)
* Axios

## Project Structure

```text
stage1/
│
├── index.js
├── package.json
├── package-lock.json
├── README.md
├── Notification_System_Design.md
└── screenshots/
```

## Installation

Clone the repository and install dependencies.

```bash
npm install
```

or

```bash
npm install axios
```

## Running the Application

Execute the following command:

```bash
node index.js
```

## API Details

Method:

```http
GET /evaluation-service/notifications
```

Headers:

```http
Authorization: Bearer <token>
```

## Approach

### Step 1

Fetch notifications from the provided API using Axios.

### Step 2

Assign priority weights based on notification type.

```javascript
const priorityWeight = {
    Placement: 3,
    Result: 2,
    Event: 1
};
```

### Step 3

Sort notifications by:

1. Priority Weight (Descending)
2. Timestamp (Descending)

### Step 4

Select the first 5 notifications after sorting.

```javascript
notifications
    .sort(...)
    .slice(0, 10);
```

## Sample Output

```text
Top 5 Priority Notifications

1. [Placement] Google Hiring
2. [Placement] Microsoft Hiring
3. [Placement] Amazon Hiring
4. [Result] Mid Sem Results
5. [Result] External Examination Results
