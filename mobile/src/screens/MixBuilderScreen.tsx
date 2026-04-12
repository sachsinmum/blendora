import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Alert, Animated } from 'react-native';
import { Colors, Spacing } from '../theme/theme';
import { mixService } from '../services/api';

const MixBuilderScreen = ({ navigation }: any) => {
  const [availableGrains, setAvailableGrains] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [estimation, setEstimation] = useState<any>(null);

  useEffect(() => {
    fetchGrains();
  }, []);

  const fetchGrains = async () => {
    try {
      const response = await mixService.getIngredients();
      setAvailableGrains(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch grains. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const toggleGrain = (grain: any) => {
    const exists = selectedItems.find((i: any) => i.id === grain.id);
    if (exists) {
      const newItems = selectedItems.filter((i: any) => i.id !== grain.id);
      setSelectedItems(newItems);
      if (newItems.length > 0) handleCalculate(newItems);
      else setEstimation(null);
    } else {
      const newItems = [...selectedItems, { ...grain, quantity: '1' }];
      setSelectedItems(newItems);
      handleCalculate(newItems);
    }
  };

  const updateQuantity = (id: string, qty: string) => {
    const newItems = selectedItems.map((i: any) => i.id === id ? { ...i, quantity: qty } : i);
    setSelectedItems(newItems);
    // Debounce this in production
    handleCalculate(newItems);
  };

  const handleCalculate = async (currentItems: any[]) => {
    if (currentItems.length === 0) return;
    setCalculating(true);
    try {
      const payload = currentItems.map(item => ({
        ingredientId: item.id,
        quantityKg: parseFloat(item.quantity) || 0
      }));
      const response = await mixService.calculate(payload);
      setEstimation(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setCalculating(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading Fresh Grains...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Craft Your Mix</Text>
        <Text style={styles.subtitle}>Select the grains and ratios for your personalized atta.</Text>
      </View>
      
      <FlatList
        data={availableGrains}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isSelected = selectedItems.find((i: any) => i.id === item.id);
          return (
            <TouchableOpacity 
              activeOpacity={0.8}
              style={[styles.grainCard, isSelected && styles.selectedCard]}
              onPress={() => toggleGrain(item)}
            >
              <View style={styles.grainMain}>
                <View style={styles.grainIconContainer}>
                  <Text style={styles.grainEmoji}>🌾</Text>
                </View>
                <View style={styles.grainInfo}>
                  <Text style={styles.grainName}>{item.name}</Text>
                  <Text style={styles.grainPrice}>₹{item.pricePerKg}/kg</Text>
                </View>
                {isSelected && (
                  <View style={styles.inputBox}>
                    <TextInput
                      style={styles.qtyInput}
                      keyboardType="numeric"
                      value={isSelected.quantity}
                      onChangeText={(text) => updateQuantity(item.id, text)}
                      placeholder="kg"
                    />
                    <Text style={styles.unitText}>kg</Text>
                  </View>
                )}
              </View>
              {isSelected && (
                <View style={styles.selectionIndicator}>
                  <View style={styles.dot} />
                  <Text style={styles.indicatorText}>Added to Mix</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.stickyFooter}>
        <View style={styles.summaryContainer}>
          <View style={styles.priceCol}>
            <Text style={styles.priceLabel}>ESTIMATED TOTAL</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceCurrency}>₹</Text>
              <Text style={styles.priceAmount}>{estimation ? estimation.totalPrice : '0'}</Text>
              {calculating && <ActivityIndicator size="small" color={Colors.primary} style={{ marginLeft: 10 }} />}
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.nextBtn, selectedItems.length === 0 && styles.btnDisabled]}
            onPress={() => navigation.navigate('SelectPartner', { mixItems: selectedItems })}
            disabled={selectedItems.length === 0}
          >
            <Text style={styles.nextBtnText}>Next: Select Chakki</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, color: Colors.textSecondary, fontWeight: '500' },
  header: { padding: Spacing.l, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  title: { fontSize: 26, fontWeight: 'bold', color: Colors.text },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginTop: 4 },
  listContent: { padding: Spacing.m, paddingBottom: 120 },
  grainCard: { 
    backgroundColor: Colors.white, 
    borderRadius: 16, 
    padding: Spacing.m, 
    marginBottom: Spacing.m,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1
  },
  selectedCard: { borderColor: Colors.primary, backgroundColor: '#FEF2F2' },
  grainMain: { flexDirection: 'row', alignItems: 'center' },
  grainIconContainer: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', marginRight: Spacing.m },
  grainEmoji: { fontSize: 24 },
  grainInfo: { flex: 1 },
  grainName: { fontSize: 16, fontWeight: 'bold', color: Colors.text },
  grainPrice: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: Colors.primary },
  qtyInput: { width: 40, fontSize: 16, fontWeight: 'bold', color: Colors.text, padding: 0, textAlign: 'center' },
  unitText: { fontSize: 12, color: Colors.primary, marginLeft: 4, fontWeight: 'bold' },
  selectionIndicator: { flexDirection: 'row', alignItems: 'center', marginTop: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.primary, marginRight: 6 },
  indicatorText: { fontSize: 11, fontWeight: 'bold', color: Colors.primary, textTransform: 'uppercase' },
  stickyFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: Colors.white, padding: Spacing.l, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  summaryContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceCol: { flex: 1 },
  priceLabel: { fontSize: 10, fontWeight: 'bold', color: Colors.textSecondary, letterSpacing: 1 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 2 },
  priceCurrency: { fontSize: 16, fontWeight: 'bold', color: Colors.text, marginRight: 2 },
  priceAmount: { fontSize: 28, fontWeight: 'bold', color: Colors.text },
  nextBtn: { backgroundColor: Colors.primary, paddingVertical: 14, paddingHorizontal: 24, borderRadius: 14, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 4 },
  btnDisabled: { backgroundColor: '#CBD5E1', shadowOpacity: 0 },
  nextBtnText: { color: Colors.white, fontWeight: 'bold', fontSize: 16 }
});

export default MixBuilderScreen;
