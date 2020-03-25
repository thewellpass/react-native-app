import { BleManager } from 'react-native-ble-plx';
import { useEffect, useState } from 'react';

const SCAN_INTERVAL = 1000 * 60 * 5; // Five minutes.
const SCAN_LENGTH = 1000 * 30; // 30 seconds.

const useBleManager = () => {
  const [manager, setManager] = useState(
    new BleManager({
      restoreStateIdentifier: 'WELLPASS_BLE',
      restoreStateFunction: (restoredState) => {
        console.log('restoredState', restoredState);
      },
    }),
  );
  const [status, setStatus] = useState('booting');
  const [scanReady, setScanReady] = useState(false);
  const [deviceIds, setDeviceIds] = useState([]);

  const startScanning = () => {
    setStatus('scanning');
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        return;
      }

      const { id } = device;
      if (id) {
        setDeviceIds([...deviceIds, id]);
      }
    });
  };

  const stopScanning = () => {
    setStatus('stopping scan');
    manager.stopDeviceScan();
  };

  const reportDeviceIds = () => {
    setStatus('reporting');
    const result = {
      scannedAt: new Date(),
      deviceIds,
    };
    // At this point we'd probably and post the result to the backend. If that
    // errors out, we'd add this to localStorage and queue it up for future
    // posting.
    console.log(result);
    setDeviceIds([]);
  };

  const scanAndReport = () => {
    startScanning();
    setTimeout(() => {
      stopScanning(), reportDeviceIds();
    }, SCAN_LENGTH);
  };

  useEffect(() => {
    const subscription = manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        setStatus('ready');
        setScanReady(true);
        subscription.remove();
      }
    }, true);

    return () => {
      manager.destroy();
    };
  }, []);

  useEffect(() => {
    let scanInterval;
    if (scanReady) {
      scanInterval = setInterval(() => {
        console.log('scanning');
        scanAndReport();
      }, SCAN_INTERVAL);
    }

    return () => {
      clearInterval(scanInterval);
    };
  }, [scanReady]);

  return {
    deviceIds,
    scanAndReport,
    status,
  };
};

export default useBleManager;
