import { useEffect, useState } from "react"
export default function HotelList() {

    const [response, setResponse] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const url = "https://localhost:7072/api/hotel/all"
            const response = await fetch(url)
            const responseJson = await response.json()
            setResponse(responseJson)
            console.log(responseJson)
        }
        fetchData()
    }, [])
    return (
        <>

            {response ?
            
                <div>
                    <h1 className='title'>list of hotels</h1>
                    
                    {response.map((h, index) => (
                        <h2 key={h.id} className="users">
                            {h.id} { }
                            {h.hotelName}
                            {h.hotelCantury} 
                            {h.hotelDescribe} 
                            {h.hotelLocation} 
                            {h.hotelRating}
                        </h2>                        
                    ))}
                   
                </div>
                : <h1>no data received</h1>            
            }
        </>
    )
}