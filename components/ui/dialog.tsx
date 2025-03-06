import React, { type PropsWithChildren, type ReactNode } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import Button from './button';

type DialogProps = PropsWithChildren<{
  visible: boolean;
  title: string;
  onClose: () => void;
  submitButton?: ReactNode;
}>;

export default function Dialog(props: DialogProps) {
  const { visible, title, onClose, submitButton, children } = props;

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.content}>{children}</View>

          <View style={styles.actionButton}>
            <Button variant="text" onPress={onClose}>
              Hủy
            </Button>

            {submitButton}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    width: 300,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {},
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
});
