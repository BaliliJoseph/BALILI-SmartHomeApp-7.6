import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  Device,
  SensorData,
  defaultSensorData,
} from '../models/IoTModels';

import * as IoTService from '../services/IoTService';

type IoTContextType = {
  devices: Device[];
  sensors: SensorData;

  isGatewayConnected: boolean;
  isLoading: boolean;
  isSensorsRefreshing: boolean;

  deviceError: string | null;
  sensorError: string | null;

  updatingDeviceIds: number[];

  toggleDevice: (
    id: number,
    value: boolean
  ) => Promise<void>;

  refreshSensors: () => Promise<void>;

  retryConnection: () => Promise<void>;
};

const IoTContext = createContext<IoTContextType | undefined>(
  undefined
);

export function IoTProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [devices, setDevices] = useState<Device[]>([]);

  const [sensors, setSensors] =
    useState<SensorData>(defaultSensorData);

  const [
    isGatewayConnected,
    setIsGatewayConnected,
  ] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [
    isSensorsRefreshing,
    setIsSensorsRefreshing,
  ] = useState(false);

  const [
    deviceError,
    setDeviceError,
  ] = useState<string | null>(null);

  const [
    sensorError,
    setSensorError,
  ] = useState<string | null>(null);

  const [
    updatingDeviceIds,
    setUpdatingDeviceIds,
  ] = useState<number[]>([]);

  const loadInitialData = async (): Promise<void> => {
    setIsLoading(true);
    setDeviceError(null);
    setSensorError(null);

    try {
      const initialDevices =
        await IoTService.getDevices();

      setDevices(initialDevices);
      setIsGatewayConnected(true);
    } catch (error) {
      setDevices([]);
      setIsGatewayConnected(false);
      setDeviceError(
        'Unable to connect to the IoT gateway.'
      );
    }

    try {
      const initialSensors =
        await IoTService.getSensorData();

      setSensors(initialSensors);
    } catch (error) {
      setSensorError(
        'Unable to retrieve sensor data.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const retryConnection = async (): Promise<void> => {
    await loadInitialData();
  };

  const toggleDevice = async (
    id: number,
    value: boolean
  ): Promise<void> => {
    if (!isGatewayConnected) {
      setDeviceError(
        'Cannot update device while the gateway is disconnected.'
      );
      return;
    }

    if (updatingDeviceIds.includes(id)) {
      return;
    }

    setUpdatingDeviceIds((previous) => [
      ...previous,
      id,
    ]);

    setDeviceError(null);

    try {
      const updatedDevice =
        await IoTService.updateDeviceStatus(
          id,
          value
        );

      setDevices((previous) =>
        previous.map((device) =>
          device.id === id
            ? updatedDevice
            : device
        )
      );
    } catch (error) {
      const device = devices.find(
        (item) => item.id === id
      );

      setDeviceError(
        `Unable to update ${
          device?.name ?? 'device'
        }.`
      );
    } finally {
      setUpdatingDeviceIds((previous) =>
        previous.filter(
          (deviceId) => deviceId !== id
        )
      );
    }
  };

  const refreshSensors =
    async (): Promise<void> => {
      if (isSensorsRefreshing) {
        return;
      }

      setIsSensorsRefreshing(true);
      setSensorError(null);

      try {
        const newSensors =
          await IoTService.getSensorData();

        setSensors(newSensors);
      } catch (error) {
        setSensorError(
          'Unable to retrieve sensor data.'
        );
      } finally {
        setIsSensorsRefreshing(false);
      }
    };

  return (
    <IoTContext.Provider
      value={{
        devices,
        sensors,

        isGatewayConnected,
        isLoading,
        isSensorsRefreshing,

        deviceError,
        sensorError,

        updatingDeviceIds,

        toggleDevice,
        refreshSensors,
        retryConnection,
      }}
    >
      {children}
    </IoTContext.Provider>
  );
}

export function useIoT(): IoTContextType {
  const context = useContext(IoTContext);

  if (!context) {
    throw new Error(
      'useIoT must be used inside IoTProvider'
    );
  }

  return context;
}