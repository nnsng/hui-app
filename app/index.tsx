import { Error, Loading } from '@/components/common';
import { ActionButtons, Balance, Header, RecentRounds } from '@/components/home';
import { InfoModal, PaymentModal, ReceiveModal } from '@/components/home/modals';
import { palette } from '@/constants/palette';
import { useActiveCycleQuery, useRoundsQuery } from '@/hooks/queries';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const {
    isLoading: isLoadingCycle,
    isError: isErrorCycle,
    error: errorCycle,
  } = useActiveCycleQuery();
  const {
    isLoading: isLoadingRounds,
    isError: isErrorRounds,
    error: errorRounds,
  } = useRoundsQuery();

  if (isLoadingCycle || isLoadingRounds) return <Loading />;
  if (isErrorCycle) return <Error message={errorCycle.message} />;
  if (isErrorRounds) return <Error message={errorRounds.message} />;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.content}>
        <Header />
        <Balance />
        <ActionButtons />
        <RecentRounds maxItems={3} />
      </View>

      {/* Modals */}
      <PaymentModal />
      <ReceiveModal />
      <InfoModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 20,
  },
});
