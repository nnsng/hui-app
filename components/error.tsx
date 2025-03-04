import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ErrorProps = {
  message: string;
};

export default function Error({ message }: ErrorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
    padding: 20,
    borderRadius: 5,
  },
  errorText: {
    color: '#721c24',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
