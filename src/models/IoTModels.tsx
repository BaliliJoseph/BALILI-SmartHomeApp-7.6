import { Ionicons } from '@expo/vector-icons';

export type DeviceStatus = boolean;

export type Device = {
  id: number;
  name: string;
  type: string;
  icon: keyof typeof Ionicons.glyphMap;
  status: DeviceStatus;
};

export type SensorData = {
  temperature: number;
  humidity: number;
  lightLevel: number;
};

export const sampleDevices: Device[] = [
  {
    id: 1,
    name: 'Living Room Light',
    type: 'Smart Light',
    icon: 'bulb-outline',
    status: true,
  },
  {
    id: 2,
    name: 'Bedroom Fan',
    type: 'Smart Fan',
    icon: 'sync-outline',
    status: false,
  },
  {
    id: 3,
    name: 'Front Door Lock',
    type: 'Smart Lock',
    icon: 'lock-closed-outline',
    status: true,
  },
];

export const defaultSensorData: SensorData = {
  temperature: 0,
  humidity: 0,
  lightLevel: 0,
};