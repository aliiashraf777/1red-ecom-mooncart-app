import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slice/cartSlice';
import favoriteReducer from './slice/favouriteSlice';
// import throttle from 'lodash/throttle';

import { initialState as cartInitialState } from "./slice/cartSlice";
import { initialState as favoritesInitialState } from "./slice/favouriteSlice";

// step 1
import { loadState, saveState } from "../utils/localStorage";

const persistedCart = loadState('moonCartItems');
const persistedFavorite = loadState('moonFavorites')

// step 2
const preloadedState = {
    // cart: {
    //     itemList: loadState('moonCartItems') || [],
    // },

    // for full slice persist
    // cart: loadState('moonCartItems') || undefined,
    cart: {
        ...cartInitialState,
        ...(persistedCart || {}),
    },

    // favorite: {
    //     favoriteItemsList: loadState('moonFavorites') || [],
    // },

    // favorite: loadState('moonFavorites') || undefined,

    favorite: {
        ...favoritesInitialState,
        ...(persistedFavorite || {}),
    },
};

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        favorite: favoriteReducer,
    },

    // step 3
    preloadedState,
});


// persist on every state change
store.subscribe(() => {
    // const state = store.getState();
    // localStorage.setItem('moonCartItems', JSON.stringify(state.cart.itemList));
    // localStorage.setItem('moonCartFavoritesItems', JSON.stringify(state.favorite.favoriteItemsList));


    // step 4 - exclude or include state from slice
    const state = store.getState();

    console.log('hydrated cart:', store.getState().cart);
    console.log('hydrated fav state:', store.getState().favorite)

 
    // step 5 - save single state or entire slice
    // saveState('moonCartItems', state.cart.itemList);

    // for full cart persist
    saveState('moonCartItems', state.cart)

    // saveState('moonFavorites', state.favorite.favoriteItemsList);
    saveState('moonFavorites', state.favorite);
});