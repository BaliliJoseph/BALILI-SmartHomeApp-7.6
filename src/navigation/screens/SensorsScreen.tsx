import React from 'react';
import { useIoT } from '../../context/IoTContext';
import { TouchableOpacity } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function SensorsScreen() {
  
const { sensors, isSensorsRefreshing, refreshSensors, sensorError, isLoading } = useIoT();

if (isLoading) {
    return (
        <View style={styles.center}>
            <Text>Loading sensors...</Text>
        </View>
    );
}

return (
    <ScrollView style={styles.container}>
        <Text style={styles.title}>Sensors</Text>
        <Text style={styles.subtitle}>Monitor your environment</Text>

        {sensorError && (
            <View style={styles.errorBanner}>
                <Text style={styles.errorText}>{sensorError}</Text>
                <TouchableOpacity onPress={refreshSensors} style={styles.retryButton}>
                    <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
            </View>
        )}

        <View style={styles.sensorCard}>
            <View style={styles.sensorHeader}>
                <Ionicons name="thermometer-outline" size={30} />
                <Text style={styles.sensorName}>Temperature</Text>
            </View>
            <Text style={styles.sensorValue}>{sensors.temperature}°C</Text>
            <Text style={styles.sensorDescription}>Current room temperature</Text>
        </View>

        <View style={styles.sensorCard}>
            <View style={styles.sensorHeader}>
                <Ionicons name="water-outline" size={30} />
                <Text style={styles.sensorName}>Humidity</Text>
            </View>
            <Text style={styles.sensorValue}>{sensors.humidity}%</Text>
            <Text style={styles.sensorDescription}>Current relative humidity</Text>
        </View>

        <View style={styles.sensorCard}>
            <View style={styles.sensorHeader}>
                <Ionicons name="sunny-outline" size={30} />
                <Text style={styles.sensorName}>Light Level</Text>
            </View>
            <Text style={styles.sensorValue}>{sensors.lightLevel} lux</Text>
            <Text style={styles.sensorDescription}>Current ambient light</Text>
        </View>

        <TouchableOpacity
            style={styles.button}
            onPress={refreshSensors}
            disabled={isSensorsRefreshing}
        >
            {isSensorsRefreshing ? (
                <Text style={styles.buttonText}>Refreshing Sensors...</Text>
            ) : (
                <Text style={styles.buttonText}>Refresh Sensors</Text>
            )}
        </TouchableOpacity>
    </ScrollView>
);
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
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

  sensorCard: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#eeeeee',
    marginBottom: 15,
  },

  sensorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  sensorName: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  sensorValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
  },

  sensorDescription: {
    fontSize: 13,
    marginTop: 5,
  },

  button: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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

    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },

});