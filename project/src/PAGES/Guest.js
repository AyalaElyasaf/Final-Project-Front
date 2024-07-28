import { useEffect, useState } from "react"
export default function Guest() {

    const [response, setResponse] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const url = "https://localhost:7072/api/guest"
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
                    
                    {response.map((hg, index) => (
                        <h2 key={g.id} className="users">
                            {g.id} { }
                            {g.name}
                            {g.guestEmail} 
                            {g.guestPhone} 
                        </h2>                        
                    ))}
                   
                </div>
                : <h1>no data received</h1>
            
            }
        </>
    )
}