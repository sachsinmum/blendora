import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Animated } from 'react-native';
import { Colors, Spacing } from '../theme/theme';
import { orderService } from '../services/api';

const STATUS_STEPS = [
  { id: 'ORDER_PLACED', label: 'Order Confirmed', icon: '📝' },
  { id: 'LEG1_ASSIGNED', label: 'Assigning Courier', icon: '🛵' },
  { id: 'LEG1_PICKED_UP', label: 'Grains Picked Up', icon: '📦' },
  { id: 'AT_CHAKKI', label: 'Arrived at Chakki', icon: '🏬' },
  { id: 'GRINDING', label: 'Fresh Grinding', icon: '⚙️' },
  { id: 'READY_FOR_DELIVERY', label: 'Quality Verified', icon: '✅' },
  { id: 'LEG2_ASSIGNED', label: 'Final Leg Assigned', icon: '🚚' },
  { id: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: '🏁' },
  { id: 'DELIVERED', label: 'Delivered Fresh', icon: '🏠' }
];

const OrderTrackingScreen = ({ route }: any) => {
  const { orderId } = route.params || { orderId: 1 };
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 10000); 
    return () => clearInterval(interval);
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await orderService.getOrder(orderId);
      setOrder(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.centered}><ActivityIndicator size="large" color={Colors.primary} /></View>;
  if (!order) return <View style={styles.centered}><Text style={styles.errorText}>Searching for your order...</Text></View>;

  const currentStatusIndex = STATUS_STEPS.findIndex(s => s.id === order.status);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.statusCard}>
        <View style={styles.orderLabelRow}>
          <Text style={styles.orderNumber}>ORDER #{order.id}</Text>
          <View style={styles.liveBadge}>
            <View style={styles.pulse} />
            <Text style={styles.liveText}>LIVE UPDATES</Text>
          </View>
        </View>
        <Text style={styles.currentStatusText}>{STATUS_STEPS[currentStatusIndex]?.label}</Text>
        <Text style={styles.etaText}>Freshness arrival soon</Text>
      </View>

      {order.videoUrl && (
        <TouchableOpacity activeOpacity={0.9} style={styles.trustLockCard}>
          <View style={styles.videoHeader}>
            <Text style={styles.trustTitle}>🔒 Trust-Lock Proof</Text>
            <Text style={styles.trustSub}>Verified by Master Chakki</Text>
          </View>
          <View style={styles.videoMock}>
            <Text style={styles.playIcon}>▶</Text>
            <Text style={styles.playText}>Watch Grinding Video</Text>
          </View>
        </TouchableOpacity>
      )}

      <View style={styles.timelineSection}>
        <Text style={styles.timelineTitle}>Journey Timeline</Text>
        {STATUS_STEPS.map((step, index) => {
          const isCompleted = index < currentStatusIndex;
          const isCurrent = index === currentStatusIndex;
          const isLast = index === STATUS_STEPS.length - 1;

          return (
            <View key={step.id} style={styles.timelineRow}>
              <View style={styles.indicatorCol}>
                <View style={[styles.dot, isCompleted && styles.dotCompleted, isCurrent && styles.dotCurrent]}>
                  {isCompleted && <Text style={styles.checkIcon}>✓</Text>}
                </View>
                {!isLast && <View style={[styles.line, isCompleted && styles.lineCompleted]} />}
              </View>
              <View style={styles.textCol}>
                <Text style={[styles.stepLabel, isCurrent && styles.stepLabelCurrent, !isCompleted && !isCurrent && styles.stepLabelPending]}>
                  {step.icon} {step.label}
                </Text>
                {isCurrent && <Text style={styles.timeLabel}>In progress...</Text>}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { padding: Spacing.m },
  statusCard: { backgroundColor: Colors.primary, padding: Spacing.xl, borderRadius: 24, marginBottom: Spacing.m, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 10 },
  orderLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  orderNumber: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 'bold' },
  liveBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  pulse: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#4ADE80', marginRight: 6 },
  liveText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  currentStatusText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  etaText: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 4 },
  trustLockCard: { backgroundColor: Colors.white, borderRadius: 20, padding: Spacing.m, marginBottom: Spacing.l, borderWidth: 1, borderColor: '#EEE' },
  videoHeader: { marginBottom: 12 },
  trustTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.text },
  trustSub: { fontSize: 12, color: Colors.textSecondary },
  videoMock: { width: '100%', height: 180, backgroundColor: '#1A1A1A', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  playIcon: { fontSize: 40, color: '#FFF' },
  playText: { color: '#FFF', fontWeight: 'bold', marginTop: 8 },
  timelineSection: { paddingHorizontal: Spacing.m },
  timelineTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text, marginBottom: Spacing.l },
  timelineRow: { flexDirection: 'row', height: 70 },
  indicatorCol: { width: 30, alignItems: 'center' },
  dot: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  dotCompleted: { backgroundColor: Colors.success },
  dotCurrent: { backgroundColor: Colors.primary, borderWidth: 3, borderColor: '#FFF', elevation: 4 },
  checkIcon: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  line: { width: 3, flex: 1, backgroundColor: '#E5E7EB', marginVertical: -2 },
  lineCompleted: { backgroundColor: Colors.success },
  textCol: { flex: 1, marginLeft: 16, paddingTop: 2 },
  stepLabel: { fontSize: 15, fontWeight: '600', color: Colors.text },
  stepLabelCurrent: { color: Colors.primary, fontSize: 16, fontWeight: '700' },
  stepLabelPending: { color: '#9CA3AF' },
  timeLabel: { fontSize: 12, color: Colors.primary, marginTop: 2, fontWeight: '600' },
  errorText: { color: Colors.textSecondary, fontSize: 16 }
});

export default OrderTrackingScreen;
