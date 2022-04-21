export interface UserEntity{
    id: number,
    username: string,
    rating: number,
    games: GameEntity[]
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
    user: UserEntity| null,
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

export interface LoginState{
    loading: boolean,
    loginError: string | undefined,
    username: string | null,
    isAuthenticated: boolean,
    token: string | null
}