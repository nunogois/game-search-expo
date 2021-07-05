import Game from '../../models/game'
import { SET_GAMES, SET_GAME, GamesAction } from '../actions/games'

const initialState = {
  games: []
}

export default (state = initialState, action: GamesAction) => {
  switch (action.type) {
    case SET_GAME:
      if (state.games.find((g: Game) => g.id === action.game.id)) return state
      return {
        games: [...state.games, action.game]
      }
    case SET_GAMES:
      return {
        games: action.games
      }
  }
  return state
}
