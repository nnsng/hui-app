import { Error, Loading, Table } from '@/components';
import { Footer, Header } from '@/components/layouts';
import { ContributionModal, InfoModal, PayoutModal } from '@/components/modals';
import { Button } from '@/components/ui';
import { colors } from '@/constants/colors';
import { useModal } from '@/contexts/ModalContext';
import { useActiveGroupQuery, usePeriodsQuery } from '@/hooks/queries';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const { data: group, isLoading: isLoadingGroup } = useActiveGroupQuery();
  const { data: periods, isLoading: isLoadingPeriods, isError, error } = usePeriodsQuery();

  const { onOpen: onOpenInformationModal } = useModal('info');
  const { onOpen: onOpenContribution } = useModal('contribution');

  if (isLoadingGroup || isLoadingPeriods) return <Loading />;

  if (isError) return <Error message={error.message} />;

  const isLastPeriod = (periods?.length ?? 0) + 1 >= (group?.totalMembers ?? 0);

  return (
    <SafeAreaView style={styles.app}>
      <Header />

      <View style={styles.main}>
        <View style={styles.buttonContainer}>
          <Button variant="outlined" style={styles.button} onPress={onOpenInformationModal}>
            Thông tin
          </Button>

          <Button disabled={isLastPeriod} style={styles.button} onPress={onOpenContribution}>
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
      <ContributionModal />
      <PayoutModal />
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
