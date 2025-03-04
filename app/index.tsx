import ContributionDialog from '@/components/contribution-dialog';
import Error from '@/components/error';
import Footer from '@/components/footer';
import InformationDialog from '@/components/information-dialog';
import Loading from '@/components/loading';
import Table from '@/components/table';
import Button from '@/components/ui/button';
import { useGetData } from '@/hooks/queries';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function Index() {
  const { data, isLoading, isError, error } = useGetData();

  const [openDialog, setOpenDialog] = useState(false);
  const [openInformationDialog, setOpenInformationDialog] = useState(false);

  if (isLoading) return <Loading />;

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
        <Table data={data ?? []} />
      </View>

      <View style={styles.footerContainer}>
        <Footer />
      </View>

      <InformationDialog
        visible={openInformationDialog}
        onClose={() => setOpenInformationDialog(false)}
      />

      <ContributionDialog
        visible={openDialog}
        onSubmit={(value) => console.log('submit', value)}
        onClose={() => setOpenDialog(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    gap: 10,
    padding: 10,
  },
  buttonContainer: {
    flexShrink: 0,
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
  },
  tableContainer: {
    flex: 1,
  },
  footerContainer: {
    flexShrink: 0,
  },
});
