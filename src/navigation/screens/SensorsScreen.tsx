import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIoT } from '../../context/IoTContext';

export default function SensorsScreen() {
  const {
    sensors,
    isSensorsRefreshing,
    refreshSensors,
    sensorError,
    isLoading,
  } = useIoT();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#4E7D56" />
        <Text style={styles.loadingText}>Loading sensors...</Text>
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
        <Text style={styles.title}>Sensors</Text>
        <Text style={styles.subtitle}>
          Monitor your environment in real time
        </Text>
      </View>

      {sensorError && (
        <View style={styles.errorBanner}>
          <View style={styles.errorContent}>
            <Ionicons
              name="alert-circle-outline"
              size={20}
              color="#B00020"
            />

            <View style={styles.errorMessage}>
              <Text style={styles.errorTitle}>
                Unable to load sensor data
              </Text>

              <Text style={styles.errorText}>
                {sensorError}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={refreshSensors}
            style={styles.retryButton}
            activeOpacity={0.8}
          >
            <Ionicons
              name="refresh-outline"
              size={16}
              color="#FFFFFF"
            />
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.sensorCard}>
        <View style={styles.sensorHeader}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="thermometer-outline"
              size={26}
              color="#333"
            />
          </View>

          <View style={styles.sensorInfo}>
            <Text style={styles.sensorName}>
              Temperature
            </Text>

            <Text style={styles.sensorDescription}>
              Current room temperature
            </Text>
          </View>
        </View>

        <Text style={styles.sensorValue}>
          {sensors?.temperature ?? '--'}°C
        </Text>
      </View>

      <View style={styles.sensorCard}>
        <View style={styles.sensorHeader}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="water-outline"
              size={26}
              color="#333"
            />
          </View>

          <View style={styles.sensorInfo}>
            <Text style={styles.sensorName}>
              Humidity
            </Text>

            <Text style={styles.sensorDescription}>
              Current relative humidity
            </Text>
          </View>
        </View>

        <Text style={styles.sensorValue}>
          {sensors?.humidity ?? '--'}%
        </Text>
      </View>

      <View style={styles.sensorCard}>
        <View style={styles.sensorHeader}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="sunny-outline"
              size={26}
              color="#333"
            />
          </View>

          <View style={styles.sensorInfo}>
            <Text style={styles.sensorName}>
              Light Level
            </Text>

            <Text style={styles.sensorDescription}>
              Current ambient light
            </Text>
          </View>
        </View>

        <Text style={styles.sensorValue}>
          {sensors?.lightLevel ?? '--'} lux
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.refreshButton,
          isSensorsRefreshing && styles.refreshButtonDisabled,
        ]}
        onPress={refreshSensors}
        disabled={isSensorsRefreshing}
        activeOpacity={0.8}
      >
        {isSensorsRefreshing ? (
          <>
            <ActivityIndicator
              size="small"
              color="#FFFFFF"
            />
            <Text style={styles.refreshButtonText}>
              Refreshing...
            </Text>
          </>
        ) : (
          <>
            <Ionicons
              name="refresh-outline"
              size={18}
              color="#FFFFFF"
            />
            <Text style={styles.refreshButtonText}>
              Refresh Sensors
            </Text>
          </>
        )}
      </TouchableOpacity>
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

  sensorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,

    elevation: 2,
  },

  sensorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  sensorInfo: {
    flex: 1,
  },

  sensorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },

  sensorDescription: {
    fontSize: 13,
    color: '#888',
    marginTop: 3,
  },

  sensorValue: {
    fontSize: 30,
    fontWeight: '700',
    color: '#222',
    marginTop: 18,
  },

  refreshButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    backgroundColor: '#4E7D56',
    borderRadius: 12,
    paddingVertical: 14,
  },

  refreshButtonDisabled: {
    opacity: 0.65,
  },

  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
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

  errorMessage: {
    flex: 1,
  },

  errorTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B00020',
  },

  errorText: {
    fontSize: 13,
    color: '#B00020',
    marginTop: 2,
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
    fontWeight: '600',
    fontSize: 12,
  },
});