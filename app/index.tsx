import { Error, Loading, Table } from '@/components';
import { ContributionDialog, InformationDialog } from '@/components/dialogs';
import { Footer, Header } from '@/components/layouts';
import { Button } from '@/components/ui';
import { colors } from '@/constants/colors';
import { useActiveGroupQuery, usePeriodsQuery } from '@/hooks/queries';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export default function Index() {
  const { isLoading: isLoadingGroup } = useActiveGroupQuery();
  const { isLoading: isLoadingPeriods, isError, error } = usePeriodsQuery();

  const [openDialog, setOpenDialog] = useState(false);
  const [openInformationDialog, setOpenInformationDialog] = useState(false);

  if (isLoadingPeriods || isLoadingGroup) return <Loading />;

  if (isError) return <Error message={error.message} />;

  return (
    <SafeAreaView style={styles.app}>
      <Header />

      <View style={styles.main}>
        <View style={styles.buttonContainer}>
          <Button
            variant="outlined"
            style={styles.button}
            onPress={() => setOpenInformationDialog(true)}
          >
            Thông tin
          </Button>

          <Button style={styles.button} onPress={() => setOpenDialog(true)}>
            Đóng hụi
          </Button>
        </View>

        <View style={styles.tableContainer}>
          <Table />
        </View>
      </View>

      <Footer style={styles.footer} />

      <InformationDialog
        visible={openInformationDialog}
        onClose={() => setOpenInformationDialog(false)}
      />

      <ContributionDialog visible={openDialog} onClose={() => setOpenDialog(false)} />
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
  },
  tableContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  footer: {
    flexShrink: 0,
  },
});
