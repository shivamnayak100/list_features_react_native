import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

interface ListComponentProps<T> {
  data: T[];
  renderItem: (item: T) => JSX.Element;
  keyExtractor: (item: T, index: number) => string;
  emptyMessage?: string;
}

const ListComponent = <T,>({ 
  data, 
  renderItem, 
  keyExtractor, 
  emptyMessage = 'No data available' 
}: ListComponentProps<T>) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={keyExtractor}
      ListEmptyComponent={<Text style={styles.emptyText}>{emptyMessage}</Text>}
      contentContainerStyle={data.length === 0 && styles.emptyContainer}
    />
  );
};

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListComponent;
