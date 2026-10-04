import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIoT } from '../../context/IoTContext';

export default function SettingsScreen() {
  const { isGatewayConnected } = useIoT();

  const [notifications, setNotifications] = useState(true);
  const [autoConnect, setAutoConnect] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>
          Configure your IoT application
        </Text>
      </View>

      <Text style={styles.sectionTitle}>General</Text>

      <View style={styles.settingCard}>
        <View style={styles.settingInfo}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#333"
            />
          </View>

          <View style={styles.settingText}>
            <Text style={styles.settingName}>
              Notifications
            </Text>

            <Text style={styles.settingDescription}>
              Receive alerts from your IoT devices
            </Text>
          </View>
        </View>

        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{
            false: '#D1D1D1',
            true: '#9DC5A3',
          }}
          thumbColor={
            notifications
              ? '#4E7D56'
              : '#F5F5F5'
          }
        />
      </View>

      <View style={styles.settingCard}>
        <View style={styles.settingInfo}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="wifi-outline"
              size={24}
              color="#333"
            />
          </View>

          <View style={styles.settingText}>
            <Text style={styles.settingName}>
              Auto Connect
            </Text>

            <Text style={styles.settingDescription}>
              Automatically connect to the IoT gateway
            </Text>
          </View>
        </View>

        <Switch
          value={autoConnect}
          onValueChange={setAutoConnect}
          trackColor={{
            false: '#D1D1D1',
            true: '#9DC5A3',
          }}
          thumbColor={
            autoConnect
              ? '#4E7D56'
              : '#F5F5F5'
          }
        />
      </View>

      <View style={styles.settingCard}>
        <View style={styles.settingInfo}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="moon-outline"
              size={24}
              color="#333"
            />
          </View>

          <View style={styles.settingText}>
            <Text style={styles.settingName}>
              Dark Mode
            </Text>

            <Text style={styles.settingDescription}>
              Use a darker application appearance
            </Text>
          </View>
        </View>

        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{
            false: '#D1D1D1',
            true: '#9DC5A3',
          }}
          thumbColor={
            darkMode
              ? '#4E7D56'
              : '#F5F5F5'
          }
        />
      </View>

      <Text style={styles.sectionTitle}>
        Connection
      </Text>

      <View style={styles.connectionCard}>
        <View style={styles.connectionInfo}>
          <View
            style={[
              styles.connectionIconContainer,
              isGatewayConnected
                ? styles.connectedIcon
                : styles.disconnectedIcon,
            ]}
          >
            <Ionicons
              name={
                isGatewayConnected
                  ? 'cloud-done-outline'
                  : 'cloud-offline-outline'
              }
              size={26}
              color={
                isGatewayConnected
                  ? '#4E7D56'
                  : '#B00020'
              }
            />
          </View>

          <View style={styles.connectionText}>
            <Text style={styles.connectionTitle}>
              IoT Gateway
            </Text>

            <View style={styles.statusRow}>
              <View
                style={[
                  styles.statusDot,
                  isGatewayConnected
                    ? styles.statusConnected
                    : styles.statusDisconnected,
                ]}
              />

              <Text
                style={[
                  styles.connectionStatus,
                  isGatewayConnected
                    ? styles.connectedText
                    : styles.disconnectedText,
                ]}
              >
                {isGatewayConnected
                  ? 'Connected'
                  : 'Disconnected'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Application
      </Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            App Name
          </Text>

          <Text style={styles.infoValue}>
            IoT Dashboard
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Version
          </Text>

          <Text style={styles.infoValue}>
            1.0.0
          </Text>
        </View>
      </View>
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

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginTop: 10,
    marginBottom: 12,
  },

  settingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,

    elevation: 2,
  },

  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
  },

  settingText: {
    marginLeft: 12,
    flex: 1,
  },

  settingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },

  settingDescription: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    lineHeight: 17,
  },

  connectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,

    elevation: 2,
  },

  connectionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  connectionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  connectedIcon: {
    backgroundColor: '#EAF4EC',
  },

  disconnectedIcon: {
    backgroundColor: '#FDECEA',
  },

  connectionText: {
    marginLeft: 12,
  },

  connectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 6,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  statusConnected: {
    backgroundColor: '#4E7D56',
  },

  statusDisconnected: {
    backgroundColor: '#B00020',
  },

  connectionStatus: {
    fontSize: 13,
    fontWeight: '500',
  },

  connectedText: {
    color: '#4E7D56',
  },

  disconnectedText: {
    color: '#B00020',
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,

    elevation: 2,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },

  infoLabel: {
    fontSize: 14,
    color: '#666',
  },

  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
});