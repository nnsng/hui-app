import { fontSize } from '@/constants/typography';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography } from './Typography';

type ErrorProps = {
  message: string;
};

export function Error({ message }: ErrorProps) {
  return (
    <View style={styles.container}>
      <Typography style={styles.errorText}>{message}</Typography>
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
    fontSize: fontSize.base,
    fontWeight: 'bold',
  },
});
