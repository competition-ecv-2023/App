import React, {createContext, useContext, useState} from "react";

interface AuthenticationProviderProps {
    children: React.ReactNode;
}

const AuthenticationContext = createContext({
    user: false,
    setUser: (user: boolean) => {
    },
});

export const AuthenticationProvider = ({children}:AuthenticationProviderProps): JSX.Element => {
    const [user, setUser] = useState<boolean>(false);

    return (
        <AuthenticationContext.Provider value={{user, setUser}}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export const useAuthentication = () => useContext(AuthenticationContext);
