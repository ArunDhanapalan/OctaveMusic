import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { __DB } from "../../backend/firebaseconfig";
import { FaMusic } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Spinner from "../../helper/Spinner";
import { GlobalAudioPlayer } from "../../context/AudioPlayerContext";
import { IoSparkles } from "react-icons/io5";

const PopularAlbums = () => {
  let {
    songs,
    setSongs,
    isPlaying,
    setIsPlaying,
    currentSongIndex,
    setCurrentSongIndex,
  } = useContext(GlobalAudioPlayer);

  //! Create one state for the album
  let [albums, setAlbums] = useState(null);

  //! Create one state for the song list
  let [songsList, setSongsList] = useState(null);
  let [randomSongs, setRandomSongs] = useState([]);

  //! Create one function which will sort the random songs from the song list
  let randomSong = (array, numberOfElements) => {
    if (!array || array.length === 0) return [];

    let shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numberOfElements);
  };

  let handleSongChange = (index) => {
    setSongs(randomSongs);
    setCurrentSongIndex(index);
    if (currentSongIndex === index) {
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    let fetchAlbums = async () => {
      try {
        //! Now we will fetch the albums from the database
        let albumCollectionRef = collection(__DB, "music-app-album-qspiders");
        let getAlbums = await getDocs(albumCollectionRef);
        console.log(getAlbums);

        //! Now we will extract the required data
        let albumData = getAlbums.docs.map((album) => ({
          ...album?.data(),
          songs: album?.data()?.songs || [],
        }));
        console.log("Album Data:", albumData);
        setAlbums(albumData);

        //! This is the logic to extract the random songs from the entire song list collection
        //! Add this code here
        let allAlbumSongs = albumData
          .map((album) => {
            return album.songs || [];
          })
          .flat();
        console.log("All Songs:", allAlbumSongs);
        setSongsList(allAlbumSongs);

        //! Get random songs after fetching all songs
        setRandomSongs(randomSong(allAlbumSongs, 5)); // It will extract only 5 songs from the entire collection
      } catch (error) {
        console.log("Error While Fetching:", error);
      }
    };
    //! Call the function
    fetchAlbums();
  }, []);

  return (
    <section className="w-full overflow-x-hidden">
      {albums ? (
        <article className="w-full ml-3 mt-1">
          <header className="w-max p-5 flex items-center gap-4">
            <span className="text-2xl">
              <FaMusic />
            </span>
            <h1 className="text-3xl font-bold">Popular Albums</h1>
          </header>
          <main className="h-[calc(100vh - 70px)] w-[100%] flex gap-5 p-5">
            <div className="flex gap-5 flex-wrap mb-5">
              {albums.map((album, index) => {
                return (
                  <NavLink
                    to={`album-details/${album?.albumTitle}`}
                    key={index}
                    state={album}
                  >
                    <div className=" bg-black/50 p-4 rounded-lg hover:bg-black hover:shadow-xl hover:scale-105 transition-all duration-200 ease-linear hover:ring-1 ring-gray-600 hover:shadow-gray-600">
                      <img
                        src={album?.albumThumbnail}
                        alt={album?.albumTitle}
                        className="w-full h-[200px] object-cover rounded-md"
                      />
                      <h1 className="text-center font-black mt-2">
                        {album?.albumTitle}
                      </h1>
                      <h1 className="text-center">{album?.albumDirector}</h1>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </main>
          {/*//? Display Random Songs */}
          {/* //? Random Songs logic code starting from here */}
          <section className="w-full ml-3 mt-1 mb-40">
          <header className="w-max p-5 flex items-center gap-4">
            <span className="text-3xl">
              <IoSparkles />
            </span>
            <h1 className="text-3xl font-bold">Only For You</h1>
          </header>
            <div className="flex ml-3 gap-5 mt-3 flex-wrap mb-5">
              {randomSongs.map((song, index) => (
                <div
                  key={index}
                  className="bg-black/50 p-4 rounded-lg hover:bg-black hover:shadow-xl hover:scale-105 transition-all duration-200 ease-linear hover:ring-1 ring-gray-600 hover:shadow-gray-600 cursor-pointer"
                  onClick={() => handleSongChange(index)}
                >
                  <img
                    src={song?.songThumbnail}
                    alt={song?.songTitle}
                    className="w-[200px] h-[200px] object-cover rounded-md"
                  />
                  <p className="text-center font-black mt-2">{song?.songTitle}</p>
                  <p className="text-center font-light mt-1">{song?.songMusicDirector}</p>
                </div>
              ))}
            </div>
          </section>
          {/* //? Random Songs logic code ending here */}
        </article>
      ) : (
        <section className="w-full h-[100vh] fixed top-0 left-[7%]">
          <Spinner />
        </section>
      )}
    </section>
  );
};

export default PopularAlbums;
