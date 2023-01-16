import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let MediaContext = createContext('');

export default function MediaContextProvider(props) {
  const [apiData, setApiData] = useState([]);

  async function getDataFromApi() {

    let { data } = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games', {
      headers: { 'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68' },
    });

    setApiData(data);
  };




  useEffect(() => {

    getDataFromApi()

  }, [])


  return <MediaContext.Provider value={{ apiData}}>
    {props.children}

  </MediaContext.Provider>
}

