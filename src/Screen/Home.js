import React from "react";
import { WiSolarEclipse } from "react-icons/wi";
import { AutoComplete } from "antd";
import { Button } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import { useState,useEffect} from "react";
import { useNavigate } from "react-router";
function Home()
{
    const backgroundImageUrl= './bgImage.jpg'
    const [cityOptions, setCityOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [firstCity, setFirstCity] = useState('');

    const[message,setError]=useState(" ")
    const navigate=useNavigate();
    localStorage.setItem("city",firstCity);

    useEffect(() => {
    if (cityOptions.length > 0) {
      setFirstCity(cityOptions[0]);
    }
  }, [cityOptions]); //select first value of the array

    const handleClick = () => {
       if(cityOptions.length === 0)
       {
       setError("Country or City not found!");
       }
       else
       {
        setIsLoading(true); 
        setTimeout(() => {
        setIsLoading(false);
        navigate("/Data", { replace: true });
        }, 8000); 
       }
      };
    
    const fetchCities = async (inputValue) => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/find?q=${inputValue}&type=like&sort=population&cnt=5&appid=edd25d6d4c6418cac4712845611ebad4`
          );
          const data = await response.json();
          const cities = data.list.map((city) => city.name);
          setCityOptions(cities);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };
 return(
        <div className="axis">
        <div className="bg-image" style={{backgroundImage:`url(${backgroundImageUrl})`}}>
        <div className="container col-12 col-md-6">
        <div className="bg-dark bg-opacity-50 p-2" style={{width:"auto",height:"auto",display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center",textAlign:"center"}}>
        <p className="heading"><WiSolarEclipse size={60}  color="#fcb900"/>&nbsp;Weather Finder</p>
        <p style={{color:"#fff"}}>Weather Finder is Your web app for instant weather updates, anytime, anywhere.</p>
        <div className="row col-12 container">
            <div className="col-9 col-md-10">
            <AutoComplete className="searchBar mb-5"
            placeholder="Type Your Country"
            dataSource={cityOptions}
            onSearch={fetchCities}
            filterOption={true}
            onSelect={(cityOptions)=>
            {
                console.log(cityOptions);
            }}

           />
            </div>
            <div className="col-3 col-md-2">
            <Button className="searchBtn" onClick={handleClick}><IoSearch /></Button>  
            </div>
        </div>
        {isLoading && (
        <div className="d-flex justify-content-center mb-3">
          <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>
        </div>
      )}  
      <p style={{color:"red"}}>{message}</p>
        </div>
        </div>
       </div>
        </div>
    )
}

export default Home;