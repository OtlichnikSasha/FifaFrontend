import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState('')
    const [username, setUsername] = useState('')
    const [playerId, setPlayerId] = useState(0)
    const [ready, setReady] = useState(false)
    const login = useCallback((jwtToken: string, username: string, player_id: number) => {
        setToken(jwtToken)
        setUsername(username)
        setPlayerId(player_id)
        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken, username: username, player_id: playerId
        }))
    }, [])


    const logout = useCallback(() => {
        setToken('')
        setUsername('')
        setPlayerId(0)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        // @ts-ignore
        const data: any = JSON.parse(localStorage.getItem(storageName))
        console.log('data_hook', data)
        if (data && data.token) {
            login(data.token, data.username, data.player_id)
        }
        setReady(true)
    }, [login])

    return {login, logout, token, username, playerId}
}