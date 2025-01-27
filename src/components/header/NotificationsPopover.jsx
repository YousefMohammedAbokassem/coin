"use client";

import { useEffect, useState } from "react";
// @mui
import {
  Box,
  List,
  Badge,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemButton,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import Iconify from "../iconify";
// import { fToNow } from "@/utils/formatTime";
// import getNotifications from "@/lib/getNotifications";
import { useSession } from "next-auth/react";
import axios from "axios";

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const session = useSession();
  const [notifications, setNotifications] = useState([]);

  const totalUnRead = notifications.filter(
    (item) => item.is_read === false
  ).length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        is_read: false,
      }))
    );
  };
  // const getNotification = async () => {
  //   const res = await getNotifications(session?.data?.user?.token);
  //   const data = await res.notifications;
  //   setNotifications(data);

    
  // };


  useEffect(() => {
    if (session?.data?.user?.token) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}user/notifications`, {
        headers: {
          Authorization: `Bearer ${session?.data?.user?.token}`,
        }
      })
      .then(res => {
      })
      .catch(error => {
        console.log(error)
      })

    }
  }, []);


  return (
    <>
      <Badge badgeContent={totalUnRead} color="error">
        <NotificationsNoneIcon onClick={handleOpen} />
      </Badge>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                {/* <Iconify icon="eva:done-all-fill" /> */}
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        {/* <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}> */}
        <List
          disablePadding
          subheader={
            <ListSubheader
              disableSticky
              sx={{ py: 1, px: 2.5, typography: "overline" }}
            >
              New
            </ListSubheader>
          }
        >
          {notifications.map((notification, index) => (
            <NotificationItem key={index} notification={notification} />
          ))}
        </List>
        {/* </Scrollbar> */}

        <Divider sx={{ borderStyle: "dashed" }} />
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(!notification.is_read && {
          bgcolor: "action.selected",
        }),
      }}
    >
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            {/* <Iconify
              icon="eva:clock-outline"
              sx={{ mr: 0.5, width: 16, height: 16 }}
            /> */}
            {notification.time}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2" className="flex flex-col">
      {notification.title}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        {/* &nbsp; {noCase(notification.body)} */}
      </Typography>
    </Typography>
  );

  return {
    title,
  };
}
