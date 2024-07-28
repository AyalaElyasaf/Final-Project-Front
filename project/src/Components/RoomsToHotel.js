import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function RoomsToHotel() {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`https://localhost:7072/api/room/${hotelId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const roomsData = await response.json();
        setRooms(roomsData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRooms();
  }, [hotelId]);

  return (
    <div className="container mt-4">
      {error ? (
        <h1>Error fetching data: {error}</h1>
      ) : rooms.length > 0 ? (
        <div>
          <h1>Rooms List for Hotel {hotelId}</h1>
          {rooms.map((room) => (
            <div key={room.id} className="card mb-3">
              <div className="card-body">
                <h2 className="card-title">{room.roomNumber}</h2>
                <p className="card-text">
                  <strong>Description:</strong> {room.roomCapacity}
                  <br />
                  <strong>Price:</strong> {room.roomPrice}
                  <br />
                  <strong>Room Type:</strong> {room.roomType}
                </p>
                <Link to={`/add-reservation/${room.id}`} className="btn btn-primary">
                  Add Reservation
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>No rooms available</h1>
      )}
    </div>
  );
}

export default RoomsToHotel;
