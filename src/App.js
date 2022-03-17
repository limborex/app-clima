
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  const [search, setSearch]=useState('')
  const [allData, setAllData]= useState({
    city:"--",
    country:"--",
    temperature:"--",
    humety:"--",
    minTemp:"--",
    wheatherIcon: " ",
    information:" "
  })

  useEffect (()=>{
    
    fetchData()
  },[])

  const fetchData= async (city) =>{
    
    try{ 
      const APIKEY= "20f8effa7c6bfb12d6e50c16efe23c85"
      const unit="";

      const result= await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=${"metric"}`)
    
      await setAllData ({
        city:result.data.name,
        country:result.data.sys.country,
        temperature:result.data.main.temp,
        humety:result.data.main.humidity,
        minTemp:result.data.main.temp_min,
        wheatherIcon:result.data.weather[0].icon,
        information:result.data.weather[0].description


      }) }catch(e){
      console.log("the API don't loaded corretly or loaded for first time")
    }
    
   
  
  }
  const handleSubmit= (event) =>{
    console.log(search)
    event.preventDefault()
    fetchData(search)
  }
  const handleChange= (event) =>{
    setSearch(event.target.value)
  }
  return(
    <main>

      <div className='form'>
      <form onSubmit={handleSubmit}> 
        <input
        type='text'
        value={search}
        name='city'
        placeholder='City Name'
        onChange={handleChange}
        />

        <button for='city'>Search</button>

      </form>
      <div className='info'>
      <section >
        {/*inicio del apartado visual de la pagina*/}
        <img className="icon" src={"http://openweathermap.org/img/wn/"+allData.wheatherIcon+"@2x.png"} alt=" "/>
        <br/>
        <br/>
        <br/>
        <p>{allData.information}</p>
        {/*informacion sobre el lugar o ciudad*/}
        <div className='place'>
        <h1>{allData.city}</h1>
        <h2>{allData.country}</h2>
        </div>
       
        {/*informacion sobre la humedad en porcentaje*/}
        <div>
        <h3>HUMETY</h3>
        <p>{allData.humety} %</p>
        </div>

        {/*informacion sobre la temperatura*/}
        <div>
        <h3>TEMPERATURE</h3>
        <p>{allData.temperature}ºC</p>
        <p>{allData.minTemp} min temperature</p>
        </div>

        

  
       </section>
      </div>
      
      </div>



    </main>


  );

}

export default App;