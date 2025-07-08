import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, updateProduct } from '../api/fakeProductApi';

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  return await getProducts();
});

// Async thunk to save/update a product
export const saveProduct = createAsyncThunk(
  'products/saveProduct',
  async (product, { rejectWithValue }) => {
    try {
      return await updateProduct(product);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    selectedProduct: null,
    error: null,
  },
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
      state.error = null;
    },
    changeQuantity: (state, action) => {
      const { id, delta } = action.payload;
      const product = state.list.find(p => p.id === id);
      if (product) {
        product.quantity += delta;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(saveProduct.fulfilled, (state, action) => {
        state.list = state.list.map(p =>
          p.id === action.payload.id ? action.payload : p
        );
        state.error = null;
      })
      .addCase(saveProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { selectProduct, changeQuantity } = productsSlice.actions;
export default productsSlice.reducer;
