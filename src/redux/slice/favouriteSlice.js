import { createSelector, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    // itemList: [],
    favoriteItemsList: [],
    // favoriteItemsList: JSON.parse(localStorage.getItem('moonCartFavoritesItems')) || [],
};
 
const favoriteReducerSlice = createSlice({
    name: 'favoriteSlice',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const newItem = action.payload;

            const existingItemIdx = state.favoriteItemsList.findIndex(item => item.id === newItem.id);

            if (existingItemIdx !== -1) {
                // item already exists, increment its qty
                state.favoriteItemsList[existingItemIdx].quantity++;
            } else {
                state.favoriteItemsList.push({
                    id: newItem.id,
                    cover: newItem.images,
                    title: newItem.title,
                    quantity: 1,
                    price: newItem.price,
                    totalPrice: newItem.price,
                })
            }
        },

        removeFromFavorites(state, action) {
            const idToRemove = action.payload;

            state.favoriteItemsList = state.favoriteItemsList.filter((item) => item.id !== idToRemove);
        },

        clearAllFavorites: (state, action) => {
            state.favoriteItemsList = [];
        },
    },
});


export const favoriteReducerActions = favoriteReducerSlice.actions;

export default favoriteReducerSlice.reducer

// base selector
export const selectFavoriteState = (state) => {
    console.log('favorite state: ', state);
    console.log('favorite state: ', state.favorite)
    return (state.favorite);
}

export const selectFavoriteItems = createSelector(
    [selectFavoriteState],
    (item) => item?.favoriteItemsList
)

export const selectTotalFavorites = createSelector(
    [selectFavoriteItems],
    (favoriteItemList) => favoriteItemList?.length
)