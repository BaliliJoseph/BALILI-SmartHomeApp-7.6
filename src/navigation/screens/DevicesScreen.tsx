import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useIoT } from '../../context/IoTContext';

export default function DevicesScreen() {

  const {
      devices,
      toggleDevice,
      isGatewayConnected,
      isLoading,
      deviceError,
      updatingDeviceIds,
      retryConnection,
  } = useIoT();

  if (isLoading) {
      return (
          <View style={styles.center}>
              <Text>Loading devices...</Text>
          </View>
      );
  }

  return (
      <ScrollView style={styles.container}>
          <Text style={styles.title}>Devices</Text>
          <Text style={styles.subtitle}>Control your connected devices</Text>

          {!isGatewayConnected && (
              <View style={styles.errorBanner}>
                  <Text style={styles.errorText}>IoT Gateway is disconnected.</Text>
                  <TouchableOpacity onPress={retryConnection} style={styles.retryButton}>
                      <Text style={styles.retryText}>Retry</Text>
                  </TouchableOpacity>
              </View>
          )}

          {deviceError && (
              <View style={styles.errorBanner}>
                  <Text style={styles.errorText}>{deviceError}</Text>
              </View>
          )}

          {devices.map((device) => {
              const isUpdating = updatingDeviceIds.includes(device.id);

              return (
                  <View key={device.id} style={styles.deviceCard}>

                      <View style={styles.deviceInfo}>

                          <View style={styles.iconContainer}>
                              <Ionicons name={device.icon} size={28} />
                          </View>

                          <View style={styles.deviceDetails}>
                              <Text style={styles.deviceName}>{device.name}</Text>
                              <Text style={styles.deviceType}>{device.type}</Text>
                              <Text style={styles.deviceState}>
                                  {isUpdating ? 'Updating...' : device.status ? 'ON' : 'OFF'}
                              </Text>
                          </View>

                      </View>

                      <Switch
                          value={device.status}
                          onValueChange={(value) => toggleDevice(device.id, value)}
                          disabled={!isGatewayConnected || isUpdating}
                      />

                  </View>
              );
          })}

      </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 25,
  },

  deviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 15,
    backgroundColor: '#eeeeee',
    marginBottom: 15,
  },

  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  deviceDetails: {
    flex: 1,
  },

  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  deviceType: {
    fontSize: 13,
    marginTop: 3,
  },

  deviceState: {
    fontSize: 12,
    marginTop: 5,
  },

  errorBanner: {
    backgroundColor: '#fdecea',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  errorText: {
    color: '#b00020',
    fontSize: 13,
  },

  retryButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#b00020',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  retryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },

});