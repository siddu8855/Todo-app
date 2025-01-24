import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Todo } from '../types';

const WEATHER_API_KEY = '24c667681b1a4694be490518252401';
const WEATHER_API_URL = 'https://api.weatherapi.com/v1/current.json';

export const fetchWeatherForTodo = createAsyncThunk(
  'todos/fetchWeather',
  async (todoId: string) => {
    try {
      const response = await axios.get(WEATHER_API_URL, {
        params: {
          key: WEATHER_API_KEY,
          q: 'auto:ip', // This will detect location based on IP
          aqi: 'no'
        }
      });

      return {
        todoId,
        weather: {
          temp: response.data.current.temp_c,
          condition: response.data.current.condition.text
        }
      };
    } catch (error) {
      console.error('Weather fetch failed:', error);
      throw error;
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForTodo.fulfilled, (state, action) => {
        const todo = state.find(todo => todo.id === action.payload.todoId);
        if (todo) {
          todo.weather = action.payload.weather;
        }
      })
      .addCase(fetchWeatherForTodo.rejected, (state, action) => {
        console.error('Failed to fetch weather:', action.error);
      });
  },
});

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;