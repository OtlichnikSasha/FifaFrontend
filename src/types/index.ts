export interface UserEntity{
    id: number,
    username: string,
    rating: number
}

export interface GameEntity{
    id: number,
    player1: string,
    player2: string,
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