import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import React, { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import LocationPermissions from '../constants/LocationPermissions';

const UserContext = React.createContext({});

const defaultUserState = {
  hasAcceptedPrivacyPolicy: false,
  hasAcceptedTOS: false,
  hasEnabledBluetooth: false,
  hasEnabledLocationSharing: LocationPermissions.NEVER,
};

const STORAGE_KEY = 'USER';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ ...defaultUserState });
  const [hasInitialized, setHasInitialized] = useState(false);

  const updateUserField = (key, value) => {
    const newUserState = { ...user };
    newUserState[key] = value;
    setUser(newUserState);
  };

  const fetchCachedUser = async () => {
    try {
      const cachedUser = await AsyncStorage.getItem(STORAGE_KEY);
      if (cachedUser) {
        return JSON.parse(cachedUser);
      }
      return null;
    } catch (error) {
      console.error(error);
    }
  };

  const checkLocationPermissions = async (newRequest = true) => {
    const { granted, ios } = newRequest
      ? await await Permissions.askAsync(Permissions.LOCATION)
      : await Permissions.getAsync(Permissions.LOCATION);
    let result = granted
      ? LocationPermissions.ALWAYS
      : LocationPermissions.NEVER;
    if (ios) {
      const { scope } = ios;
      if (scope === 'whenInUse') {
        result = LocationPermissions.ACTIVE_ONLY;
      }
    }
    return result;
  };

  useEffect(() => {
    (async () => {
      const cachedUser = await fetchCachedUser();
      if (cachedUser) {
        const locationPermission = await checkLocationPermissions(false);
        const newUserState = {
          ...cachedUser,
          hasEnabledLocationSharing: locationPermission,
        };
        setUser(newUserState);
      }
      setHasInitialized(true);
    })();
  }, []);

  useEffect(() => {
    if (!hasInitialized) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        checkLocationPermissions,
        hasInitialized,
        user,
        updateUserField,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
