import { Button } from '@/components/common';
import { palette } from '@/constants/palette';
import { useActiveCycleQuery, useRoundsQuery } from '@/hooks/queries';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export function ActionButtons() {
  const router = useRouter();

  const {
    data: cycle,
    refetch: refetchCycle,
    isRefetching: isRefetchingCycle,
  } = useActiveCycleQuery();
  const {
    data: rounds = [],
    refetch: refetchRounds,
    isRefetching: isRefetchingRounds,
  } = useRoundsQuery();
  const isFetching = isRefetchingCycle || isRefetchingRounds;

  const { totalRounds = 0, isReceived } = cycle || {};
  const canMakePayment = rounds.length < totalRounds - (isReceived ? 0 : 1);

  const paymentDisabled = !canMakePayment;
  const receiveDisabled = isReceived;

  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isFetching) {
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      rotateValue.setValue(0);
    }
  }, [isFetching, rotateValue]);

  const refetch = async () => {
    await refetchCycle();
    await refetchRounds();
  };

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.actionsRow}>
      <Button
        label="Đóng hụi"
        variant="primary"
        size="sm"
        icon="arrow-up"
        iconSize={18}
        iconColor={palette.secondary}
        iconStyle={styles.payIcon}
        disabled={paymentDisabled}
        onPress={() => router.push('/payment')}
        style={styles.flexOne}
      />

      <Button
        label="Hốt hụi"
        variant="secondary"
        size="sm"
        icon="arrow-down"
        iconSize={18}
        iconColor={palette.primary}
        disabled={receiveDisabled}
        onPress={() => router.push('/receive')}
        style={styles.flexOne}
      />

      <Button
        variant="soft"
        size="sm"
        icon="sync"
        iconSize={18}
        iconColor={palette.primary}
        iconWrapper={({ children }) => (
          <Animated.View style={{ transform: [{ rotate: spin }], opacity: isFetching ? 0.7 : 1 }}>
            {children}
          </Animated.View>
        )}
        onPress={refetch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  flexOne: {
    flex: 1,
  },
  payIcon: {
    transform: [{ rotate: '45deg' }],
  },
});
