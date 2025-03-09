import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSun, FaCloud, FaCloudSun, FaCloudRain, FaBolt, FaSnowflake, FaSmog } from 'react-icons/fa';
import { CiTempHigh } from "react-icons/ci";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";
import { BsSpeedometer } from "react-icons/bs";
import { WiWindDeg } from "react-icons/wi";

function Data() {
    const [weatherData, setWeatherData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentDate, setCurrentDate] = useState(getDate());
    const [imageUrl, setImageUrl] = useState(""); // state for the image URL from Unsplash

    const date = new Date();
    const showTime = date.getHours()
        + ':' + date.getMinutes()
        + ":" + date.getSeconds();
    const cityname = localStorage.getItem("city");

    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
    }

    const weatherIconsMap = {
        'Clear': <FaSun />,
        'Clouds': <FaCloud />,
        'Clouds and Sun': <FaCloudSun />,
        'Rain': <FaCloudRain />,
        'Thunderstorm': <FaBolt />,
        'Snow': <FaSnowflake />,
        'Mist': <FaSmog />,
        // Add more mappings as needed
    };

    const navigate = useNavigate();
    const goBack = () => {
        navigate("/", { replace: true });
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=edd25d6d4c6418cac4712845611ebad4&units=metric`);
                if (!response.ok) {
                    throw new Error("Failed to fetch weather data");
                }
                const data = await response.json();
                setWeatherData(data);
                fetchWeatherImage(data.weather[0]?.description); // Fetch the image based on weather description
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchWeatherImage = async (description) => {
            try {
                const response = await fetch(`https://api.unsplash.com/search/photos?query=${description}&client_id=YOUR_UNSPLASH_ACCESS_KEY`);
                const data = await response.json();
                if (data.results.length > 0) {
                    setImageUrl(data.results[0].urls.regular); // Set the image URL
                } else {
                    setImageUrl('default_image_url_here'); // Fallback image if no result found
                }
            } catch (error) {
                console.error("Error fetching image from Unsplash", error);
            }
        };

        fetchWeatherData();
    }, [cityname]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="axis">
            <div className="row">
                <div>
                    {/* Display the weather image */}
                    <img className="card-img" src={imageUrl} alt="weather" style={{ width: '100%', height: '100vh' }} />
                    <div className="card-img-overlay">
                        <div className="container col-12 col-md-6">
                            <div className="bg-dark bg-opacity-50 p-4 text-light" style={{ width: "auto", height: "auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                                <p className="weatherHeading">Weather in {weatherData?.name}, {weatherData?.sys?.country}</p>
                                <h2 className="date" align="center">{currentDate}</h2>
                                <h2 className="time" align="center">{showTime}</h2>
                                <div style={{ fontSize: '30px' }}>
                                    {/* Display weather icon directly */}
                                    {weatherIconsMap[weatherData?.weather[0]?.main] || weatherData?.weather[0]?.description}
                                </div>
                                <p style={{ fontSize: '15px' }} >Weather Description: {weatherData?.weather[0]?.description}</p>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-4">
                                            <p> <CiTempHigh size={40} />&nbsp;<br />Temp<br />{weatherData?.main?.temp} °C</p>
                                        </div>
                                        <div className="col-4">
                                            <p> <FaWind size={40} />&nbsp;<br />Wind<br />{weatherData?.wind?.speed}m/s</p>
                                        </div>
                                        <div className="col-4">
                                            <p> <WiHumidity size={40} />&nbsp;<br />Humidity<br />{weatherData?.main?.humidity}%</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4" >
                                            <p> <MdOutlineVisibility size={40} />&nbsp;<br />Visibility<br /> {weatherData?.visibility} m</p>
                                        </div>
                                        <div className="col-4">
                                            <p> <BsSpeedometer size={40} />&nbsp;<br />Pressure<br />{weatherData?.main?.pressure} hPa</p>
                                        </div>
                                        <div className="col-4" >
                                            <p> <WiWindDeg size={40} />&nbsp;<br />Wind Dir<br /> {weatherData?.wind?.deg}°</p>
                                        </div>
                                    </div>
                                    <Button style={{ width: "100%", backgroundColor: "#389B87", borderColor: "#389B87" }} onClick={goBack}>Go Back</Button>
                                </div>
                                <p className="mt-3">Copyright © Weather Finder. 2023 All Rights Reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Data;

