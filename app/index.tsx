import ContributionDialog from '@/components/contribution-dialog';
import Error from '@/components/error';
import Footer from '@/components/footer';
import Header from '@/components/header';
import InformationDialog from '@/components/information-dialog';
import Loading from '@/components/loading';
import TableData from '@/components/table';
import Button from '@/components/ui/button';
import { colors } from '@/constants/colors';
import { useGetInformation, useGetRound } from '@/hooks/queries';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function Index() {
  const { isLoading: isLoadingInformation } = useGetInformation();
  const { isLoading, isError, error } = useGetRound();

  const [openDialog, setOpenDialog] = useState(false);
  const [openInformationDialog, setOpenInformationDialog] = useState(false);

  if (isLoading || isLoadingInformation) return <Loading />;

  if (isError) return <Error message={error.message} />;

  return (
    <View style={styles.app}>
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
          <TableData />
        </View>
      </View>

      <Footer style={styles.footer} />

      <InformationDialog
        visible={openInformationDialog}
        onClose={() => setOpenInformationDialog(false)}
      />

      <ContributionDialog visible={openDialog} onClose={() => setOpenDialog(false)} />
    </View>
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
