import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';

const Page = () => {
  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.container}
      >
        <Text>Search page</Text>
      </ScrollView>
    </>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
