import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Colors, Spacing } from '../theme/theme';
import { subscriptionService } from '../services/api';

const SubscriptionScreen = ({ navigation }: any) => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await subscriptionService.getUserSubscriptions(1); // User 1
      setSubscriptions(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.subCard}>
      <View style={styles.cardHeader}>
        <View style={styles.headerInfo}>
          <Text style={styles.subName}>{item.name}</Text>
          <Text style={styles.freqTag}>EVERY {item.frequency || 'MONTH'}</Text>
        </View>
        <View style={[styles.statusIndicator, item.active ? styles.activeDot : styles.inactiveDot]} />
      </View>
      
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>NEXT DELIVERY</Text>
          <Text style={styles.detailValue}>{new Date(item.nextRefillDate).toLocaleDateString()}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>TRUST-LOCK</Text>
          <Text style={[styles.detailValue, { color: Colors.success }]}>ACTIVE</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.manageBtn}>
        <Text style={styles.manageBtnText}>Manage Subscription</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Freshness on Autopilot</Text>
        <Text style={styles.heroSub}>Your personalized grain mixes, delivered freshly ground every cycle.</Text>
      </View>

      <View style={styles.listContainer}>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Syncing your grain plans...</Text>
          </View>
        ) : (
          <FlatList
            data={subscriptions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <View style={styles.emptyIcon}>
                  <Text style={styles.emptyEmoji}>♻️</Text>
                </View>
                <Text style={styles.emptyTitle}>No Subscriptions Yet</Text>
                <Text style={styles.emptyDesc}>Save your favorite custom mixes for automated monthly refills.</Text>
                <TouchableOpacity 
                  style={styles.startBtn}
                  onPress={() => navigation.navigate('MixBuilder')}
                >
                  <Text style={styles.startBtnText}>Start Your First Mix</Text>
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  hero: { 
    padding: Spacing.xl, 
    backgroundColor: Colors.white, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F1F3F5',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2
  },
  heroTitle: { fontSize: 28, fontWeight: 'bold', color: Colors.text },
  heroSub: { fontSize: 14, color: Colors.textSecondary, marginTop: 8, lineHeight: 20 },
  listContainer: { flex: 1, marginTop: Spacing.m },
  listContent: { padding: Spacing.m },
  subCard: { 
    backgroundColor: Colors.white, 
    borderRadius: 24, 
    padding: Spacing.xl, 
    marginBottom: Spacing.m,
    borderWidth: 1,
    borderColor: '#F1F3F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  headerInfo: { flex: 1 },
  subName: { fontSize: 20, fontWeight: 'bold', color: Colors.text },
  freqTag: { fontSize: 10, fontWeight: '800', color: Colors.primary, letterSpacing: 1, marginTop: 4 },
  statusIndicator: { width: 10, height: 10, borderRadius: 5 },
  activeDot: { backgroundColor: Colors.success },
  inactiveDot: { backgroundColor: Colors.error },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, padding: 12, backgroundColor: '#F8F9FA', borderRadius: 12 },
  detailItem: { flex: 1 },
  detailLabel: { fontSize: 9, fontWeight: 'bold', color: Colors.textSecondary, letterSpacing: 1 },
  detailValue: { fontSize: 14, fontWeight: '700', color: Colors.text, marginTop: 2 },
  manageBtn: { 
    backgroundColor: '#F1F3F5', 
    paddingVertical: 12, 
    borderRadius: 14, 
    alignItems: 'center' 
  },
  manageBtnText: { fontSize: 14, fontWeight: 'bold', color: Colors.text },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 },
  loadingText: { marginTop: 12, color: Colors.textSecondary, fontWeight: '500' },
  emptyContainer: { alignItems: 'center', marginTop: 80, paddingHorizontal: Spacing.xl },
  emptyIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#F1F3F5', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  emptyEmoji: { fontSize: 40 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.text },
  emptyDesc: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', marginTop: 8, marginBottom: 28 },
  startBtn: { backgroundColor: Colors.primary, paddingHorizontal: 32, paddingVertical: 16, borderRadius: 16, elevation: 4 },
  startBtnText: { color: Colors.white, fontWeight: 'bold', fontSize: 16 }
});

export default SubscriptionScreen;
