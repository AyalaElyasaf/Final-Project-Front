import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HotelList() {
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "https://localhost:7072/api/hotel/all";
                const response = await fetch(url);
                const responseJson = await response.json();
                setResponse(responseJson);
                console.log(responseJson);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleHotelClick = (hotelId) => {
        navigate(`/rooms/${hotelId}`);
    };

    return (
        <div className="container mt-4">
            {response ? (
                <div>
                    <h1 className="mb-4">רשימת מלונות</h1>
                    {response.map((hotel) => (
                        <div 
                            key={hotel.id} 
                            className="card mb-3" 
                            onClick={() => handleHotelClick(hotel.id)}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="card-body">
                                <h2 className="card-title">{hotel.hotelName}</h2>
                                <p className="card-text">
                                    <strong>מדינה:</strong> {hotel.hotelCantury}
                                    <br />
                                    <strong>תיאור:</strong> {hotel.hotelDescribe}
                                    <br />
                                    <strong>מיקום:</strong> {hotel.hotelLocation}
                                    <br />
                                    <strong>דירוג:</strong> {hotel.hotelRating}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h1>לא התקבלו נתונים</h1>
            )}
        </div>
    );
}
