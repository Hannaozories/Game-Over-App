import { createContext, useState } from "react";



export let filterContextData = createContext();

export default function ShareDataContextProvider(props) {

    const [platformType, setPlatformType] = useState('pc');

    function changePlatform(type) {
        setPlatformType(type)
    }
    return <filterContextData.Provider value={{ platformType,changePlatform }}>
        {props.children}
    </filterContextData.Provider>
}