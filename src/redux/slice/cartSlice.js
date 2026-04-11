import { createSelector, createSlice } from '@reduxjs/toolkit'
 
export const initialState = {
    itemList: [],
    // itemList: JSON.parse(localStorage.getItem('moonCartItems')) || [],
    // totalQuantity: 0,
}

const cartReducerSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;

            const existingItem = state.itemList.find(
                (item) => item.id === newItem.id
            )

            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            } else {
                state.itemList.push({
                    id: newItem.id,
                    title: newItem.title,
                    // images: newItem.images,
                    cover: newItem.images,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                });
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload;

            const existingItem = state.itemList.find((item) => item.id === id);

            if (existingItem.quantity === 1) {
                state.itemList = state.itemList.filter(item => item.id !== id)
            }
            else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price
            }
        },
        removeCompleteFromCart: (state, action) => {
            const id = action.payload;

            const item = state.itemList.find(i => i.id === id)

            if (!item) return;

            state.itemList = state?.itemList.filter((item) => item.id !== id)

            // state.totalQuantity -= item.quantity;
        },
        clearCart(state) {
            state.itemList = [];
            // state.totalQuantity = 0;
        },
    }
});

export const cartReducerActions = cartReducerSlice.actions

// base selector
export const selectCartState = (state) => {
    console.log('redux state: ', state);
    console.log('redux state: ', state.cart);
    return state.cart;
}

// memoized selectors
export const selectCartItems = createSelector(
    [selectCartState],
    (item) => item?.itemList
)

export const selectTotalQty = createSelector(
    [selectCartItems],
    // (itemList) => itemList?.reduce((total) => total + 1, 0)
    (itemList) => itemList?.reduce((total, item) => total + item.quantity, 0)
)

export const selectTotalPrice = createSelector(
    [selectCartItems],
    (itemList) => itemList?.reduce((total, item) => total + item.totalPrice, 0)
)

export const selectCartTotalBilling = createSelector(
    [selectCartItems],
    (items) => {
        // const subTotal = items.reduce(
        //     (total, item) => total + item.price * item.quantity, 0
        // )

        const subTotal = items?.reduce((total, item) => total + item.totalPrice, 0);

        const deliveryFee =
            subTotal === 0 ? 0 :
                subTotal > 100 ? 20 :
                    subTotal > 150 ? 30 :
                        subTotal > 500 ? 50 : 20


        const taxes = subTotal * 0.5 / 100;
        // const total = Math.floor(subTotal + deliveryFee + taxes);
        const total = subTotal + deliveryFee + taxes;

        return {
            subTotal,
            deliveryFee,
            taxes,
            total
        };
    }
);

export default cartReducerSlice.reducer

