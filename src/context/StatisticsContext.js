import {createContext, useState, useContext} from 'react'
import axios from 'axios'

import AuthContext from './AuthContext';

const StatisticsContext = createContext()

export default StatisticsContext

export const StatisticsProvider = ({children})=>{
    const [statistics, setStatistics] = useState([])
    
    let {authTokens} = useContext(AuthContext)
    

    const getStatistics = (id) =>{
        axios.get(`https://rincy.pythonanywhere.com/api/v1/quizzes/statistics/${id}/`,
        {
          headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + String(authTokens.access)
          }
        }
        ).then((response)=>{
          setStatistics(response.data.data[0]);
        }).catch(err=>{
          // alert(err)
      })
      }

    let contextData = {
      statistics : statistics,
      getStatistics : getStatistics,
      setStatistics : setStatistics
    }

    return(
        <StatisticsContext.Provider value={contextData}>
            {children}
        </StatisticsContext.Provider>
    )
}