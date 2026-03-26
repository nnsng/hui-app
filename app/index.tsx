import { Error, Loading, Table } from '@/components';
import { Footer, Header } from '@/components/layouts';
import { InfoModal, ReceiveModal } from '@/components/modals';
import { PaymentModal } from '@/components/modals/PaymentModal';
import { Button } from '@/components/ui';
import { colors } from '@/constants/colors';
import { useModal } from '@/contexts/ModalContext';
import { useActiveCycleQuery, useRoundsQuery } from '@/hooks/queries';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const { data: cycle, isLoading: isLoadingCycle } = useActiveCycleQuery();
  const { data: rounds = [], isLoading: isLoadingRounds, isError, error } = useRoundsQuery();

  const { onOpen: onOpenInformationModal } = useModal('info');
  const { onOpen: onOpenPaymentModal } = useModal('payment');

  if (isLoadingCycle || isLoadingRounds) return <Loading />;

  if (isError) return <Error message={error.message} />;

  const canMakePayment = rounds.length < cycle!.totalRounds - (!!cycle!.receivedDate ? 0 : 1);

  return (
    <SafeAreaView style={styles.app}>
      <Header />

      <View style={styles.main}>
        <View style={styles.buttonContainer}>
          <Button variant="outlined" style={styles.button} onPress={onOpenInformationModal}>
            Thông tin
          </Button>

          <Button disabled={!canMakePayment} style={styles.button} onPress={onOpenPaymentModal}>
            Đóng hụi
          </Button>
        </View>

        <View style={styles.tableContainer}>
          <Table />
        </View>
      </View>

      <Footer />

      {/* Modals */}
      <InfoModal />
      <PaymentModal />
      <ReceiveModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.white,
    gap: 16,
  },
  main: {
    flex: 1,
    gap: 16,
  },
  buttonContainer: {
    flexShrink: 0,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
  },
  tableContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
