import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import gamesReducer from './reducers/games'

const rootReducer = combineReducers({
  games: gamesReducer
})

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export type RootState = ReturnType<typeof store.getState>
