import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Alerts from './Alerts';
import Heatmap from './Heatmap';
import Home from './Home';
import LogoLayout from '../components/LogoLayout';
const Tab = createBottomTabNavigator();

const Base = () => {
  return (
    <LogoLayout>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Alerts" component={Alerts} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Heatmap" component={Heatmap} />
      </Tab.Navigator>
    </LogoLayout>
  );
};

export default Base;
