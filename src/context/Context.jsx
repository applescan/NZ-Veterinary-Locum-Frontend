import React, { createContext, useState } from 'react';

export const CustomContext = createContext();

const Context = ({ children }) => {

    const [user, setUser] = useState() //context for current signed in users data
    const [currentUserInfo, setCurrentUserInfo] = useState('')

    const [userClinic, setUserClinic] = useState() //context for current signed in users data
    const [currentUserInfoClinic, setCurrentUserInfoClinic] = useState(''); //context for current signed in users data

    return <CustomContext.Provider value={{
        user, setUser, currentUserInfo, setCurrentUserInfo,
        userClinic, setUserClinic,
        currentUserInfoClinic, setCurrentUserInfoClinic
    }}> {children}</CustomContext.Provider>

}

export default Context;