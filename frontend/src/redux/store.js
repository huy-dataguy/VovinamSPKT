import { configureStore } from '@reduxjs/toolkit'
import fighterApi from './features/fighterAPI'
export const store = configureStore({
  reducer: {
    [fighterApi.reducerPath]: fighterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(fighterApi.middleware)
})

// import { configureStore } from '@reduxjs/toolkit'

// export const store = configureStore({
//   reducer: {},
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, 
//     }),
// })
