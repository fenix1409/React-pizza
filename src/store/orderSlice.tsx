import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../service/Products";

interface InitialStateType {
    orderList: ProductType[];
}

const initialState: InitialStateType = {
    orderList: [],
};

export const orderSlice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {
        saveOrderProducts: (state: InitialStateType, action: PayloadAction<ProductType>) => {
            const id = state.orderList.findIndex((item: ProductType) => item.id === action.payload.id);
            if (id === -1) {
                return {
                    orderList: [...state.orderList, action.payload],
                };
            } else {
                state.orderList.splice(id, 1, action.payload);
            }
        },
        deleteOrderProduct: (state: InitialStateType, action: PayloadAction<string>) => {
            const id = state.orderList.findIndex((item) => item.id === action.payload);
            state.orderList.splice(id, 1);
        },
        increment: (state: InitialStateType, action: PayloadAction<ProductType>) => {
            state.orderList = state.orderList.map(item => item.id === action.payload.id ? { ...item, orderCount: item.orderCount + 1 } : item)
        },
        decrement: (state: InitialStateType, action: PayloadAction<ProductType>) => {
            if (action.payload.orderCount == 1) {
                const deleteIndex = state.orderList.findIndex(item => item.id === action.payload.id)
                state.orderList.splice(deleteIndex, 1)
            }
            else {
                state.orderList = state.orderList.map(item => item.id === action.payload.id ? { ...item, orderCount: item.orderCount - 1 } : item)
            }
        },
        clearOrders: () => {
            return {
                orderList: []
            }
        }
    },
});

export const { saveOrderProducts, deleteOrderProduct, increment, decrement, clearOrders } = orderSlice.actions;
