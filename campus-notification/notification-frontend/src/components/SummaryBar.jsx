import DoneAllIcon from "@mui/icons-material/DoneAll";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Paper, Stack, Typography } from "@mui/material";

function Stat({ icon, label, value }) {
  return (
    <Stack
      alignItems="center"
      direction="row"
      spacing={1.25}
      sx={{
        minWidth: 0,
        px: 2,
        py: 1.5
      }}
    >
      {icon}
      <Stack sx={{ minWidth: 0 }}>
        <Typography color="text.secondary" variant="caption">
          {label}
        </Typography>
        <Typography variant="h6">{value}</Typography>
      </Stack>
    </Stack>
  );
}

export default function SummaryBar({ total, viewed }) {
  const newCount = Math.max(total - viewed, 0);

  return (
    <Paper
      variant="outlined"
      sx={{
        display: "grid",
        gap: 0,
        gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
        overflow: "hidden"
      }}
    >
      <Stat icon={<NotificationsActiveIcon color="primary" />} label="Total" value={total} />
      <Stat icon={<FiberManualRecordIcon color="primary" />} label="New" value={newCount} />
      <Stat icon={<DoneAllIcon color="success" />} label="Viewed" value={viewed} />
    </Paper>
  );
}
