import { useEffect, useState } from "react"
import axios from 'axios';
export default function AddGuest() {

    const [response, setResponse] = useState(null)

    const Guest = {
       Id: 53623,
        Name: "sara",
        GuestEmail: "s1242253@gmail.com",
        GuestPhone: "0546738294"
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("https://localhost:7072/api/guest", Guest)
            .then(response => (console.log("Post created:", response.data)))
            .catch(error => console.log(error))
    };
    return (
        <>
          <button onClick={handleSubmit}>Add Guest</button>
        </>
    )


}