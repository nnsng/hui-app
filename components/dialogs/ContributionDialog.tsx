import { Button, Dialog, Input, List } from '@/components/ui';
import { useContributeMutation } from '@/hooks/mutations';
import { useActiveGroupQuery } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, type TextInput } from 'react-native';

type ContributionDialogProps = {
  visible: boolean;
  onClose: () => void;
};

export function ContributionDialog({ visible, onClose }: ContributionDialogProps) {
  const { mutateAsync: onContribute, isPending } = useContributeMutation();
  const { data: group, isLoading } = useActiveGroupQuery();
  const isPayout = !isLoading && !!group?.payoutDate;

  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const bidAmount = Number(input);
  const contributedAmount = (group?.contributionAmount ?? 0) - bidAmount;

  useEffect(() => {
    if (visible && !isPayout) {
      inputRef.current?.focus();
    }
  }, [visible]);

  const handleChangeText = (text: string) => {
    setInput(text);
    setError(isNaN(Number(text)));
  };

  const handleClose = () => {
    setInput('');
    setError(false);
    onClose();
  };

  const handleSubmit = async () => {
    if (error) return;

    setError(false);
    await onContribute(bidAmount);
    setInput('');
    handleClose();
  };

  const listData = [
    {
      label: 'Số tiền kêu',
      value: formatCurrency(input),
      enabled: !isPayout && !error,
    },
    {
      label: 'Số tiền cần đóng',
      value: formatCurrency(contributedAmount),
    },
  ];

  return (
    <Dialog
      title={isPayout ? 'Đóng hụi chết' : 'Đóng hụi'}
      visible={visible}
      onClose={handleClose}
      submitButton={
        <Button
          loading={isPending}
          disabled={!isPayout && (!input || error)}
          onPress={handleSubmit}
        >
          Đồng ý
        </Button>
      }
    >
      {!isPayout && (
        <Input
          inputRef={inputRef}
          placeholder="Nhập số tiền kêu..."
          keyboardType="numeric"
          value={input}
          onChangeText={handleChangeText}
          error={error ? 'Vui lòng nhập số tiền hợp lệ' : ''}
        />
      )}
      <List data={listData} style={isPayout ? styles.listPayout : styles.list} />
    </Dialog>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 6,
    marginTop: 10,
  },
  listPayout: {
    marginTop: 0,
  },
});
