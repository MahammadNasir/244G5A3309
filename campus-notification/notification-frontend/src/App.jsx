import DoneAllIcon from "@mui/icons-material/DoneAll";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FilterListIcon from "@mui/icons-material/FilterList";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import RefreshIcon from "@mui/icons-material/Refresh";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import NotificationList from "./components/NotificationList";
import SummaryBar from "./components/SummaryBar";
import { getId, getNotificationTypes, getType, sortByPriority } from "./utils/notificationUtils";
import { useNotifications } from "./hooks/useNotifications";

const routes = {
  all: "/",
  priority: "/priority"
};

function getRouteValue() {
  return window.location.pathname === routes.priority ? routes.priority : routes.all;
}

export default function App() {
  const { error, loading, markAllViewed, markViewed, notifications, refresh, resetViewed, viewedSet } =
    useNotifications();
  const [route, setRoute] = useState(getRouteValue);
  const [typeFilter, setTypeFilter] = useState("All");
  const [topN, setTopN] = useState(10);

  useEffect(() => {
    const onPopState = () => setRoute(getRouteValue());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const types = useMemo(() => getNotificationTypes(notifications), [notifications]);
  const viewedCount = notifications.filter((notification, index) => viewedSet.has(getId(notification, index))).length;

  const priorityNotifications = useMemo(() => {
    const filtered =
      typeFilter === "All" ? notifications : notifications.filter((notification) => getType(notification) === typeFilter);

    return sortByPriority(filtered).slice(0, topN);
  }, [notifications, topN, typeFilter]);

  const pageNotifications = route === routes.priority ? priorityNotifications : notifications;

  function changeRoute(nextRoute) {
    window.history.pushState({}, "", nextRoute);
    setRoute(nextRoute);
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar color="inherit" elevation={0} position="sticky" sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Toolbar sx={{ gap: 2 }}>
          <NotificationsIcon color="primary" />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography noWrap variant="h6">
              Campus Notifications
            </Typography>
            <Typography color="text.secondary" noWrap variant="body2">
              Sorted campus alerts with persistent viewed state
            </Typography>
          </Box>
          <Tooltip title="Refresh notifications">
            <IconButton aria-label="Refresh notifications" onClick={refresh}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Stack spacing={2.5}>
          <Paper variant="outlined" sx={{ px: { xs: 1, sm: 2 }, py: 1 }}>
            <Tabs
              onChange={(_, value) => changeRoute(value)}
              value={route}
              variant="fullWidth"
              sx={{ minHeight: 44 }}
            >
              <Tab icon={<NotificationsIcon />} iconPosition="start" label="All Notifications" value={routes.all} />
              <Tab icon={<PriorityHighIcon />} iconPosition="start" label="Priority" value={routes.priority} />
            </Tabs>
          </Paper>

          <SummaryBar total={notifications.length} viewed={viewedCount} />

          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={1.5}>
            <Box>
              <Typography variant="h4">
                {route === routes.priority ? "Priority Notifications" : "All Notifications"}
              </Typography>
              <Typography color="text.secondary" variant="body1">
                {route === routes.priority
                  ? "Limit the highest priority notices and filter them by type."
                  : "Review every notification and mark items as viewed."}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              <Button startIcon={<DoneAllIcon />} onClick={markAllViewed} variant="contained">
                Mark all viewed
              </Button>
              <Button startIcon={<RestartAltIcon />} onClick={resetViewed} variant="outlined">
                Reset
              </Button>
            </Stack>
          </Stack>

          {route === routes.priority && (
            <Paper variant="outlined" sx={{ p: { xs: 2, md: 2.5 } }}>
              <Stack alignItems={{ xs: "stretch", md: "center" }} direction={{ xs: "column", md: "row" }} spacing={2.5}>
                <Stack alignItems="center" direction="row" spacing={1} sx={{ minWidth: 170 }}>
                  <FilterListIcon color="primary" />
                  <Typography variant="h6">Priority controls</Typography>
                </Stack>

                <FormControl size="small" sx={{ minWidth: { xs: "100%", md: 190 } }}>
                  <InputLabel id="type-filter-label">Type</InputLabel>
                  <Select
                    label="Type"
                    labelId="type-filter-label"
                    onChange={(event) => setTypeFilter(event.target.value)}
                    value={typeFilter}
                  >
                    <MenuItem value="All">All types</MenuItem>
                    {types.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ flex: 1, minWidth: { xs: "100%", md: 260 } }}>
                  <Typography gutterBottom variant="body2">
                    Top notifications: {topN}
                  </Typography>
                  <Slider
                    aria-label="Top notifications"
                    marks
                    max={Math.max(10, notifications.length)}
                    min={1}
                    onChange={(_, value) => setTopN(value)}
                    value={topN}
                    valueLabelDisplay="auto"
                  />
                </Box>
              </Stack>
            </Paper>
          )}

          {error && (
            <Alert icon={<ErrorOutlineIcon />} severity="error">
              {error}
            </Alert>
          )}

          <NotificationList
            emptyText="No notifications match the current view."
            loading={loading}
            notifications={pageNotifications}
            onViewed={markViewed}
            viewedSet={viewedSet}
          />
        </Stack>
      </Container>
    </Box>
  );
}
