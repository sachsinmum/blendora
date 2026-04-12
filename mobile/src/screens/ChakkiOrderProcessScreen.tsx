import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { Colors, Spacing } from '../theme/theme';
import { orderService } from '../services/api';

const ChakkiOrderProcessScreen = ({ route, navigation }: any) => {
  const { orderId } = route.params || { orderId: 1 };
  const [step, setStep] = useState(1); // 1: Before Photo, 2: Video, 3: After Photo, 4: Complete
  const [isUploading, setIsUploading] = useState(false);

  const handleCapture = async () => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      if (step === 1 || step === 3) {
        formData.append('file', { uri: 'mock_img.jpg', name: 'photo.jpg', type: 'image/jpeg' } as any);
        formData.append('type', step === 1 ? 'BEFORE' : 'AFTER');
        await orderService.uploadPhoto(orderId, formData);
      } else if (step === 2) {
        formData.append('file', { uri: 'mock_vid.mp4', name: 'video.mp4', type: 'video/mp4' } as any);
        await orderService.uploadVideo(orderId, formData);
      }
      
      setStep(step + 1);
      if (step === 3) {
        Alert.alert('Trust-Lock Complete!', 'All proof has been securely uploaded.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload proof. Try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const getStepTitle = () => {
    switch(step) {
      case 1: return 'Capture Grain (Before)';
      case 2: return 'Record Grinding (Video)';
      case 3: return 'Capture Flour (After)';
      default: return 'Process Complete';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderId}>Order #{orderId}</Text>
        <Text style={styles.stepIndicator}>Step {Math.min(step, 3)} of 3</Text>
      </View>

      <View style={styles.mediaBox}>
        {isUploading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : step > 3 ? (
          <Text style={styles.successIcon}>🔒</Text>
        ) : (
          <Text style={styles.instruction}>{getStepTitle()}</Text>
        )}
      </View>

      {step <= 3 ? (
        <TouchableOpacity 
          style={[styles.actionBtn, isUploading && styles.disabled]} 
          onPress={handleCapture}
          disabled={isUploading}
        >
          <Text style={styles.actionBtnText}>
            {isUploading ? 'Uploading...' : 'Capture & Secure'}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          style={styles.doneBtn} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.doneBtnText}>Back to Dashboard</Text>
        </TouchableOpacity>
      )}

      <View style={styles.progressDots}>
        {[1, 2, 3].map(i => (
          <View key={i} style={[styles.dot, step >= i && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.l, backgroundColor: Colors.background },
  header: { marginBottom: Spacing.xl, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderId: { fontSize: 22, fontWeight: 'bold' },
  stepIndicator: { color: Colors.primary, fontWeight: 'bold' },
  mediaBox: { width: '100%', height: 300, backgroundColor: '#000', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.xl },
  instruction: { color: '#fff', fontSize: 18, fontWeight: '600' },
  successIcon: { fontSize: 64 },
  actionBtn: { backgroundColor: Colors.primary, padding: Spacing.l, borderRadius: 12, alignItems: 'center' },
  disabled: { opacity: 0.6 },
  actionBtnText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' },
  doneBtn: { backgroundColor: Colors.secondary, padding: Spacing.l, borderRadius: 12, alignItems: 'center' },
  doneBtnText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' },
  progressDots: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.xl },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ddd', marginHorizontal: 5 },
  activeDot: { backgroundColor: Colors.primary },
});

export default ChakkiOrderProcessScreen;
