import Game from '../../models/game'

export const SET_GAMES = 'SET_GAMES'
export const SET_GAME = 'SET_GAME'

export type GamesAction = { type: any; games: Game[]; game: Game }

const mapGames = (data: []) => {
  const games: Game[] = []

  data.forEach((game: any) => {
    games.push(
      new Game(
        game.id,
        game.name,
        `https:${game.cover?.url.replace('t_thumb', 't_cover_big_2x')}`,
        game.first_release_date
          ? new Date(game.first_release_date * 1000).toISOString().split('T')[0]
          : '',
        game.platforms
          ? game.platforms.map((p: any) => ({
              name: p.name,
              logo: `https:${p.platform_logo?.url}`
            }))
          : [],
        +game.total_rating?.toFixed(),
        game.url,
        game.summary,
        game.genres ? game.genres.map((g: any) => g.name) : [],
        game.themes ? game.themes.map((t: any) => t.name) : [],
        game.game_modes ? game.game_modes.map((m: any) => m.name) : [],
        game.involved_companies
          ? game.involved_companies.map((c: any) => c.company?.name)
          : [],
        game.screenshots
          ? game.screenshots.map(
              (s: any) => `https:${s.url.replace('t_thumb', 't_cover_big_2x')}`
            )
          : [],
        game.similar_games
          ? game.similar_games.map((g: any) => ({
              id: g.id,
              name: g.name,
              image: `https:${g.cover?.url.replace(
                't_thumb',
                't_cover_big_2x'
              )}`
            }))
          : []
      )
    )
  })

  return games
}

export const fetchGames = (search: string = '') => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(`https://igdb-api.nunogois.com/search`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ search })
      })

      if (!response.ok) throw new Error('Something went wrong!')

      const resData = await response.json()
      const loadedGames = mapGames(resData)

      dispatch({
        type: SET_GAMES,
        games: loadedGames
      })
    } catch (err) {
      throw err
    }
  }
}

export const fetchGame = (id: number) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(`https://igdb-api.nunogois.com/search`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })

      if (!response.ok) throw new Error('Something went wrong!')

      const resData = await response.json()
      const loadedGame = mapGames(resData)[0]

      dispatch({
        type: SET_GAME,
        game: loadedGame
      })
    } catch (err) {
      throw err
    }
  }
}
