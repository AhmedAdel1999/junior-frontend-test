import { View, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../redux/usersSlice';

export default function SearchBar() {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.users.searchQuery);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search users by name..."
        placeholderTextColor="#8888a0"
        value={query}
        onChangeText={(text) => dispatch(setSearchQuery(text))}
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  input: {
    backgroundColor: '#18181c',
    borderWidth: 1,
    borderColor: '#2e2e38',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#f0f0f4',
    fontSize: 14,
  },
});
