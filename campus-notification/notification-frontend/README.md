# Campus Notification Frontend

Responsive React frontend for the campus notification API.

## Setup

```bash
cd notification-frontend
npm install
```

Create `.env` from `.env.example` and add the API token:

```bash
VITE_NOTIFICATION_TOKEN=your_token_here
```

Run only on `http://localhost:3000`:

```bash
npm run dev
```

## Pages

- `/` - all notifications with viewed/new state
- `/priority` - priority notifications with top-N limit and type filter
