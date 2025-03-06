import { colors } from '@/constants/colors';
import { useGetInformation, useGetRound } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { formatDate } from '@/utils/date';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TableData() {
  const informationQuery = useGetInformation();
  const roundQuery = useGetRound();
  const isFetching = informationQuery.isRefetching || roundQuery.isRefetching;

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
    await informationQuery.refetch();
    await roundQuery.refetch();
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
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <MaterialIcons name="sync" size={18} color={colors.primary} />
            </Animated.View>
          </TouchableOpacity>
        </Text>
        <Text style={[styles.headerCell, styles.dateCell]}>Ngày</Text>
        <Text style={[styles.headerCell, styles.bidCell]}>Đấu giá</Text>
      </View>

      <ScrollView style={styles.body}>
        {roundQuery.data ? (
          roundQuery.data.map((row, rowIndex) => (
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
  },
  header: {
    flexShrink: 0,
  },
  body: {
    flex: 1,
    overflow: 'scroll',
  },
  row: {
    flexDirection: 'row',
  },
  payout: {
    backgroundColor: '#f1f1f1',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f1f1f1',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#000',
  },
  cell: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
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
    padding: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
