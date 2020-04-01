import React, { useContext, useEffect } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PaddedView from '../components/PaddedView';
import Panel from '../components/Panel';
import PanelHeader from '../components/PanelHeader';
import UserContext from '../contexts/UserContext';
import abbreviateNumber from '../util/abbreviateNumber';
import useEpidemicStatistics from '../hooks/useEpidemicStatistics';

const formatNumber = number =>
  Number.isNaN(parseFloat(number)) ? '--' : abbreviateNumber(number);

const App = () => {
  const { updateUserField, user } = useContext(UserContext);
  const { statistics, fetchStatistics } = useEpidemicStatistics();
  const { national, local } = statistics;

  const lastCheckIn = user.lastCheckIn
    ? `${formatDistanceToNow(new Date(user.lastCheckIn))} ago`
    : 'never';

  const handleCheckIn = () => {
    updateUserField('lastCheckIn', new Date().toISOString());
  };

  const userStats = [
    { label: 'My locations', value: formatNumber(user.locations.length) },
    {
      label: 'Risk events tracking',
      value: formatNumber(user.riskEvents.length),
    },
    { label: 'Safe days', value: formatNumber(user.safeDays) },
  ];

  const getStats = data => [
    { label: 'Test', value: formatNumber(data.tests) },
    { label: 'Cases', value: formatNumber(data.cases) },
    { label: 'Deaths', value: formatNumber(data.deaths) },
    { label: 'Self reports', value: formatNumber(data.reports) },
  ];

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.statusButtons}>
        <View style={styles.statusButtonContainer}>
          <Button title="😀 Feeling healthy" onPress={handleCheckIn} />
        </View>
        <View style={styles.statusButtonContainer}>
          <Button title="😷 Feeling ill" onPress={handleCheckIn} />
        </View>
      </View>
      <PaddedView style={{ marginVertical: 12 }}>
        <Text>Last health check in: {lastCheckIn}</Text>
      </PaddedView>
      <Image
        style={{ width: '100%' }}
        source={require('../assets/mock_heatmap.png')}
      />
      <PaddedView>
        <Panel style={styles.userStats}>
          {userStats.map(({ label, value }) => (
            <View key={label} style={styles.smallStatistic}>
              <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{value}</Text>
              <Text style={{ fontSize: 10 }}>{label}</Text>
            </View>
          ))}
        </Panel>
        <Panel>
          <PanelHeader>Current Statistics</PanelHeader>
          <Text style={{ fontWeight: 'bold' }}>Totals US</Text>
          <View style={styles.largeStats}>
            {getStats(national).map(({ label, value }) => (
              <View key={label} style={styles.largeStatistic}>
                <Text style={{ fontSize: 20 }}>{value}</Text>
                <Text style={{ fontSize: 12 }}>{label}</Text>
              </View>
            ))}
          </View>
          <Text style={{ fontWeight: 'bold' }}>Totals around you</Text>
          <View style={styles.largeStats}>
            {getStats(local).map(({ label, value }) => (
              <View key={label} style={styles.largeStatistic}>
                <Text style={{ fontSize: 20 }}>{value}</Text>
                <Text style={{ fontSize: 12 }}>{label}</Text>
              </View>
            ))}
          </View>
        </Panel>
      </PaddedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  statusButtons: {
    flexDirection: 'row',
  },
  statusButtonContainer: {
    flex: 1,
  },
  userStats: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 24,
    marginTop: -24,
  },
  smallStatistic: {
    alignItems: 'center',
    flex: 1,
    fontSize: 9,
    justifyContent: 'center',
    textAlign: 'center',
  },
  largeStats: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 16,
  },
  largeStatistic: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingTop: 12,
    textAlign: 'center',
  },
});

export default App;
