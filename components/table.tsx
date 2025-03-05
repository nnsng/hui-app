import type { Round } from '@/types/data';
import { formatCurrency } from '@/utils/currency';
import { formatDate } from '@/utils/date';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

type TableDataProps = {
  data: Round[];
};

export default function TableData({ data }: TableDataProps) {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.headerCell, styles.idCell]}></Text>
        <Text style={[styles.headerCell, styles.dateCell]}>Ngày</Text>
        <Text style={[styles.headerCell, styles.bidCell]}>Đấu giá</Text>
      </View>

      <ScrollView style={styles.body}>
        {data.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            <Text style={[styles.cell, styles.idCell]}>{rowIndex + 1}</Text>
            <Text style={[styles.cell, styles.dateCell]}>{formatDate(row.date)}</Text>
            <Text style={[styles.cell, styles.bidCell]}>{formatCurrency(row.bidAmount)}</Text>
          </View>
        ))}
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
  },
  dateCell: {
    flex: 3,
  },
  bidCell: {
    flex: 3,
  },
});
