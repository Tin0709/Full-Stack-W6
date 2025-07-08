import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, updateProduct } from '../api/fakeProductApi';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  return await getProducts();
});

export const saveProduct = createAsyncThunk('products/saveProduct', async (product, { rejectWithValue }) => {
  try {
    return await updateProduct(product);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

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
        const index = state.list.findIndex(p => p.id === action.payload.id);
        state.list[index] = action.payload;
        state.error = null;
      })
      .addCase(saveProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { selectProduct, changeQuantity } = productsSlice.actions;
export default productsSlice.reducer;
