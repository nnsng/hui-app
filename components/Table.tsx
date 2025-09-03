import { colors } from '@/constants/colors';
import { useLunarDate } from '@/hooks/mutations';
import { useActiveGroupQuery, usePeriodsQuery } from '@/hooks/queries';
import type { HuiPeriod } from '@/types';
import { formatCurrency } from '@/utils/currency';
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function Table() {
  const { refetch: refetchGroup, isRefetching: isRefetchingGroup } = useActiveGroupQuery();
  const {
    data: periods = [],
    refetch: refetchPeriods,
    isRefetching: isRefetchingPeriods,
  } = usePeriodsQuery();
  const isFetching = isRefetchingGroup || isRefetchingPeriods;

  const { mutateAsync: convertToLunar } = useLunarDate();

  const [fullDataPeriods, setFullDataPeriods] = useState<HuiPeriod[]>(periods);

  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const periodPromises = periods.map(async (period): Promise<HuiPeriod> => {
        const lunarDate = await convertToLunar(period.contributionDateSolar);
        return { ...period, contributionDateLunar: lunarDate };
      });
      const fullDataPeriods = await Promise.all(periodPromises);
      setFullDataPeriods(fullDataPeriods);
    })();
  }, [periods]);

  useEffect(() => {
    if (isFetching) {
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      rotateValue.setValue(0);
    }
  }, [isFetching, rotateValue]);

  const refetch = async () => {
    await refetchGroup();
    await refetchPeriods();
  };

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.headerCell, styles.idCell]}>
          <TouchableOpacity onPress={refetch}>
            <Animated.View
              style={[{ transform: [{ rotate: spin }], opacity: isFetching ? 0.7 : 1 }]}
            >
              <MaterialIcons name="sync" size={18} color={colors.primary} />
            </Animated.View>
          </TouchableOpacity>
        </Text>
        <Text style={[styles.headerCell, styles.dateCell]}>Ngày</Text>
        <Text style={[styles.headerCell, styles.bidCell]}>Tiền kêu</Text>
      </View>

      <ScrollView style={styles.body}>
        {fullDataPeriods.length > 0 ? (
          fullDataPeriods.map((row) => (
            <View key={row.id} style={[styles.row, row.bidAmount === 0 ? styles.payout : {}]}>
              <View style={[styles.cell, styles.idCell]}>
                <Text style={styles.idCellText}>{row.period}</Text>
              </View>
              <View style={[styles.cell, styles.dateCell]}>
                <Text>DL: {dayjs(row.contributionDateSolar).format('DD/MM/YYYY')}</Text>
                <Text>ÂL: {row.contributionDateLunar}</Text>
              </View>
              <View style={[styles.cell, styles.bidCell]}>
                <Text>{formatCurrency(row.bidAmount)}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={[styles.cell, styles.emptyCell]}>chưa đóng hụi</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#eef2ff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerCell: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontWeight: 'bold',
    color: colors.text,
    fontSize: 14,
  },
  body: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  rowHighlighted: {
    backgroundColor: '#f8f9fa',
  },
  payout: {
    backgroundColor: '#f8f9fa',
  },
  cell: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: colors.text,
    fontSize: 14,
    justifyContent: 'center',
  },
  idCell: {
    flex: 1,
    textAlign: 'center',
  },
  idCellText: {
    textAlign: 'center',
  },
  dateCell: {
    flex: 5,
  },
  bidCell: {
    flex: 3,
  },
  emptyCell: {
    padding: 20,
    textAlign: 'center',
    color: '#868e96',
    fontSize: 14,
    fontStyle: 'italic',
  },
});
