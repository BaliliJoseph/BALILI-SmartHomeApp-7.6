import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#4E7D56" />
        <Text style={styles.loadingText}>Loading devices...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Devices</Text>
        <Text style={styles.subtitle}>
          Control and monitor your connected devices
        </Text>
      </View>

      {!isGatewayConnected && (
        <View style={styles.errorBanner}>
          <View style={styles.errorContent}>
            <Ionicons
              name="warning-outline"
              size={20}
              color="#B00020"
            />

            <View style={styles.errorMessageContainer}>
              <Text style={styles.errorTitle}>
                Gateway disconnected
              </Text>

              <Text style={styles.errorText}>
                Device controls are temporarily unavailable.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={retryConnection}
            style={styles.retryButton}
            activeOpacity={0.8}
          >
            <Ionicons
              name="refresh-outline"
              size={16}
              color="#FFFFFF"
            />

            <Text style={styles.retryText}>
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {deviceError && (
        <View style={styles.errorBanner}>
          <View style={styles.errorContent}>
            <Ionicons
              name="alert-circle-outline"
              size={20}
              color="#B00020"
            />

            <Text style={styles.errorText}>
              {deviceError}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Connected Devices
        </Text>

        <Text style={styles.deviceCount}>
          {devices?.length ?? 0}
        </Text>
      </View>

      {!devices || devices.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Ionicons
              name="hardware-chip-outline"
              size={32}
              color="#888"
            />
          </View>

          <Text style={styles.emptyTitle}>
            No devices found
          </Text>

          <Text style={styles.emptyText}>
            Connected devices will appear here.
          </Text>
        </View>
      ) : (
        <View style={styles.deviceList}>
          {devices.map((device) => {
            const isUpdating =
              updatingDeviceIds?.includes(device.id) ?? false;

            const isDisabled =
              !isGatewayConnected || isUpdating;

            return (
              <View
                key={device.id}
                style={[
                  styles.deviceCard,
                  isDisabled && styles.disabledCard,
                ]}
              >
                <View style={styles.deviceInfo}>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name={device.icon || 'hardware-chip-outline'}
                      size={25}
                      color="#333"
                    />
                  </View>

                  <View style={styles.deviceDetails}>
                    <Text style={styles.deviceName}>
                      {device.name}
                    </Text>

                    <Text style={styles.deviceType}>
                      {device.type || 'IoT Device'}
                    </Text>

                    <View style={styles.statusRow}>
                      <View
                        style={[
                          styles.statusDot,
                          device.status
                            ? styles.statusDotOn
                            : styles.statusDotOff,
                        ]}
                      />

                      <Text
                        style={[
                          styles.deviceState,
                          device.status
                            ? styles.deviceOn
                            : styles.deviceOff,
                        ]}
                      >
                        {isUpdating
                          ? 'Updating...'
                          : device.status
                          ? 'ON'
                          : 'OFF'}
                      </Text>
                    </View>
                  </View>
                </View>

                <Switch
                  value={Boolean(device.status)}
                  onValueChange={(value) =>
                    toggleDevice(device.id, value)
                  }
                  disabled={isDisabled}
                  trackColor={{
                    false: '#D1D1D1',
                    true: '#9DC5A3',
                  }}
                  thumbColor={
                    device.status
                      ? '#4E7D56'
                      : '#F5F5F5'
                  }
                />
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

  contentContainer: {
    padding: 20,
    paddingBottom: 30,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    gap: 10,
  },

  loadingText: {
    fontSize: 14,
    color: '#777',
  },

  header: {
    marginBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
  },

  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },

  errorBanner: {
    backgroundColor: '#FDECEA',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },

  errorContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },

  errorMessageContainer: {
    flex: 1,
  },

  errorTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B00020',
  },

  errorText: {
    flex: 1,
    fontSize: 13,
    color: '#B00020',
    lineHeight: 18,
  },

  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    marginTop: 12,
    backgroundColor: '#B00020',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  retryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },

  deviceCount: {
    fontSize: 13,
    color: '#777',
  },

  deviceList: {
    gap: 10,
  },

  deviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,

    elevation: 2,
  },

  disabledCard: {
    opacity: 0.65,
  },

  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#F1F1F1',
  },

  deviceDetails: {
    flex: 1,
  },

  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },

  deviceType: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  statusDotOn: {
    backgroundColor: '#4E7D56',
  },

  statusDotOff: {
    backgroundColor: '#999',
  },

  deviceState: {
    fontSize: 12,
    fontWeight: '600',
  },

  deviceOn: {
    color: '#4E7D56',
  },

  deviceOff: {
    color: '#888',
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  emptyIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  emptyText: {
    fontSize: 13,
    color: '#888',
    marginTop: 5,
    textAlign: 'center',
  },
});