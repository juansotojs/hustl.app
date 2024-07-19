import { useEffect, useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage(){

    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/posts/'+id).then(response => {
            const {data} = response; 
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
        });
    }, [id]);

    async function savePlace(ev){
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut
        };
        if(id){
            await axios.put('/posts', {id, ...placeData});
            setRedirect(true);
        } else {
            await axios.post('/posts', placeData);
            setRedirect(true);
        }

    }

    if(redirect) {
        return <Navigate to={'/account/posts'} />
    }
    //{action === 'new' && (
      //  <PlacesFormPage />
    //)}
    return(
        <>
        <div>
            <AccountNav />
                <form onSubmit={savePlace}>
                    <h2 className="text-2xl mt-4">Title</h2>
                    <p className="text-gray-500 text-sm">Business name</p>
                    <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Name of business" />
                    <h2 className="text-2xl mt-4">Location</h2>
                    <p className="text-gray-500 text-sm">Location of your business</p>
                    <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Location" />
                    <h2 className="text-2xl mt-4">Photos</h2>
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                    <h2 className="text-2xl mt-4">Description</h2>
                    <p className="text-gray-500 text-sm">Description about post</p>
                    <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>
                    <h2 className="text-2xl mt-4">Category</h2>
                    <p className="text-gray-500 text-sm">Select category</p>
                    <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                        <Perks selected={perks} onChange={setPerks}/>
                    </div>
                    <h2 className="text-2xl mt-4">Extra Info</h2>
                    <p className="text-gray-500 text-sm">Anything else you want to add...</p>
                    <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                    <h2 className="text-2xl mt-4">Hours</h2>
                    <p className="text-gray-500 text-sm">Add hours of operation</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                        <div>
                            <h3 className="mt-2 -mb-1">Open</h3>
                        <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)}type="text" placeholder="8:00 am"/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Close</h3>
                        <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)}type="text" placeholder="5:00pm"/>
                        </div>
                    </div>
                        <button className="primary my-4">Save</button>
                </form>
            </div>
        </>
    );
}