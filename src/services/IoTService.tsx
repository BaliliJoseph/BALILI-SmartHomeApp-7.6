import { Device, SensorData, sampleDevices } from '../models/IoTModels';

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

let deviceState: Device[] = sampleDevices.map((device) => ({ ...device }));

export async function getDevices(): Promise<Device[]> {
    await delay(1000);

    if (Math.random() < 0.1) {
        throw new Error('Failed to fetch devices from gateway');
    }

    return deviceState.map((device) => ({ ...device }));
}

export async function getSensorData(): Promise<SensorData> {
    await delay(1200);

    if (Math.random() < 0.1) {
        throw new Error('Failed to fetch sensor data');
    }

    return {
        temperature: Math.floor(Math.random() * (35 - 18 + 1)) + 18,
        humidity: Math.floor(Math.random() * (80 - 40 + 1)) + 40,
        lightLevel: Math.floor(Math.random() * (1000 - 200 + 1)) + 200,
    };
}

export async function updateDeviceStatus(
    id: number,
    status: boolean
): Promise<Device> {
    await delay(800);

    if (Math.random() < 0.1) {
        throw new Error(`Failed to update device ${id}`);
    }

    deviceState = deviceState.map((device) =>
        device.id === id ? { ...device, status } : device
    );

    const updated = deviceState.find((device) => device.id === id);

    if (!updated) {
        throw new Error(`Device ${id} not found`);
    }

    return { ...updated };
}