import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors, Spacing } from '../theme/theme';

const HomeScreen = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Freshly Ground{"\n"}At Your Doorstep</Text>
          <Text style={styles.heroSub}>Choose your grains. We'll grind them fresh.</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>TRUST-LOCK VERIFIED</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Start Your Mix</Text>
        
        <TouchableOpacity 
          style={styles.mainCard}
          onPress={() => navigation.navigate('MixBuilder')}
        >
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Custom Grain Mix</Text>
            <Text style={styles.cardDesc}>Wheat, Bajra, Chana & more</Text>
          </View>
          <View style={styles.cardIcon}>
            <Text style={styles.iconText}>🌾</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.mainCard, { marginTop: Spacing.m, borderColor: Colors.accent }]}
          onPress={() => navigation.navigate('Subscriptions')}
        >
          <View style={styles.cardInfo}>
            <Text style={[styles.cardTitle, { color: Colors.accent }]}>Active Subscriptions</Text>
            <Text style={styles.cardDesc}>Automated monthly refills</Text>
          </View>
          <View style={[styles.cardIcon, { backgroundColor: '#F0F9FF' }]}>
            <Text style={styles.iconText}>♻️</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Blendora?</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.features}>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>🎥</Text>
            <Text style={styles.featureTitle}>Video Proof</Text>
            <Text style={styles.featureDesc}>Watch your grains being ground.</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>📍</Text>
            <Text style={styles.featureTitle}>Hyperlocal</Text>
            <Text style={styles.featureDesc}>From your neighborhood Chakki.</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>🏺</Text>
            <Text style={styles.featureTitle}>Zero Inventory</Text>
            <Text style={styles.featureDesc}>Always fresh. Never stored.</Text>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF9' },
  hero: { 
    backgroundColor: Colors.primary, 
    padding: Spacing.xl, 
    paddingTop: 40,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroContent: { marginBottom: Spacing.l },
  heroTitle: { fontSize: 32, fontWeight: 'bold', color: Colors.white, lineHeight: 40 },
  heroSub: { fontSize: 16, color: Colors.white, opacity: 0.8, marginTop: 8 },
  badge: { 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    alignSelf: 'flex-start', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)'
  },
  badgeText: { color: Colors.white, fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  section: { padding: Spacing.l },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: Spacing.m, color: Colors.text },
  mainCard: { 
    backgroundColor: Colors.white, 
    borderRadius: 20, 
    padding: Spacing.l, 
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F2F2F2'
  },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.text },
  cardDesc: { fontSize: 14, color: Colors.textSecondary, marginTop: 4 },
  cardIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#FDF2F2', justifyContent: 'center', alignItems: 'center' },
  iconText: { fontSize: 28 },
  features: { flexDirection: 'row' },
  featureItem: { 
    backgroundColor: Colors.white, 
    width: 150, 
    padding: Spacing.m, 
    borderRadius: 16, 
    marginRight: Spacing.m,
    borderWidth: 1,
    borderColor: '#F2F2F2'
  },
  featureEmoji: { fontSize: 32, marginBottom: 8 },
  featureTitle: { fontSize: 14, fontWeight: 'bold', color: Colors.text },
  featureDesc: { fontSize: 12, color: Colors.textSecondary, marginTop: 4 }
});

export default HomeScreen;
