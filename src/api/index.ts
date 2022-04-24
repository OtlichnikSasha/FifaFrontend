import { api } from '../http/api';
import {UsersData} from "../store/reducers/usersReducer";
interface CabinetHeaders{
    token: string
}
export const getPlayerForCabinet = async (headers: object) => {
    // @ts-ignore
    headers.Authorization = headers.token
    const url = `player`;
    return await api.get(url, {}, headers);
};

export const getPlayers = async (args: object) => {
    const url = `players`;
    return await api.get(url, args);
};

export const getSearchUsers = async (args: CabinetHeaders) => {
    const headers = {
        "Authorization": args.token
    };
    const url = `players/search`;
    return await api.get(url, args, headers);
};


export const getPlayer = async (args: UsersData) => {
    const url = `players/${args.id}`;
    return await api.get(url, {});
};

export const editPlayer = async (data: object) => {
    const headers = {
        // @ts-ignore
        "Authorization": data.token,
        "Access-Control-Allow-Origin" : "*"
    };
    // @ts-ignore
    delete data['token']
    const url = `players`;
    return await api.put(url, data, headers);
};

export const login = async (args: object) => {
    const url = `login`;
    return await api.post(url, args);
};

export const logout = async () => {
    const url = `logout`;
    return await api.post(url, {});
};

export const registration = async (args: object) => {
    const url = `players`;
    return await api.post(url, args);
};


export const getGames = async (args: object) => {
    const url = `games`;
    return await api.get(url, args);
};

interface GameUser{
    id: string
}
export const getGamesUser = async (args: GameUser) => {
    const url = `games/${args.id}`;
    return await api.get(url, {});
};

interface CabinetGames{
    id: number,
    page: number,
    size: number
}
export const getCabinetGames = async (args: CabinetGames) => {
    const url = `games/cabinet/${args.id}`;
    // @ts-ignore
    delete args['id']
    return await api.get(url, args);
};

export const createGame = async (data: object) => {
    const url = `games`;
    return await api.post(url, data);
};

export const acceptGame = async (data: object) => {
    const url = `games`;
    return await api.put(url, data);
};

interface DeleteArgs{
    id: number
}

export const removeGame = async (args: DeleteArgs) => {
    const url = `games/${args.id}`;
    return await api.delete(url, {});
};


// const {token} = useTypedSelector(state => state.userLogin)
// export async function getUser () {
//     if (token) {
//         return jwtDecode(token)
//     }
// }