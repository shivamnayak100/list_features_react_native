import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions, View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useDocumentStore } from '../stores/zustand/documentStore';
import { Appbar } from 'react-native-paper';
import ListComponent from '../components/reusable_component/ListComponent'; // Assuming this is your custom List component
import SearchBar from '../components/reusable_component/SearchBar'; // Importing the new SearchBar component
import { Document } from '../types/documentType';
import { GalleryTheme } from '../utils/theme';
const screenWidth = Dimensions.get('window').width;

const DocumentListScreen = () => {
  const { docsList, fetchTransferSpaceDocuments } = useDocumentStore();

  // State for pagination
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery); // Update the debounced query after 500ms
    }, 500);

    return () => {
      clearTimeout(handler); // Clear timeout on each render to reset the delay
    };
  }, [searchQuery]);

  // Fetch documents
  const fetchDocuments = useCallback(async () => {
    setIsLoading(true); // Show loader for ListComponent
    const payload = {
      search_query: debouncedQuery, // Use debounced query
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
    await fetchTransferSpaceDocuments(payload, page === 1); // Fetch documents based on payload
    setIsLoading(false); // Hide loader
  }, [debouncedQuery, page, fetchTransferSpaceDocuments]);

  // Trigger fetch on debouncedQuery or page change
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const renderDocumentItem = (item: Document) => (
    <View style={styles.card} key={item.id?.toString()}>
      <Image source={{ uri: item.company_logo }} style={styles.logo} />
      <View style={styles.infoContainer}>
        <Text style={styles.subtitle}>{item.file_name?.toString() || 'N/A'}</Text>
        <Text style={styles.subtitle}>{item.doc_date?.toString() || 'N/A'}</Text>
        <Text style={styles.subtitle}>{item.reference_number?.toString() || 'N/A'}</Text>
      </View>
    </View>
  );

  const handleSearch = () => {
    setPage(1); // Reset to the first page when performing a search
  };

  const handleLoadMore = () => {
    if (!isFetching && !isLoading) {
      setIsFetching(true); // Start fetching data
      setPage((prevPage) => prevPage + 1); // Increment the page number
    }
  };

  const handleRefresh = () => {
    setPage(1); // Reset to the first page
    setIsFetching(false);
  };

  return (
    <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Document List" subtitle="Browse and search documents" />
      </Appbar.Header>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={handleSearch} // Trigger search action
      />
      <ListComponent<Document>
        data={docsList}
        renderItem={renderDocumentItem}
        keyExtractor={(item) => item.id?.toString() || ''} // Ensure each item has a unique key
        emptyMessage="No documents found."
        onEndReached={handleLoadMore} // Trigger pagination
        onEndReachedThreshold={0.5}
        // refreshing={isFetching || isLoading}
        onRefresh={handleRefresh}
        ListFooterComponent={
          isLoading && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="blue" />
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#f9f9f9',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  appbar: {
    backgroundColor: GalleryTheme.colors.primary, // Set to the red color you prefer
    elevation: 10, // Add shadow for depth
    width: screenWidth, // Ensure full width of the screen is covered
  },
});

export default DocumentListScreen;
