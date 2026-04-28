import { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import store from './src/redux/store';
import { fetchUsers, loadMore } from './src/redux/usersSlice';
import UserCard from './src/components/UserCard';
import SearchBar from './src/components/SearchBar';

function UserListScreen() {
  const dispatch = useDispatch();
  const { list, displayedCount, searchQuery, status, error } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filtered = list.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayed = filtered.slice(0, displayedCount);
  const hasMore = displayedCount < filtered.length;

  const renderUser = useCallback(
    ({ item }) => <UserCard user={item} />,
    []
  );

  const keyExtractor = useCallback((item) => String(item.id), []);

  const ListHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>
          <Text style={styles.titleAccent}>User</Text>List
        </Text>
        <Text style={styles.subtitle}>
          {filtered.length} user{filtered.length !== 1 ? 's' : ''} found
        </Text>
      </View>
      <SearchBar />
    </>
  );

  const ListFooter = () => (
    <View style={styles.footer}>
      {status === 'loading' && (
        <ActivityIndicator size="large" color="#7c6cfc" />
      )}
      {status === 'failed' && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => dispatch(fetchUsers())}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
      {status === 'succeeded' && hasMore && (
        <TouchableOpacity
          style={styles.loadMoreBtn}
          onPress={() => dispatch(loadMore())}
          activeOpacity={0.8}
        >
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      )}
      {status === 'succeeded' && !hasMore && filtered.length > 0 && (
        <Text style={styles.endText}>All users loaded</Text>
      )}
      {status === 'succeeded' && filtered.length === 0 && (
        <Text style={styles.emptyText}>No users match your search.</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <FlatList
        data={displayed}
        renderItem={renderUser}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={5}
        getItemLayout={(_, index) => ({
          length: 90,
          offset: 90 * index,
          index,
        })}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <UserListScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f0f11',
  },
  listContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#f0f0f4',
    letterSpacing: -0.5,
  },
  titleAccent: {
    color: '#7c6cfc',
  },
  subtitle: {
    color: '#8888a0',
    fontSize: 14,
    marginTop: 4,
  },
  footer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  errorBox: {
    alignItems: 'center',
    gap: 12,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
    textAlign: 'center',
  },
  retryBtn: {
    backgroundColor: 'rgba(255,107,107,0.15)',
    borderWidth: 1,
    borderColor: '#ff6b6b',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  retryText: {
    color: '#ff6b6b',
    fontWeight: '600',
    fontSize: 14,
  },
  loadMoreBtn: {
    backgroundColor: 'rgba(124,108,252,0.15)',
    borderWidth: 1,
    borderColor: '#7c6cfc',
    borderRadius: 10,
    paddingHorizontal: 32,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  loadMoreText: {
    color: '#7c6cfc',
    fontSize: 15,
    fontWeight: '600',
  },
  endText: {
    color: '#8888a0',
    fontSize: 13,
  },
  emptyText: {
    color: '#8888a0',
    fontSize: 14,
    marginTop: 40,
    textAlign: 'center',
  },
});
