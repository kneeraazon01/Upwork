import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = props => {
    const [account, setAccount] = useState({
        username: "rizki"
    });

    return (
        <UserContext.Provider value={[account, setAccount]}>
            {props.children}
        </UserContext.Provider>
    );
}
