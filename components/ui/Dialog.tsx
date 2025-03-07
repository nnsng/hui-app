import { colors } from '@/constants/colors';
import React, { useEffect, useRef, type PropsWithChildren, type ReactNode } from 'react';
import {
  Animated,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button } from './Button';

type DialogProps = PropsWithChildren<{
  visible: boolean;
  title: string;
  onClose: () => void;
  submitButton?: ReactNode;
}>;

export function Dialog(props: DialogProps) {
  const { visible, title, onClose, submitButton, children } = props;

  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        damping: 100,
        stiffness: 1000,
      }).start();
    } else {
      scaleAnim.setValue(0.8);
    }
  }, [visible]);

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose} accessible={false}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Animated.View style={[styles.dialog, { transform: [{ scale: scaleAnim }] }]}>
              <Text style={styles.title}>{title}</Text>

              <View style={styles.content}>{children}</View>

              <View style={styles.actionButton}>
                <Button variant="text" onPress={onClose}>
                  Hủy
                </Button>

                {submitButton}
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
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
    width: '90%',
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  content: {
    marginVertical: 10,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
});
