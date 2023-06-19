import React, {createContext, useContext, useEffect, useState} from "react";
import {deleteValueFor, getValueFor, save} from "../utils/SecureStore";
import {useApi} from "../hooks/UseApi";
import {AxiosError} from "axios";

interface AuthenticationProviderProps {
    children: React.ReactNode;
}

interface User {
    id: number;
    pseudo: string;
    email: string;
    isVerified: boolean;
}

interface LoginData {
    email: string;
    passwordToVerify: string;
}

const AuthenticationContext = createContext({
        user: null as User | null,
        setUser: (user: User | null) => {
        },
        logout: () => {
        },
        login: (data: LoginData): Promise<boolean | undefined> | undefined => undefined
    })
;

export const AuthenticationProvider = ({children}: AuthenticationProviderProps): JSX.Element => {
    const [user, setUser] = useState<User | null>(null);

    const api = useApi();

    useEffect(() => {
        verifyUserToken()
            .catch(e => {});
    }, [])

    const logout = async () => {
        await deleteValueFor("userData");
        setUser(null);
    }

    const login = async (data: LoginData): Promise<boolean | undefined> => {
        try {
            const resp = await api.post("users/login", data);
            console.log(resp)
            if (resp.status === 200) {
                setUser(resp.data[0]);
                await save("userData", JSON.stringify(resp.data[0]));
                return true;
            }
            if (resp.status === 401) {
                return false;
            }
            return false;
        } catch (e) {
            console.error(e)
        }
    }

    const verifyUserToken = async () => {
        const userData = await getValueFor("userData");
        if (userData) {
            const userUpdatedData = await api.get(`users/${JSON.parse(userData).id}`);
            if (userUpdatedData.status === 200) {
                console.log(userUpdatedData.data)
                setUser(userUpdatedData.data);
                await save("userData", JSON.stringify(userUpdatedData.data));
            }
        }
    }

    return (
        <AuthenticationContext.Provider value={{user, setUser, logout, login}}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export const useAuthentication = () => useContext(AuthenticationContext);
