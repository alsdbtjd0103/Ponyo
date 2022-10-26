import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  saveAuthenticate: (token) => {},
  logout: () => {}
});

function AuthContextProvider({children}){
    const [authToken,setAuthToken] = useState();

    function saveAuthenticate(token){
        setAuthToken(token);
        AsyncStorage.setItem('token',token);
    }

    function logout(){
        setAuthToken(null);
        AsyncStorage.removeItem('token');
        async function removeAll(){
            const keys = await AsyncStorage.getAllKeys();
            for (let key of keys){
                await AsyncStorage.removeItem(key);
            }
            console.log(await AsyncStorage.getAllKeys());
        }
        removeAll();
    }

    const value={
        token:authToken,
        isAuthenticated: !!authToken,   //token이 있으면 true, 없으면 false
        saveAuthenticate:saveAuthenticate,
        logout:logout

    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export default AuthContextProvider;
