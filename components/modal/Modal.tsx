import { Button, Typography } from '@/components/common';
import { palette } from '@/constants/palette';
import { fontSize } from '@/constants/typography';
import { useRouter } from 'expo-router';
import { type PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ModalProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  submitLabel?: string;
  submitDisabled?: boolean;
  submitLoading?: boolean;
  onSubmit?: () => Promise<void>;
  scrollable?: boolean;
}>;

export function Modal(props: ModalProps) {
  const {
    title,
    // subtitle,
    submitLabel,
    submitDisabled,
    submitLoading,
    onSubmit,
    children,
    scrollable = true,
  } = props;

  const router = useRouter();

  const handlePrimary = async () => {
    if (submitDisabled || submitLoading) return;
    await onSubmit?.();
    handleClose();
  };

  const handleClose = () => {
    if (router.canGoBack()) router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Button
            variant="soft"
            size="xs"
            icon="chevron-back"
            iconSize={22}
            iconColor={palette.primary}
            onPress={handleClose}
          />

          <View style={styles.headerCenter}>
            <Typography numberOfLines={1} style={styles.title}>
              {title}
            </Typography>
            {/* {subtitle && (
              <Typography numberOfLines={1} style={styles.subtitle}>
                {subtitle}
              </Typography>
            )} */}
          </View>

          <View style={styles.headerSpacer} />
        </View>

        {scrollable ? (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.flex, styles.contentContainer]}>{children}</View>
        )}

        {submitLabel && (
          <View style={styles.footer}>
            <Button
              label={submitLabel}
              onPress={handlePrimary}
              disabled={submitDisabled}
              loading={submitLoading}
              fullWidth
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.divider,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: 600,
    color: palette.textPrimary,
  },
  subtitle: {
    marginTop: 2,
    fontSize: fontSize.xs,
    color: palette.textPrimary,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: palette.divider,
    backgroundColor: palette.background,
  },
});
