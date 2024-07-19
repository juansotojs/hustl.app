import { Link } from 'react-router-dom';
import pic from '../images/New Project (34).png';
import Header from '../Header';
import { useEffect, useState } from 'react';
import axios from "axios";

 function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/posts').then(response => {
      setPlaces(response.data);
    });
  }, []);
    return (
        <>
      <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {places.length > 0 && places.map(place => (
          <>
          <Link to={'/post/'+place._id}>
            <div className='bg-gray-500 mb-2 rounded-2xl flex'>
            {place.photos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+place.photos?.[0]} alt="" />
            )}
            </div>
            <h3 className='font-bold'>{place.title}</h3>
            <h2 className='text-sm text-gray-500 truncate'>{place.address}</h2>
            <div className='truncate text-sm'>{place.description}</div>
            
          </Link>
          </>
        ))}
      </div>
    </>
    );
}
export default IndexPage