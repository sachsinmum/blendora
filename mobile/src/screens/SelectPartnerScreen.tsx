import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, ScrollView, Switch } from 'react-native';
import { Colors, Spacing } from '../theme/theme';
import { partnerService, orderService, subscriptionService } from '../services/api';

const SelectPartnerScreen = ({ navigation, route }: any) => {
  const { mixItems } = route.params || { mixItems: [] };
  const [wholesalers, setWholesalers] = useState<any[]>([]);
  const [chakkis, setChakkis] = useState<any[]>([]);
  const [selectedWholesaler, setSelectedWholesaler] = useState<any>(null);
  const [selectedChakki, setSelectedChakki] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [isSubscription, setIsSubscription] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const wRes = await partnerService.getPartners('WHOLESALER');
      const cRes = await partnerService.getPartners('CHAKKI');
      setWholesalers(wRes.data);
      setChakkis(cRes.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch partners');
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedWholesaler || !selectedChakki) {
      Alert.alert('Error', 'Please select both a Wholesaler and a Chakki');
      return;
    }
    setPlacing(true);
    try {
      const payload = {
        customerId: 1, // Mock current user
        sourcePartnerId: selectedWholesaler.id,
        chakkiPartnerId: selectedChakki.id,
        mixItems: mixItems.map((item: any) => ({
          ingredientId: item.id,
          quantityKg: parseFloat(item.quantity)
        }))
      };
      const response = await orderService.placeOrder(payload);
      
      if (isSubscription) {
        await subscriptionService.create({
          userId: 1,
          name: "My Custom Mix",
          mixDetailsJson: JSON.stringify(mixItems),
          sourcePartnerId: selectedWholesaler.id,
          chakkiPartnerId: selectedChakki.id,
          frequency: 'MONTHLY'
        });
        Alert.alert('Success', 'Order placed and Monthly Subscription activated!');
      } else {
        Alert.alert('Order Placed!', 'Your custom mix order has been created.');
      }
      navigation.navigate('OrderTracking', { orderId: response.data.id });
    } catch (error) {
      Alert.alert('Error', 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  if (loading) return <View style={styles.centered}><ActivityIndicator size="large" color={Colors.primary} /></View>;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionTitle}>1. Select Grain Source (Wholesaler)</Text>
        {wholesalers.map(w => (
          <TouchableOpacity 
            key={w.id} 
            style={[styles.partnerCard, selectedWholesaler?.id === w.id && styles.selectedCard]}
            onPress={() => setSelectedWholesaler(w)}
          >
            <Text style={styles.partnerName}>{w.name}</Text>
            <Text style={styles.partnerAddr}>{w.address}</Text>
          </TouchableOpacity>
        ))}

        <Text style={[styles.sectionTitle, { marginTop: Spacing.l }]}>2. Select Processing Unit (Chakki)</Text>
        {chakkis.map(c => (
          <TouchableOpacity 
            key={c.id} 
            style={[styles.partnerCard, selectedChakki?.id === c.id && styles.selectedCard]}
            onPress={() => setSelectedChakki(c)}
          >
            <View style={styles.row}>
              <Text style={styles.partnerName}>{c.name}</Text>
              <Text style={styles.rating}>⭐ {c.rating || 'N/A'}</Text>
            </View>
            <Text style={styles.partnerAddr}>{c.address}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.subContainer}>
          <View style={styles.subInfo}>
            <Text style={styles.subTitle}>Save as Monthly Subscription</Text>
            <Text style={styles.subDesc}>Auto-refills with Trust-Lock proof</Text>
          </View>
          <Switch 
            value={isSubscription}
            onValueChange={setIsSubscription}
            trackColor={{ false: "#ccc", true: Colors.accent }}
          />
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={[styles.placeBtn, (!selectedWholesaler || !selectedChakki) && styles.disabledBtn]}
        onPress={handlePlaceOrder}
        disabled={placing}
      >
        {placing ? <ActivityIndicator color="#fff" /> : <Text style={styles.placeBtnText}>Place Order Now</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: Spacing.m },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: Spacing.s, color: Colors.text },
  partnerCard: { backgroundColor: Colors.white, padding: Spacing.m, borderRadius: 8, marginBottom: Spacing.s, borderWidth: 1, borderColor: '#eee' },
  selectedCard: { borderColor: Colors.primary, backgroundColor: '#FFF8F0' },
  partnerName: { fontSize: 16, fontWeight: '600', color: Colors.text },
  partnerAddr: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  rating: { fontSize: 14, color: Colors.accent, fontWeight: 'bold' },
  placeBtn: { backgroundColor: Colors.primary, padding: Spacing.m, borderRadius: 8, alignItems: 'center', marginTop: Spacing.m },
  disabledBtn: { backgroundColor: Colors.grey },
  placeBtnText: { color: Colors.white, fontWeight: 'bold', fontSize: 16 },
  subContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#F0F9FF', 
    padding: Spacing.m, 
    borderRadius: 12, 
    marginTop: Spacing.l,
    borderWidth: 1,
    borderColor: '#BAE6FD'
  },
  subInfo: { flex: 1 },
  subTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.text },
  subDesc: { fontSize: 12, color: Colors.textSecondary }
});

export default SelectPartnerScreen;
