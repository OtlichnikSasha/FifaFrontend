import {createContext} from 'react'

function noop(token: string, username: string) {
}
function logoutNoop() {
}

export const AuthContext = createContext({
    token: '',
    username: '',
    login: noop,
    logout: logoutNoop,
    isAuthenticated: false
})