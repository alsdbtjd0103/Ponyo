import { createContext, useState, useEffect } from "react";

export const UserInfoContext = createContext({
  id: "",
  name:"",
  temp:0,
  saveUserID:() => {},
  saveUsername:() => {},
  setTempF:() =>{}
});

function UserInfoContextProvider({ children }) {
  const [userID, setUserID] = useState();
  const [username,setUsername] = useState();
  const [temp,setTemp] = useState();
  function setTempF(temp){
    setTemp(temp);
  }
  function saveUserID(id){
    setUserID(id);
  };
  function saveUsername(name){
    setUsername(name);
  }

  const value = {
    id:userID,
    name:username,
    temp:temp,
    saveUserID:saveUserID,
    saveUsername:saveUsername,
    setTempF:setTempF
  };

  return <UserInfoContext.Provider value={value}>{children}</UserInfoContext.Provider>;
}

export default UserInfoContextProvider;
