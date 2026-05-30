import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchNotifications } from "../api/notifications";
import { getId } from "../utils/notificationUtils";

const VIEWED_STORAGE_KEY = "campus-notification-viewed-ids";

function readViewedIds() {
  try {
    return JSON.parse(localStorage.getItem(VIEWED_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [viewedIds, setViewedIds] = useState(readViewedIds);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchNotifications();
      setNotifications(data);
    } catch (err) {
      setError(err.response?.status === 401 ? "Unauthorized request. Check your API token." : err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  useEffect(() => {
    localStorage.setItem(VIEWED_STORAGE_KEY, JSON.stringify(viewedIds));
  }, [viewedIds]);

  const viewedSet = useMemo(() => new Set(viewedIds), [viewedIds]);

  const markViewed = useCallback((notification, index) => {
    const id = getId(notification, index);
    setViewedIds((current) => (current.includes(id) ? current : [...current, id]));
  }, []);

  const markAllViewed = useCallback(() => {
    setViewedIds(notifications.map((notification, index) => getId(notification, index)));
  }, [notifications]);

  const resetViewed = useCallback(() => {
    setViewedIds([]);
  }, []);

  return {
    error,
    loading,
    markAllViewed,
    markViewed,
    notifications,
    refresh: loadNotifications,
    resetViewed,
    viewedSet
  };
}
