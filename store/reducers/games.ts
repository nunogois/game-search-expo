import { SET_GAMES, GamesAction } from '../actions/games'

const initialState = {
  games: []
}

export default (state = initialState, action: GamesAction) => {
  switch (action.type) {
    case SET_GAMES:
      return {
        games: action.games
      }
  }
  return state
}
