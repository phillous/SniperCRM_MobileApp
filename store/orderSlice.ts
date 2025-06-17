// store/orderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  selectedCategoryIndex: number;
}


const initialState: OrderState = {
  selectedCategoryIndex: 0, // or your default status
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // if using Redux
    setSelectedCategoryIndex(state, action: PayloadAction<number>) {
      state.selectedCategoryIndex = action.payload;
    },
  },
});

export const { setSelectedCategoryIndex } = orderSlice.actions;
export default orderSlice.reducer;
