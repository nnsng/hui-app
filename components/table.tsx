import { colors } from '@/constants/colors';
import { useGetPool, useGetRound } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { formatDate } from '@/utils/date';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TableData() {
  const { refetch: refetchPool, isRefetching: isRefetchingPool } = useGetPool();
  const {
    data: rounds = [],
    refetch: refetchRounds,
    isRefetching: isRefetchingRounds,
  } = useGetRound();
  const isFetching = isRefetchingPool || isRefetchingRounds;

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
    await refetchPool();
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
        <Text style={[styles.headerCell, styles.bidCell]}>Đấu giá</Text>
      </View>

      <ScrollView style={styles.body}>
        {rounds.length > 0 ? (
          rounds.map((row, rowIndex) => (
            <View key={rowIndex} style={[styles.row, row.bidAmount === 0 ? styles.payout : {}]}>
              <Text style={[styles.cell, styles.idCell]}>{rowIndex + 1}</Text>
              <Text style={[styles.cell, styles.dateCell]}>{formatDate(row.date)}</Text>
              <Text style={[styles.cell, styles.bidCell]}>{formatCurrency(row.bidAmount)}</Text>
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
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
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
  },
  idCell: {
    flex: 1,
    textAlign: 'center',
  },
  dateCell: {
    flex: 3,
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
