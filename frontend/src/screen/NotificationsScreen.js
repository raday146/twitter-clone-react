import React, { useEffect } from "react";
import Heading from "../components/Heading";
import { ListGroup } from "react-bootstrap";
import { useQuery } from "react-query";
import NotificationItem from "../components/NotificationItem";
import Spinner from "../components/Spinner";
import { getNotifications } from "../utils/apiClient";
import { useAuthUser } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const { currentUser } = useAuthUser();
  const {
    data: notifications,
    isLoading,
    isSuccess,
  } = useQuery(["Notifications", currentUser.token], getNotifications);

  useEffect(() => {
    if (!currentUser || !currentUser.token) {
      navigate("/login");
    }
  }, [currentUser, navigate]);
  if (isLoading) return <Spinner />;
  console.log(notifications);
  return (
    <>
      <Heading title="Notifications" btnProfile backButton />
      <ListGroup variant="flush">
        {isSuccess && notifications ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
            />
          ))
        ) : (
          <div className="message font-weight-bold">No notifications yet</div>
        )}
      </ListGroup>
    </>
  );
}
