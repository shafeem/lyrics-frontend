import React, { useState } from "react";
import { genres } from "../assets/constants";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebase";
import axios from "../axios/userInstance";

function AddSongs() {
  const [songName, setSongName] = useState();
  const [artistName, setArtistName] = useState();
  const [language, setLanguage] = useState();
  const [genre, setGenre] = useState("POP");
  const [songImg,setSongImg] = useState()
  const [songAudio,setSongAudio] = useState()

  const songUploader = async () => {
    await axios({
        url:"/songSubmitter",
        method:"POST",
        data:{
            
        }
    })
  };

  const handleImgUploader =async ()=>{

    const image = e.target.files[0];

  
    const imageref = ref(storage, `/songImg/${image?.name}`);
    console.log(imageref, "image of song");
    const uploadtask = uploadBytesResumable(imageref, image);
    uploadtask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL,"Image Uploaded successfully");
          setSongImg(downloadURL);
        });
      }
    );
  }

    const handleAudioUploader = (e) => {

        const audio = e.target.files[0];
        console.log(audio);
      
        const audioref = ref(storage, `/songAudio/${audio?.name}`);
        console.log(audioref, "audio");
        const uploadtask = uploadBytesResumable(audioref, audio);
        uploadtask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) => {
              console.log(downloadURL);
              console.log("Audio Uploaded successfully");
      
              setSongAudio(downloadURL);
            });
          }
        );
      };


  return (
    <>
      {/* component */}
      {/* Container */}
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          {/* Row */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* Col */}
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  'url("https://source.unsplash.com/Mv9hjnEUHR4/600x800")',
              }}
            />
            {/* Col */}
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Upload Your Songs</h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onClick={(e) => {
                  songUploader(e);
                }}
              >
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="firstName"
                    >
                      Song Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      required
                      onChange={(e) => {
                        setSongName(e.target.value);
                      }}
                      placeholder="Song Name"
                    />
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="lastName"
                    >
                      Artist Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="lastName"
                      type="text"
                      required
                      onChange={(e) => {
                        setArtistName(e.target.value);
                      }}
                      placeholder="Artist Name"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Language
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    required
                    onChange={(e) => {
                      setLanguage(e.target.value);
                    }}
                    placeholder="Song Language"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Genre
                  </label>
                  {/* <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="Select Category"
                  /> */}
                  <select
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    onChange={(e) => {
                      setGenre(e.target.value);
                    }}
                  >
                    {genres.map((genre) => (
                      <option value={genre.value} key={genre.value}>
                        {" "}
                        {genre.title}{" "}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="Image"
                    >
                      Image
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="file"
                      name="imgFile"
                      accept="image/*"
                      required
                      onChange={handleImgUploader}
                    />
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="c_password"
                    >
                      Audio
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="file"
                      name="audioFile"
                      required
                      onChange={handleAudioUploader}
                    />
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
                <hr className="mb-6 border-t" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddSongs;
