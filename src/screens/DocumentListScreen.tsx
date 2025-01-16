import React, { useEffect, useState } from 'react';
import { Dimensions, View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useDocumentStore } from '../stores/zustand/documentStore';
import ListComponent from '../components/ListComponent';  // Assuming this is your custom List component
import { Document } from '../types/documentType';

const screenWidth = Dimensions.get('window').width;

const DocumentListScreen = () => {
  const { isLoading, isError, docsList, fetchTransferSpaceDocuments } = useDocumentStore();

  // State for pagination
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const payload = {
    search_query: '',
    company_id: 0,
    doc_from_date: '',
    doc_to_date: '',
    doc_status: 0,
    platform: true,
    page,
    page_size: 20,
    sort_type: 0,
    sort_order: 0,
  };

  useEffect(() => {
    console.log(`Fetching page: ${page}`);
    if (!isFetching) {
      fetchTransferSpaceDocuments(payload); // Call the API after page change
    }
  }, [page, isFetching, fetchTransferSpaceDocuments]);

  const renderDocumentItem = (item: Document) => (
    <View style={styles.card} key={item.id}> {/* Ensure each item has a unique key */}
      <Image source={{ uri: item.company_logo }} style={styles.logo} />
      <View style={styles.infoContainer}>
        <Text style={styles.subtitle}>{item.file_name}</Text>
        <Text style={styles.subtitle}>{item.doc_date}</Text>
        <Text style={styles.subtitle}>{item.reference_number}</Text>
      </View>
    </View>
  );

  const handleLoadMore = () => {
    if (!isFetching && !isLoading) {
      setIsFetching(true); // Start fetching data
      setPage(prevPage => prevPage + 1); // Increment the page number
    }
  };

  const handleEndReached = () => {
    // When the list reaches the end, trigger the `handleLoadMore` function
    handleLoadMore();
  };

  const handleRefresh = () => {
    setPage(1); // Reset to the first page
    setIsFetching(false);
  };

  // When the API fetches data, set isFetching to false after data is loaded
  useEffect(() => {
    if (!isFetching || isLoading) return; // Prevent updating state when already fetching or loading
    setIsFetching(false); // Reset isFetching once the documents are fetched
  }, [docsList, isFetching, isLoading]);

  if (isLoading && page === 1) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load documents. Please try again.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ListComponent<Document>
        data={docsList}
        renderItem={renderDocumentItem}
        keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key
        emptyMessage="No documents found."
        onEndReached={handleEndReached}  // Triggers when user scrolls to the bottom
        onEndReachedThreshold={0.5}  // Trigger pagination when the user is halfway down
        ListFooterComponent={
          isFetching ? (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="blue" />
            </View>
          ) : null
        }
        onRefresh={handleRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    width: screenWidth,
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 25,
  },
  infoContainer: {
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
});

export default DocumentListScreen;
