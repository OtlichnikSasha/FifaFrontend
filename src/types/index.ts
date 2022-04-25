export interface UserEntity{
    id: number,
    username: string,
    rating: number,
    games: GameEntity[],
    nameSurname: string | null
}

export interface GameEntity{
    id: number,
    players: UserEntity[],
    scoreOne: number,
    scoreTwo: number,
    status: boolean,
    creatorId: number
}

export interface UsersState{
    users: UserEntity[],
    loading: boolean,
    error: string | null,
    status: boolean | null
}

export interface UserState{
    user: UserEntity| null,
    loading: boolean,
    error: string | null,
    status: boolean | null,

}

export interface GamesState{
    games: GameEntity[],
    loading: boolean,
    error: string | null,
    status: boolean | null
}

export interface GameState{
    game: GameEntity | null,
    loading: boolean,
    error: string | null,
    status: null | boolean
}

export interface LoginState{
    loading: boolean,
    loginError: string | undefined,
    username: string | null,
    isAuthenticated: boolean,
    token: string | null,
    player_id: number
}