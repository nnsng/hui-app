import ContributionDialog from '@/components/contribution-dialog';
import Error from '@/components/error';
import Footer from '@/components/footer';
import InformationDialog from '@/components/information-dialog';
import Loading from '@/components/loading';
import TableData from '@/components/table';
import Button from '@/components/ui/button';
import { colors } from '@/constants/colors';
import useContribution from '@/hooks/mutations/use-contribution';
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

      <View style={styles.footerContainer}>
        <Footer />
      </View>

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
    paddingTop: 10,
    backgroundColor: colors.white,
  },
  top: {
    backgroundColor: colors.primary,
    padding: 20,
  },
  buttonContainer: {
    flexShrink: 0,
    flexDirection: 'row',
    gap: 10,
    paddingInline: 10,
  },
  button: {
    flex: 1,
  },
  tableContainer: {
    flex: 1,
    padding: 10,
  },
  footerContainer: {
    flexShrink: 0,
  },
});
