import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './reducer/mainreducers';

// const resetStoreActionType = 'main/resetStore';
// console.log('resetStoreActionType',resetStoreActionType);

const store = configureStore({
  reducer: reducers,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

// const combinedReducer = combineReducers(reducers);
// const rootReducer = (state: any, action: any) => {
//   // when a logout action is dispatched it will reset redux state
//   if (action.type === resetStoreActionType) {
//     // eslint-disable-next-line
//     state = undefined;
//   }
//   return combinedReducer(state, action);
// };

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
// });

// export const resetStore = () => {
//   store.dispatch({ type: resetStoreActionType });
// };

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export default store;
