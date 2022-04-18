export interface UserEntity{
    id: number,
    username: string,
    rating: number
}

export interface GameEntity{
    id: number,
    players: UserEntity[],
    score: string
}

export interface UsersState{
    users: UserEntity[],
    loading: boolean,
    error: string | null,
    status: boolean | null
}

export interface UserState{
    user: {} | null,
    loading: boolean,
    error: string | null,
    status: boolean | null
}

export interface GamesState{
    games: GameEntity[],
    loading: boolean,
    error: string | null,
    status: boolean | null
}