import axios from "axios";
// const axios = require("axios");

async function getNotifications() {
    const response = await axios.get(
        "http://4.224.186.213/evaluation-service/notifications",
        {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyNDRnNWEzMzA5QHNyaXQuYWMuaW4iLCJleHAiOjE3ODAxMjMzOTgsImlhdCI6MTc4MDEyMjQ5OCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImRiNjQ1NmY1LThjYWMtNDA0ZC05NTA1LWNkZTQ3MWUxYWRjMCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNoYWlrIG1haGFtbWFkIG5hc2lyIiwic3ViIjoiNDI1NjI1ZjUtZjYyNy00OGE4LTliZDItYmUyMTQ3NDk5MDhiIn0sImVtYWlsIjoiMjQ0ZzVhMzMwOUBzcml0LmFjLmluIiwibmFtZSI6InNoYWlrIG1haGFtbWFkIG5hc2lyIiwicm9sbE5vIjoiMjQ0ZzVhMzMwOSIsImFjY2Vzc0NvZGUiOiJTZGtqSkciLCJjbGllbnRJRCI6IjQyNTYyNWY1LWY2MjctNDhhOC05YmQyLWJlMjE0NzQ5OTA4YiIsImNsaWVudFNlY3JldCI6IkdyVlFZY2FhRkVkVmtDQ1gifQ.jU4AdlegUclrK1j7KI4m2guRN3BxEU70Hj0dP6ZvATY"
            }
        }
    );

    return response.data.notifications;
}
const priorityWeight = {
    Placement: 3,
    Result: 2,
    Event: 1
};
async function getPriorityNotifications(notifications, topN = 10) {
    notifications.sort((a, b) => {
        const weightA = priorityWeight[a.type];
        const weightB = priorityWeight[b.type];

        const priorityDiff = weightB - weightA;

        if (priorityDiff !== 0) {
            return priorityDiff;
        }

        return new Date(b.timestamp) - new Date(a.timestamp);
    });

    return notifications.slice(0, topN);
}
async function main() {
    try {
        const notifications = await getNotifications();

       const top10 = await getPriorityNotifications(
    notifications,
    10
);

        console.log("Top 10 Priority Notifications\n");

        top10.forEach((notification, index) => {
           console.log(
    `${index + 1}. [${notification.type}] ${notification.message}`
);
        });
    } catch (error) {
        console.error(error.message);
    }
}

main();