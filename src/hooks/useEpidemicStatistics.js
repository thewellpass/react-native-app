import { useState } from 'react';
import api from '../services/api';

const useEpidemicStatistics = (epidemic = 'covid19') => {
  const [statistics, setStatistics] = useState({
    national: {
      tests: null,
      cases: null,
      deaths: null,
      reports: null,
    },
    local: {
      tests: null,
      cases: null,
      deaths: null,
      reports: null,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchStatistics = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const [national, local] = await Promise.all([
      api.fetchNationalStatistics(),
      api.fetchLocalStatistics(),
    ]);
    setStatistics({ ...statistics, national, local });
    setIsLoading(false);
  };

  return { statistics, fetchStatistics };
};

export default useEpidemicStatistics;
