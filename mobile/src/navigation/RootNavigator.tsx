import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MixBuilderScreen from '../screens/MixBuilderScreen';
import OrderTrackingScreen from '../screens/OrderTrackingScreen';
import AuthScreen from '../screens/AuthScreen';
import SelectPartnerScreen from '../screens/SelectPartnerScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import { Colors } from '../theme/theme';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Blendora' }}
        />
        <Stack.Screen 
          name="MixBuilder" 
          component={MixBuilderScreen} 
          options={{ title: 'Custom Mix' }}
        />
        <Stack.Screen 
          name="SelectPartner" 
          component={SelectPartnerScreen} 
          options={{ title: 'Source & Process' }}
        />
        <Stack.Screen 
          name="OrderTracking" 
          component={OrderTrackingScreen} 
          options={{ title: 'Track Order' }}
        />
        <Stack.Screen 
          name="Subscriptions" 
          component={SubscriptionScreen} 
          options={{ title: 'My Subscriptions' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
