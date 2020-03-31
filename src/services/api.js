// Stubbing out methods that will interact with our AWS backend.
import wait from '../util/wait'; // For testing only.

export const fetchLocalStatistics = async () => {
  await wait(1000);
  return {
    tests: 1999,
    cases: 11512,
    deaths: 168,
    reports: 32212,
  };
};

export const fetchNationalStatistics = async () => {
  await wait(3000);
  return {
    tests: 130421,
    cases: 11481,
    deaths: 1668,
    reports: 32212,
  };
};

export const reportDeviceIds = async payload => {
  console.log(payload);
  await wait(3000);
};

export default {
  fetchLocalStatistics,
  fetchNationalStatistics,
  reportDeviceIds,
};
