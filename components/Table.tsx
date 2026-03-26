import { colors } from '@/constants/colors';
import { useActiveCycleQuery, useRoundsQuery } from '@/hooks/queries';
import type { CycleRound } from '@/types';
import { formatCurrency } from '@/utils/currency';
import { formatDate } from '@/utils/date';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function Table() {
  const { refetch: refetchCycle, isRefetching: isRefetchingCycle } = useActiveCycleQuery();
  const {
    data: rounds = [],
    refetch: refetchRounds,
    isRefetching: isRefetchingRounds,
  } = useRoundsQuery();

  const isFetching = isRefetchingCycle || isRefetchingRounds;

  const rotateValue = useRef(new Animated.Value(0)).current;

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
    await refetchCycle();
    await refetchRounds();
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
        <Text style={[styles.headerCell, styles.bidCell]}>Tiền đóng</Text>
      </View>

      <ScrollView style={styles.body}>
        {rounds.length > 0 ? (
          rounds.map((round) => <TableRow key={round.id} row={round} />)
        ) : (
          <Text style={[styles.cell, styles.emptyCell]}>chưa đóng hụi</Text>
        )}
      </ScrollView>
    </View>
  );
}

type TableRowProps = {
  row: CycleRound;
};

function TableRow({ row }: TableRowProps) {
  return (
    <View style={[styles.row, row.status === 'dead' ? styles.dead : {}]}>
      <View style={[styles.cell, styles.idCell]}>
        <Text style={styles.idCellText}>
          {row.status === 'received' ? (
            <MaterialIcons name="star" size={18} color={colors.primary} />
          ) : (
            <>{row.round}</>
          )}
        </Text>
      </View>

      <View style={[styles.cell, styles.dateCell]}>
        <Text>{formatDate(row.date)}</Text>
        <Text style={styles.subText}>ÂL: {formatDate(row.lunarDate, 'DD/MM')}</Text>
      </View>

      <View style={[styles.cell, styles.bidCell]}>
        <Text>{row.status === 'received' ? 'Hốt hụi' : formatCurrency(row.paymentAmount)}</Text>
        <Text style={styles.subText}>
          ({row.bidAmount ? formatCurrency(row.bidAmount) : 'Hụi chết'})
        </Text>
      </View>
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
  dead: {
    backgroundColor: '#fafafa',
  },
  cell: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
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
    flex: 4,
  },
  bidCell: {
    flex: 4,
  },
  emptyCell: {
    padding: 20,
    textAlign: 'center',
    color: '#868e96',
    fontSize: 14,
    fontStyle: 'italic',
  },
  subText: {
    color: colors.secondary,
  },
});
