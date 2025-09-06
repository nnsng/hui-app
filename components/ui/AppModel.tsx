import { Button, type ButtonProps } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import React, { useEffect, useRef, type PropsWithChildren } from 'react';
import {
  Animated,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type AppModelProps = PropsWithChildren<{
  visible: boolean;
  title: string;
  onClose: () => void;
  submitButtonProps?: ButtonProps;
}>;

export function AppModel(props: AppModelProps) {
  const { visible, title, onClose, submitButtonProps, children } = props;

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
  }, [visible, scaleAnim]);

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose} accessible={false}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Animated.View style={[styles.dialog, { transform: [{ scale: scaleAnim }] }]}>
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
              </View>

              <View style={styles.content}>{children}</View>

              <View style={styles.footer}>
                <Button variant="outlined" style={styles.button} onPress={onClose}>
                  Đóng
                </Button>

                {submitButtonProps && (
                  <Button
                    {...submitButtonProps}
                    style={[styles.button, submitButtonProps?.style]}
                  />
                )}
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
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    padding: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    flex: 1,
  },
});
