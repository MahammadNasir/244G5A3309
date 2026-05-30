import InboxIcon from "@mui/icons-material/Inbox";
import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";
import NotificationCard from "./NotificationCard";
import { getId } from "../utils/notificationUtils";

export default function NotificationList({ emptyText, loading, notifications, onViewed, viewedSet }) {
  if (loading) {
    return (
      <Box sx={{ display: "grid", minHeight: 260, placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (notifications.length === 0) {
    return (
      <Alert icon={<InboxIcon />} severity="info">
        {emptyText}
      </Alert>
    );
  }

  return (
    <Stack spacing={1.5}>
      {notifications.map((notification, index) => (
        <NotificationCard
          index={index}
          key={getId(notification, index)}
          notification={notification}
          onViewed={onViewed}
          viewed={viewedSet.has(getId(notification, index))}
        />
      ))}
      <Typography color="text.secondary" sx={{ textAlign: "center", pt: 1 }} variant="body2">
        Showing {notifications.length} notification{notifications.length === 1 ? "" : "s"}
      </Typography>
    </Stack>
  );
}
