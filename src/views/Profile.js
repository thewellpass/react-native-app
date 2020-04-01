import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import ContentLayout from '../components/ContentLayout';
import PaddedView from '../components/PaddedView';

const Profile = () => {
  return (
    <ContentLayout>
      <ScrollView style={styles.container}>
        <PaddedView>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            laoreet est quis felis commodo congue. In consectetur sed nulla eu
            pulvinar. Donec felis sem, porta vel nibh vel, iaculis rutrum leo.
          </Text>
        </PaddedView>
      </ScrollView>
    </ContentLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
});

export default Profile;
