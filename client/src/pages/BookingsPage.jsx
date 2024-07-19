import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";

export default function BookingsPage() {
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        axios.get('/favorites').then(response => {
            setFavorites(response.data);
        });
    }, []);
    return (
        <>
          <div>
                <AccountNav />
                <h1 className="text-center text-3xl mb-5 -mt-3">My Favorites</h1>
                <div>
                    {favorites?.length > 0 && favorites.map(fav => (
                       <> {  /*<div className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                        <div className="w-48">
                        <PlaceImg place={fav.post} />
                        </div>
                        <div className="py-3 pr-3 grow mt-2 py-2">
                            <h2 className="text-xl">{fav.post.title}</h2>
                            <div className="text-sm">
                                {fav.post.address}
                                
                            </div>
                            <div className="border-t border-gray-300"></div>
                            <div className="text-sm py-1">
                            {fav.post.description}
                            </div>
                        </div>
                        </div> */}
                        
                        <Link to={'/post/'+fav.post._id}className="flex cursor-pointer my-2 gap-4 bg-gray-100 p-4 rounded-2xl">
                        <div className="flex w-32 h-32 bg-gray-300 shrink-0">
                        <PlaceImg place={fav.post} />
                        </div>
                        <div className="grow-0 shrink">
                        <h2 className="text-xl font-bold">
                        {fav.post.title}
                        </h2>
                        <div className="text-sm text-gray-500">{fav.post.address}</div>
                        
                        <p className="text-sm mt-2">{fav.post.description}</p>
                        </div>
                    </Link>
                    </>
            
                    ))}
                </div>
            </div>
        
        </>
         
    );
}