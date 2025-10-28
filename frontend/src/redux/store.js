import { configureStore } from '@reduxjs/toolkit'
import fighterApi from './features/fighterAPI'
import matchAPI from './features/matchAPI'
import tournamentAPI from './features/tournamentAPI'
export const store = configureStore({
  reducer: {
    [fighterApi.reducerPath]: fighterApi.reducer,
    [matchAPI.reducerPath]: matchAPI.reducer,
    [tournamentAPI.reducerPath]: tournamentAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(fighterApi.middleware)
      .concat(matchAPI.middleware)
      .concat(tournamentAPI.middleware)
})

// import { configureStore } from '@reduxjs/toolkit'

// export const store = configureStore({
//   reducer: {},
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, 
//     }),
// })
