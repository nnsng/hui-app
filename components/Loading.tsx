import { colors } from '@/constants/colors';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type LoadingProps = {
  size?: 'small' | 'large';
};

export function Loading({ size = 'large' }: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});
