import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons
            name="hardware-chip-outline"
            size={34}
            color="#4E7D56"
          />
        </View>

        <Text style={styles.title}>
          IoT Home
        </Text>

        <Text style={styles.subtitle}>
          Smart Environment
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.menu}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.footer}>
        <Ionicons
          name="information-circle-outline"
          size={15}
          color="#888"
        />

        <Text style={styles.footerText}>
          IoT Dashboard v1.0.0
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    alignItems: 'center',
  },

  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#EAF4EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  title: {
    fontSize: 21,
    fontWeight: '700',
    color: '#222',
  },

  subtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 3,
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 18,
  },

  menu: {
    flex: 1,
    paddingTop: 10,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    marginHorizontal: 18,
  },

  footerText: {
    fontSize: 12,
    color: '#888',
  },
});