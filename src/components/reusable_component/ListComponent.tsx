import React from 'react';
import { FlatList, Text, StyleSheet, ActivityIndicator, View, RefreshControl } from 'react-native';

interface ListComponentProps<T> {
  data: T[];
  renderItem: (item: T) => JSX.Element;
  keyExtractor: (item: T, index: number) => string;
  emptyMessage?: string;
  onEndReached?: () => void;  // Function to trigger when reaching the end
  onEndReachedThreshold?: number;  // How far from the end to trigger loading
  isFetching?: boolean;  // To control loading indicator
  ListFooterComponent?: JSX.Element;  // Custom footer (loading indicator)
  refreshing?: boolean;  // To control the pull-to-refresh indicator
  onRefresh?: () => void;  // Function to trigger refresh
}

const ListComponent = <T,>({
  data,
  renderItem,
  keyExtractor,
  emptyMessage = 'No data available',
  onEndReached,
  onEndReachedThreshold = 0.5,
  isFetching = false,
  ListFooterComponent,
  refreshing = false,
  onRefresh,
}: ListComponentProps<T>) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={keyExtractor}
      ListEmptyComponent={<Text style={styles.emptyText}>{emptyMessage}</Text>}
      contentContainerStyle={data.length === 0 && styles.emptyContainer}
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      ListFooterComponent={
        isFetching ? (
          <View style={styles.footerContainer}>
            <ActivityIndicator size="small" color="blue" />
          </View>
        ) : (
          ListFooterComponent
        )
      }
      refreshing={refreshing} // remove pull to refresh 
      onRefresh={onRefresh}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
  footerContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
});

export default ListComponent;
