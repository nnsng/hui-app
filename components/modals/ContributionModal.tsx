import { AppModel, Input, List } from '@/components/ui';
import { useContributeMutation } from '@/hooks/mutations';
import { useActiveGroupQuery } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, type TextInput } from 'react-native';

type ContributionModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function ContributionModal({ visible, onClose }: ContributionModalProps) {
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
  }, [visible, isPayout]);

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
      enabled: !isPayout,
    },
    {
      label: 'Số tiền cần đóng',
      value: formatCurrency(contributedAmount),
    },
  ];

  return (
    <AppModel
      title={isPayout ? 'Đóng hụi chết' : 'Đóng hụi'}
      visible={visible}
      onClose={handleClose}
      submitButtonProps={{
        children: 'Đóng hụi',
        loading: isPending,
        disabled: !isPayout && (!input || error),
        onPress: handleSubmit,
      }}
    >
      {!isPayout && (
        <Input
          inputRef={inputRef}
          placeholder="Số tiền kêu"
          keyboardType="numeric"
          value={input}
          onChangeText={handleChangeText}
          error={error ? 'Số tiền không hợp lệ' : ''}
        />
      )}

      {!error && <List data={listData} style={isPayout ? {} : styles.list} />}
    </AppModel>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 10,
  },
});
