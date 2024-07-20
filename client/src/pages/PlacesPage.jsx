import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";
import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "../AccountNav";


export default function PlacesPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-posts').then(({data}) => {
            setPlaces(data);
        });
    }, []);

//    const [redirectToPlacesList, setRedirectToPlacesList] = useState(false);

    //if(redirectToPlacesList && action!=='new'){
      //  return <Navigate to={'/account/places'} />
    //}

    return (
        <>
        <div>
            <AccountNav/>
            <h1 className="text-center text-3xl mb-5 -mt-3">My Posts</h1>
                <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/posts/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

                Add new post
                </Link>
            </div>
            <div className="mt-4">
                {places.length > 0 && places.map(place => (
                    <>
                    <Link to={'/account/posts/'+place._id}className="flex cursor-pointer my-2 gap-4 bg-gray-100 p-4 rounded-2xl">
                        <div className="flex w-32 h-32 bg-gray-300 shrink-0">
                            {place.photos.length > 0 && (
                                <img className="object-cover" src={'https://hustl-app-api.vercel.app/uploads/' +place.photos[0]} alt=""/>
                            )}
                        </div>
                        <div className="grow-0 shrink">
                        <h2 className="text-xl font-bold">
                        {place.title}
                        </h2>
                        <div className="text-sm text-gray-500">{place.address}</div>
                        <p className="text-sm mt-2">{place.description}</p>
                        </div>
                    </Link>
                    </>
                ))}
            </div>
        </div>
        </>
    );
}
