import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Device, SensorData } from '../models/IoTModels';
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
    toggleDevice: (id: number, value: boolean) => void;
    refreshSensors: () => void;
    retryConnection: () => void;
};

const IoTContext = createContext<IoTContextType | undefined>(undefined);

export function IoTProvider({ children }: { children: React.ReactNode }) {
    const [devices, setDevices] = useState<Device[]>([]);

    const [sensors, setSensors] = useState<SensorData>({
        temperature: 0,
        humidity: 0,
        lightLevel: 0,
    });

    const [isGatewayConnected, setIsGatewayConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSensorsRefreshing, setIsSensorsRefreshing] = useState(false);
    const [deviceError, setDeviceError] = useState<string | null>(null);
    const [sensorError, setSensorError] = useState<string | null>(null);
    const [updatingDeviceIds, setUpdatingDeviceIds] = useState<number[]>([]);

    const loadInitialData = async () => {
        try {
            setIsLoading(true);
            setDeviceError(null);
            setSensorError(null);

            const [initialDevices, initialSensors] = await Promise.all([
                IoTService.getDevices(),
                IoTService.getSensorData(),
            ]);

            setDevices(initialDevices);
            setSensors(initialSensors);
            setIsGatewayConnected(true);
        } catch (err) {
            setIsGatewayConnected(false);
            setDeviceError('Unable to retrieve devices.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    const retryConnection = () => {
        loadInitialData();
    };

    const toggleDevice = async (id: number, value: boolean) => {
        setUpdatingDeviceIds((prev) => [...prev, id]);
        setDeviceError(null);

        try {
            const updatedDevice = await IoTService.updateDeviceStatus(id, value);

            setDevices((prev) =>
                prev.map((device) => (device.id === id ? updatedDevice : device))
            );
        } catch (err) {
            const device = devices.find((d) => d.id === id);
            setDeviceError(`Unable to update ${device?.name ?? 'device'}.`);
        } finally {
            setUpdatingDeviceIds((prev) => prev.filter((deviceId) => deviceId !== id));
        }
    };

    const refreshSensors = async () => {
        setIsSensorsRefreshing(true);
        setSensorError(null);

        try {
            const newSensors = await IoTService.getSensorData();
            setSensors(newSensors);
        } catch (err) {
            setSensorError('Unable to retrieve sensor data.');
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

export function useIoT() {
    const context = useContext(IoTContext);

    if (!context) {
        throw new Error('useIoT must be used inside IoTProvider');
    }

    return context;
}