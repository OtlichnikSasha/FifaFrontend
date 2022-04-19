import { api } from '../http/api';
import {UsersData} from "../store/reducers/usersReducer";

export const getPlayerForCabinet = async () => {
    const url = `api/player`;
    return await api.get(url, {});
};

export const getPlayers = async (args: object) => {
    const url = `api/players`;
    return await api.get(url, {});
};

export const getPlayer = async (args: UsersData) => {
    const url = `api/players/${args.id}`;
    return await api.get(url, {});
};

export const login = async (args: object) => {
    const url = `login`;
    return await api.post(url, args);
};

export const registration = async (args: object) => {
    const url = `api/players`;
    return await api.post(url, args);
};


export const getGames = async (args: object) => {
    const url = `api/games`;
    return await api.get(url, args);
};