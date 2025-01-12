import BASE_URL from '@/services/api/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Define the initial state for the forum slice
interface ForumState {
  posts: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ForumState = {
  posts: [],
  loading: false,
  error: null,
};

// Helper function to get the appropriate token
const getAuthToken = () => {
  const sellerToken = Cookies.get('sellerAccessToken') || null;
  const buyerToken = Cookies.get('buyerAccessToken') || null;

  return sellerToken || buyerToken;
};

// Async thunk to add a post
export const addPost = createAsyncThunk<
  any,
  { title: string; content: string; category: string },
  { rejectValue: string }
>('forum/addPost', async (postData, { rejectWithValue }) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('User not authenticated.');

    const response = await axios.post(
      `${BASE_URL}/chat/topics/`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error Response:', error.response?.data);
    return rejectWithValue(
      error.response?.data?.detail || 'Failed to add post'
    );
  }
});

// Async thunk to toggle like
export const toggleLikePost = createAsyncThunk<
  { topicId: string; liked: boolean },
  { topicId: string },
  { rejectValue: string }
>('forum/toggleLikePost', async ({ topicId }, { rejectWithValue }) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('User not authenticated.');

    await axios.post(
      `${BASE_URL}/chat/topics/${topicId}/like/`,
      { topic_id: topicId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Assuming success implies the post is now liked
    return { topicId, liked: true };
  } catch (error: any) {
    // Handle toggle logic for "unlike" based on API response
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.detail === 'You have already liked this post.'
    ) {
      // Unlike the post
      return { topicId, liked: false };
    }

    return rejectWithValue(
      error.response?.data?.detail || 'Failed to toggle like'
    );
  }
});

// Async thunk to reply to a post
export const replyToPost = createAsyncThunk<
  any,
  { topicId: string; content: string },
  { rejectValue: string }
>('forum/replyToPost', async ({ topicId, content }, { rejectWithValue }) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('User not authenticated.');

    const response = await axios.post(
      `${BASE_URL}/chat/topics/${topicId}/reply/`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { topicId, reply: response.data }; // Return the topic ID and the reply object
  } catch (error: any) {
    console.error('Error Response:', error.response?.data);
    return rejectWithValue(
      error.response?.data?.detail || 'Failed to reply to the post'
    );
  }
});

// Async thunk to fetch posts
export const fetchPosts = createAsyncThunk<
  any[],
  void,
  { rejectValue: string }
>('forum/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/chat/topics/`
    );
    return response.data.results;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.detail || 'Failed to fetch posts'
    );
  }
});

// Create the forum slice
const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addPost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload; // Store fetched posts
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(toggleLikePost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleLikePost.fulfilled, (state, action) => {
        state.loading = false;
        const { topicId, liked } = action.payload;
        const post = state.posts.find(post => post.id === topicId);
        if (post) {
          post.total_likes = liked
            ? post.total_likes + 1
            : Math.max(0, post.total_likes - 1);
          post.liked_by_user = liked;
        }
      })
      .addCase(toggleLikePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to toggle like';
      })
      .addCase(replyToPost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(replyToPost.fulfilled, (state, action) => {
        state.loading = false;
        const { topicId, reply } = action.payload;
        const post = state.posts.find(post => post.id === topicId);
        if (post) {
          post.replies.push(reply);
        }
      })
      .addCase(replyToPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to reply to the post';
      });
  },
});

// Selectors
export const selectForumPosts = (state: { forum: ForumState }) =>
  state.forum.posts;
export const selectForumLoading = (state: { forum: ForumState }) =>
  state.forum.loading;
export const selectForumError = (state: { forum: ForumState }) =>
  state.forum.error;

export default forumSlice.reducer;
