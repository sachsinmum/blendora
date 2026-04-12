import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { notificationService } from '../services/api';
import { Colors, Spacing } from '../theme/theme';

const NotificationBox = () => {
  const [notification, setNotification] = useState<any>(null);
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await notificationService.getNotifications(1); // User 1
        if (response.data.length > 0) {
          const latest = response.data[0];
          // Simple logic: if timestamp is brand new (within 10s)
          if (Date.now() - latest.timestamp < 10000) {
            setNotification(latest);
            showNotification();
          }
        }
      } catch (error) {
        console.error('Notification error', error);
      }
    }, 5000); // Poll every 5s

    return () => clearInterval(interval);
  }, []);

  const showNotification = () => {
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.delay(4000),
      Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start(() => setNotification(null));
  };

  if (!notification) return null;

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Text style={styles.title}>{notification.title} 🔔</Text>
      <Text style={styles.message}>{notification.message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: Colors.secondary,
    padding: Spacing.m,
    borderRadius: 12,
    elevation: 10,
    zIndex: 999,
  },
  title: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    color: Colors.white,
    fontSize: 14,
    marginTop: 4,
    opacity: 0.9,
  },
});

export default NotificationBox;
