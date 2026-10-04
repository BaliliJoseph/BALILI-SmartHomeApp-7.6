import {
  Device,
  SensorData,
  sampleDevices,
} from '../models/IoTModels';

const MOCK_DELAY = {
  devices: 800,
  sensors: 900,
  updateDevice: 600,
};

const MOCK_FAILURE_RATE = 0.05;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldFail(): boolean {
  return Math.random() < MOCK_FAILURE_RATE;
}

function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cloneDevice(device: Device): Device {
  return { ...device };
}

let deviceState: Device[] = sampleDevices.map(cloneDevice);


export async function getDevices(): Promise<Device[]> {
  await delay(MOCK_DELAY.devices);

  if (shouldFail()) {
    throw new Error('Unable to retrieve devices from the IoT gateway.');
  }

  return deviceState.map(cloneDevice);
}


export async function getSensorData(): Promise<SensorData> {
  await delay(MOCK_DELAY.sensors);

  if (shouldFail()) {
    throw new Error('Unable to retrieve sensor data.');
  }

  return {
    temperature: randomInteger(18, 35),
    humidity: randomInteger(40, 80),
    lightLevel: randomInteger(200, 1000),
  };
}


export async function updateDeviceStatus(
  id: number,
  status: boolean
): Promise<Device> {
  await delay(MOCK_DELAY.updateDevice);

  const existingDevice = deviceState.find(
    (device) => device.id === id
  );

  if (!existingDevice) {
    throw new Error(`Device with ID ${id} was not found.`);
  }

  if (shouldFail()) {
    throw new Error(
      `Unable to update ${existingDevice.name}.`
    );
  }

  const updatedDevice: Device = {
    ...existingDevice,
    status,
  };

  deviceState = deviceState.map((device) =>
    device.id === id
      ? updatedDevice
      : device
  );

  return cloneDevice(updatedDevice);
}


export function resetMockDevices(): void {
  deviceState = sampleDevices.map(cloneDevice);
}