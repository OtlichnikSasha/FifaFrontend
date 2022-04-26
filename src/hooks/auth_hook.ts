import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState('')
    const [username, setUsername] = useState('')
    const [ready, setReady] = useState(false)
    const login = useCallback((jwtToken: string, username: string) => {
        setToken(jwtToken)
        setUsername(username)
        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken, username: username
        }))
    }, [])

    const logout = useCallback(() => {
        setToken('')
        setUsername('')
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        // @ts-ignore
        const data: any = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            login(data.token, data.username)
        }
        setReady(true)
    }, [login])

    return {login, logout, token, username}
}