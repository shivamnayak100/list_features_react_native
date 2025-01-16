import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useDocumentStore } from '../stores/zustand/documentStore';
import ListComponent from '../components/ListComponent';
import { Document } from '../types/documentType';

const DocumentListScreen = () => {
  const { isLoading, isError, docsList, fetchTransferSpaceDocuments } = useDocumentStore();

  const payload = {
    search_query: '',
    company_id: 0,
    doc_from_date: '',
    doc_to_date: '',
    doc_status: 0,
    platform: true,
    page: 1,
    page_size: 10,
    sort_type: 0,
    sort_order: 0,
  };
  

  useEffect(() => {
    fetchTransferSpaceDocuments(payload);
  }, []);

  const renderDocumentItem = (item: Document) => (
    <View style={styles.card}>
      <Image source={{ uri: item.company_logo }} style={styles.logo} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.doc_name}</Text>
        <Text style={styles.subtitle}>{item.doc_date}</Text>
        <Text style={styles.subtitle}>{item.reference_number}</Text>
      </View>
    </View>
  );

  if (isLoading) {
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
        keyExtractor={(item) => item.id.toString()}
        emptyMessage="No documents found."
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
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default DocumentListScreen;
