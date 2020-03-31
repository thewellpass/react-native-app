import BleManager from 'react-native-ble-manager';
import { NativeModules, NativeEventEmitter } from 'react-native';
import { useEffect, useState } from 'react';

const SCAN_INTERVAL = 1000 * 60 * 5; // Five minutes.
const SCAN_LENGTH = 1000 * 30; // 30 seconds.

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const useBleManager = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [deviceIds, setDeviceIds] = useState([]);

  const startScan = async () => {
    if (isScanning) return;
    setIsScanning(true);
    setDeviceIds([]);
    await BleManager.scan([], 3, true);
  };

  const stopScan = async () => {
    await BleManager.stopScan();
    setIsScanning(false);
  };

  const addDeviceId = device => {
    console.log('discovered', device);
    const { id } = device;
    if (id && !deviceIds.includes(id)) {
      setDeviceIds([id, ...deviceIds]);
    }
  };

  const reportDeviceIds = () => {
    const result = {
      scannedAt: new Date(),
      deviceIds,
    };
    // At this point we'd probably post the result to the backend. If that
    // errors out, we'd add this to localStorage and queue it up for future
    // posting.
    console.log(result);
    setDeviceIds([]);
  };

  const scanAndReport = () => {
    startScan();
    setTimeout(() => {
      stopScan();
      reportDeviceIds();
    }, SCAN_LENGTH);
  };

  useEffect(() => {
    console.log('binding listener', bleManagerEmitter);
    BleManager.start({ showAlert: false });
    const discoverHandler = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      addDeviceId,
    );
    // let scanInterval = setInterval(() => {
    //   console.log('scanning');
    //   scanAndReport();
    // }, SCAN_INTERVAL);

    return () => {
      // clearInterval(scanInterval);
      discoverHandler.remove();
    };
  }, []);

  return {
    deviceIds,
    isScanning,
    scanAndReport,
    startScan,
    stopScan,
  };
};

export default useBleManager;
