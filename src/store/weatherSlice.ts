import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.message || "City not found or API error"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

interface WeatherState {
  city: string;
  data: {
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
      deg: number;
    };
    name: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  city: "",
  data: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCity(state, action) {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCity } = weatherSlice.actions;
export default weatherSlice.reducer;
