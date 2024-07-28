import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';

export default function AddReservation({ guestId }) {
    const { roomId } = useParams();
    const [guestIdInput, setGuestIdInput] = useState(""); // State to hold the input value for GuestId
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [error, setError] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const reservation = {
            RoomId: roomId,
            GuestId: guestIdInput, // Using the input value as GuestId
            CheckIn: checkIn,
            CheckOut: checkOut,
        };

        try {
            const response = await fetch("https://localhost:7072/api/reservation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservation),
            });

            if (!response.ok) {
                throw new Error(`status: ${response.status}`);
            }

            const responseText = await response.text();
            if (responseText === "You have successfully registered!") {
                setShowSuccessModal(true); // Display the success modal
            } else {
                setError(responseText);
            }
        } catch (error) {
            console.error("Error adding reservation:", error);
            setError(error.message);
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate("/"); // Navigate to the home page after closing the modal
    };

    return (
        <div className="container mt-4">
            <h1>הוסף הזמנה לחדר {roomId}</h1>
            {error && <h2 className="text-danger">שגיאה: {error}</h2>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="guestId" className="form-label">
                        תעודת זהות:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="guestId"
                        value={guestIdInput}
                        onChange={(e) => setGuestIdInput(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="checkIn" className="form-label">
                        תאריך כניסה:
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="checkIn"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="checkOut" className="form-label">
                        תאריך יציאה:
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="checkOut"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    הוסף הזמנה
                </button>
            </form>

            {/* Modal displayed only when the reservation is successfully added */}
            <Modal show={showSuccessModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>הזמנה נרשמה בהצלחה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ההזמנה שלך נרשמה בהצלחה. תודה רבה!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        סגור
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
