import axios from "axios";

const API_URL =
  import.meta.env.VITE_NOTIFICATION_API_URL ||
  "/api/notifications";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyNDRnNWEzMzA5QHNyaXQuYWMuaW4iLCJleHAiOjE3ODAxMjMzOTgsImlhdCI6MTc4MDEyMjQ5OCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImRiNjQ1NmY1LThjYWMtNDA0ZC05NTA1LWNkZTQ3MWUxYWRjMCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNoYWlrIG1haGFtbWFkIG5hc2lyIiwic3ViIjoiNDI1NjI1ZjUtZjYyNy00OGE4LTliZDItYmUyMTQ3NDk5MDhiIn0sImVtYWlsIjoiMjQ0ZzVhMzMwOUBzcml0LmFjLmluIiwibmFtZSI6InNoYWlrIG1haGFtbWFkIG5hc2lyIiwicm9sbE5vIjoiMjQ0ZzVhMzMwOSIsImFjY2Vzc0NvZGUiOiJTZGtqSkciLCJjbGllbnRJRCI6IjQyNTYyNWY1LWY2MjctNDhhOC05YmQyLWJlMjE0NzQ5OTA4YiIsImNsaWVudFNlY3JldCI6IkdyVlFZY2FhRkVkVmtDQ1gifQ.jU4AdlegUclrK1j7KI4m2guRN3BxEU70Hj0dP6ZvATY";

export async function fetchNotifications() {
  if (!TOKEN) {
    throw new Error("Missing VITE_NOTIFICATION_TOKEN in notification-frontend/.env");
  }

  const authorization = TOKEN.startsWith("Bearer ") ? TOKEN : `Bearer ${TOKEN}`;

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: authorization
    },
    timeout: 12000
  });

  const notifications = response.data?.notifications;

  if (!Array.isArray(notifications)) {
    throw new Error("API response did not include a notifications array");
  }

  return notifications;
}
