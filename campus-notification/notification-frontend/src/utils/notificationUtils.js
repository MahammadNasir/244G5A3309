export const priorityWeight = {
  Placement: 3,
  Result: 2,
  Event: 1
};

export function getType(notification) {
  return notification.Type || notification.type || "General";
}

export function getMessage(notification) {
  return notification.Message || notification.message || notification.title || "No message provided";
}

export function getTimestamp(notification) {
  return notification.Timestamp || notification.timestamp || notification.createdAt || "";
}

export function getId(notification, index = 0) {
  return (
    notification.id ||
    notification.ID ||
    notification.notificationId ||
    `${getType(notification)}-${getTimestamp(notification)}-${getMessage(notification)}-${index}`
  );
}

export function formatDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Time unavailable";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

export function sortByPriority(notifications) {
  return [...notifications].sort((a, b) => {
    const weightA = priorityWeight[getType(a)] || 0;
    const weightB = priorityWeight[getType(b)] || 0;
    const priorityDifference = weightB - weightA;

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    return new Date(getTimestamp(b)) - new Date(getTimestamp(a));
  });
}

export function getNotificationTypes(notifications) {
  return Array.from(new Set(notifications.map(getType))).sort();
}
