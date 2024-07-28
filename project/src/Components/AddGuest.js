import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const GuestManagement = () => {
    const [loginData, setLoginData] = useState({
        Id: "",
        GuestEmail: ""
    });
    const [guestData, setGuestData] = useState({
        Id: 1,
        Name: "",
        GuestEmail: "",
        GuestPhone: ""
    });
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://localhost:7072/api/guest`);
            const existingUser = response.data.find(user => user.id === parseInt(loginData.id) && user.guestEmail === loginData.email);

            if (existingUser) {
                console.log("Login successful for user:", existingUser);
                setIsLoginMode(false);
                setMessage("נכנסת למערכת בהצלחה!");
                success(); // קריאה לפונקציה success ברגע שההתחברות הצליחה
            } else {
                console.log("User not found. Redirecting to sign up.");
                setMessage("משתמש לא נמצא. הפנייה להרשמה.");
            }
        } catch (error) {
            console.log("Login failed:", error);
            setMessage("התחברות נכשלה. נסה שנית מאוחר יותר.");
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://localhost:7072/api/guest", guestData);
            console.log("Guest added:", response.data);
            setGuestData({
                Id: 1,
                Name: "",
                GuestEmail: "",
                GuestPhone: ""
            });
            setIsLoginMode(false);
            setMessage("נרשמת למערכת בהצלחה!");
            success(); // קריאה לפונקציה success ברגע שההרשמה הצליחה
        } catch (error) {
            console.log("Guest add failed:", error);
            setMessage("ההרשמה נכשלה. נסה שנית מאוחר יותר.");
        }
    };

    const handleChange = (e) => {
        setGuestData({ ...guestData, [e.target.name]: e.target.value });
    };

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
    };

    const closeMessage = () => {
        setMessage("");
    };

    const success = () => {
        navigate('/HotelList'); // ניווט לדף המלונות ברגע שהפעולה הצליחה
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">כניסה או הרשמה למערכת</div>
                        <div className="card-body">
                            {isLoginMode ? (
                                <form onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <label htmlFor="id" className="form-label">מספר זיהוי:</label>
                                        <input type="number" className="form-control" id="id" name="id" value={loginData.id} onChange={handleLoginChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">אימייל:</label>
                                        <input type="email" className="form-control" id="email" name="email" value={loginData.email} onChange={handleLoginChange} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">כניסה</button>
                                    <button type="button" className="btn btn-link" onClick={toggleMode}>הרשמה</button>
                                </form>
                            ) : (
                                <form onSubmit={handleSignUp}>
                                    <div className="mb-3">
                                        <label className="form-label">מספר זיהוי:</label>
                                        <input type="number" className="form-control" name="Id" value={guestData.Id} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">שם:</label>
                                        <input type="text" className="form-control" name="Name" value={guestData.Name} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">אימייל:</label>
                                        <input type="text" className="form-control" name="GuestEmail" value={guestData.GuestEmail} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">טלפון:</label>
                                        <input type="text" className="form-control" name="GuestPhone" value={guestData.GuestPhone} onChange={handleChange} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">הוסף אורח</button>
                                    <button type="button" className="btn btn-link" onClick={toggleMode}>ביטול</button>
                                </form>
                            )}
                            {/* תיצוג הודעה למשתמש */}
                            {message && (
                                <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
                                    {message}
                                    <button type="button" className="btn-close" aria-label="Close" onClick={closeMessage}></button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuestManagement;
