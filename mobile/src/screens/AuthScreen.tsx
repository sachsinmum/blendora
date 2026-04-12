import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Colors, Spacing } from '../theme/theme';
import { authService } from '../services/api';

const AuthScreen = ({ navigation }: any) => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Mobile, 2: OTP
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (mobile.length < 10) {
      Alert.alert('Error', 'Please enter a valid mobile number');
      return;
    }
    setLoading(true);
    try {
      await authService.sendOtp(mobile);
      setStep(2);
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await authService.verifyOtp(mobile, otp);
      const user = response.data;
      Alert.alert('Success', `Welcome back, ${user.name}!`);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', 'Invalid OTP. Try 123456');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Blendora</Text>
        <Text style={styles.tagline}>The future of fresh flour.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          {step === 1 ? 'Enter Mobile Number' : 'Enter OTP Sent to ' + mobile}
        </Text>
        
        <TextInput
          style={styles.input}
          placeholder={step === 1 ? '987xxxxxxx' : '123456'}
          keyboardType="phone-pad"
          value={step === 1 ? mobile : otp}
          onChangeText={step === 1 ? setMobile : setOtp}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={step === 1 ? handleSendOtp : handleVerifyOtp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.buttonText}>
              {step === 1 ? 'Send OTP' : 'Verify & Continue'}
            </Text>
          )}
        </TouchableOpacity>

        {step === 2 && (
          <TouchableOpacity onPress={() => setStep(1)} style={styles.backLink}>
            <Text style={styles.backText}>Change Mobile Number</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    padding: Spacing.m,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: Colors.white,
  },
  tagline: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8,
  },
  card: {
    backgroundColor: Colors.white,
    padding: Spacing.xl,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  label: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: Spacing.s,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    fontSize: 20,
    paddingVertical: Spacing.s,
    marginBottom: Spacing.l,
    color: Colors.text,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.m,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  backLink: {
    marginTop: Spacing.m,
    alignItems: 'center',
  },
  backText: {
    color: Colors.primary,
    fontSize: 14,
  }
});

export default AuthScreen;
