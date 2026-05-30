import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import { formatDate, getMessage, getTimestamp, getType, priorityWeight } from "../utils/notificationUtils";

const typeColors = {
  Placement: "success",
  Result: "secondary",
  Event: "info"
};

export default function NotificationCard({ index, notification, onViewed, viewed }) {
  const type = getType(notification);
  const isPriority = (priorityWeight[type] || 0) >= 2;

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: viewed ? "divider" : "primary.main",
        borderLeft: 5,
        bgcolor: viewed ? "background.paper" : "#f0faf6"
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 2.5 }, "&:last-child": { pb: { xs: 2, sm: 2.5 } } }}>
        <Stack spacing={1.5}>
          <Stack
            alignItems={{ xs: "flex-start", sm: "center" }}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            spacing={1.25}
          >
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
              <Chip color={typeColors[type] || "default"} label={type} size="small" />
              {!viewed && <Chip color="primary" icon={<FiberManualRecordIcon />} label="New" size="small" />}
              {viewed && <Chip icon={<CheckCircleIcon />} label="Viewed" size="small" variant="outlined" />}
              {isPriority && <Chip color="warning" icon={<PriorityHighIcon />} label="Priority" size="small" />}
            </Stack>

            <Stack alignItems="center" direction="row" spacing={0.75}>
              <AccessTimeIcon color="action" fontSize="small" />
              <Typography color="text.secondary" variant="body2">
                {formatDate(getTimestamp(notification))}
              </Typography>
            </Stack>
          </Stack>

          <Typography color="text.primary" variant="h6">
            {getMessage(notification)}
          </Typography>

          <Box>
            <Tooltip title={viewed ? "This notification is already marked viewed" : "Mark this notification as viewed"}>
              <span>
                <Button disabled={viewed} onClick={() => onViewed(notification, index)} size="small" variant="contained">
                  Mark viewed
                </Button>
              </span>
            </Tooltip>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
