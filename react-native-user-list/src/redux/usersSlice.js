import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = 'cached_users';
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Transform address object into a single formatted string
const transformUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  address: `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`,
});

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      const transformed = data.map(transformUser);
      // Cache data for offline support
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(transformed));
      return transformed;
    } catch (error) {
      // Try to return cached data on network failure
      try {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) return JSON.parse(cached);
      } catch {}
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    displayedCount: 5,
    searchQuery: '',
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    fromCache: false,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.displayedCount = 5; // reset pagination on search
    },
    loadMore: (state) => {
      state.displayedCount += 5;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { setSearchQuery, loadMore } = usersSlice.actions;
export default usersSlice.reducer;
