import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function PlacePage() {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [redirect,setRedirect] = useState('');

    

    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get('/posts/'+id).then(response => {
            setPost(response.data);
        });
    }, [id]);

    async function favoriteThisPlace(){
        const response = await axios.post('/favorites', {post:post._id});
        const bookingId = response.data._id;
        //setRedirect(`/account/favorites/${bookingId}`);
    }
    if(redirect){
        return <Navigate to={redirect} />
    }

if(!post) return '';

    if(showAllPhotos) {
        return (
            <>
                <div className="absolute inset-0 bg-black text-white min-h-screen">
                    <div className="bg-black p-8 grid gap-4">
                        <div>
                            <h2 className="text-3xl mr-48">Photos of {post.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)}className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>

                        Close photos</button>
                        </div>
                    {post?.photos?.length > 0 && post.photos.map(photo => (
                        <>
                        <div>
                            <img src={'http://localhost:4000/uploads/'+photo} alt="" />
                        </div>
                        </>
                ))}
                </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
                <h1 className="text-3xl">{post.title}</h1>
                <a className="flex gap-1 my-3 my-2 block font-semibold underline" target="_blank" href={'https://maps.google.com/?q='+post.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>

                {post.address}</a>
                <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                    <div>{post.photos?.[0] && (
                        <>
                        <div>
                        <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={'http://localhost:4000/uploads/'+post.photos[0]} alt="" />
                        </div>
                        </>
                        
                    )}</div>
                    <div className="grid">{post.photos?.[1] && (
                        <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={'http://localhost:4000/uploads/'+post.photos[1]} alt="" />
                    )}
                    <div className="overflow-hidden">
                    {post.photos?.[2] && (
                        <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover relative top-2" src={'http://localhost:4000/uploads/'+post.photos[2]} alt="" />
                    )}
                    </div>
                    
                    </div>
                </div>
                <button onClick={() => setShowAllPhotos(true)}className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
</svg>

                    Show more photos</button>
                </div>
                
                <div className="mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                    <div>
                    <div className="my-2">
                <h2 className="font-semibold text-2xl">Description</h2>
                {post.description}
                    
                </div>
                        Open: {post.checkIn}am <br />
                        Close: {post.checkOut}pm
                        <div className="mt-2 text-sm text-gray-700 leading-4">{post.extraInfo}</div>
                    </div>
                    <div className="">
                        <div className="bg-white shadow p-4 rounded-2xl mt-8">
                            <div className="text-2xl text-center">
                            </div>
                            <button onClick={favoriteThisPlace} className="flex justify-center primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
</svg>
   Add to favorites
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
}