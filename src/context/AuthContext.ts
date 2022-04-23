import {createContext} from 'react'

function noop(token: string, username: string, player_id: number) {
}
function logoutNoop() {
}

export const AuthContext = createContext({
    token: '',
    username: '',
    player_id: 0,
    login: noop,
    logout: logoutNoop,
    isAuthenticated: false
})