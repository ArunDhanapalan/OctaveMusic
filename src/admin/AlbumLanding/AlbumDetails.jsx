import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GlobalAudioPlayer } from "../../context/AudioPlayerContext";

const AlbumDetails = () => {
  let location = useLocation();
  console.log(location);

  let {
    songs,
    setSongs,
    isPlaying,
    setIsPlaying,
    currentSongIndex,
    setCurrentSongIndex,
  } = useContext(GlobalAudioPlayer);

  //! Extraxt album details only from the state
  let albumData = location?.state;
  {/*console.log(albumData);*/}

  //! Extract the song list from albumData
  let songList = albumData?.songs;
 {/* console.log("Song List: ", songList); */}

  //! Create on function which will handle the songs
  let handleSongChange = (index) => {
    setSongs(songList);
    setCurrentSongIndex(index);
    if (currentSongIndex === index) {
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(true);
    }
  };

  function ScrollToTopOnMount() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    return null;
  }

  return (
    <section className="max-w-[85vw] md:max-w-[90vw] p-5 min-h-[calc(100vh-70px)] flex flex-col justify-center items-center">
      <ScrollToTopOnMount />
      {/* //~ Entire Album Details */}
      <article className=" grid grid-cols-1 md:grid-cols-2 gap-10 p-5 bg-gray-700 justify-center items-center rounded-lg hover:bg-gray-900/50 hover:ring-1 hover:ring-blue-600 transition-all duration-100 ease-linear cursor-pointer">
        {/* Left Aside Section - album thumbnail */}
        <aside className="w-full rounded-lg flex items-center justify-center relative">
          <img
            src={albumData?.albumThumbnail}
            alt={albumData?.albumTitle}
            className="h-[300px] rounded-lg object-center"
          />
          <span className="py-1 px-3 rounded-md bg-rose-600 absolute top-[-15px] right-[50px]">
            {albumData?.albumType}
          </span>
        </aside>
        {/* Right Aside Section - album details */}
        <aside className="w-full">
          <h1 className="w-fit text-4xl font-black tracking-wider">
            {albumData?.albumTitle}
          </h1>
          <p className="py-3">
            <span className="text-lg font-semibold mr-1">Description: </span>
            <span className="text-justify text-gray-200">
              {albumData?.albumDesc}
            </span>
          </p>
          <p className="py-1">
            <span className="text-lg font-semibold mr-1">Release Date: </span>
            <span className="text-justify text-gray-200">
              {albumData?.albumReleaseDate}
            </span>
          </p>
          <p className="py-1">
            <span className="text-lg font-semibold mr-1">Language: </span>
            <span className="text-justify text-gray-200">
              {albumData?.albumLang}
            </span>
          </p>
          <p className="py-1">
            <span className="text-lg font-semibold mr-1">Album Starcast: </span>
            <span className="text-justify text-gray-200">
              {albumData?.albumStarcast}
            </span>
          </p>
          <p className="py-1">
            <span className="text-lg font-semibold mr-1">Director: </span>
            <span className="text-justify text-gray-200">
              {albumData?.albumDirector}
            </span>
          </p>
          <p className="py-1">
            <span className="text-lg font-semibold mr-1">
              Number of Tracks:{" "}
            </span>
            <span className="text-justify text-gray-200">
              {albumData?.albumSongsCount}
            </span>
          </p>
        </aside>
      </article>
      {/* Song List Container */}
      <main className="w-[100%] pt-5 mb-30">
        <header className="w-full">
          <h1 className="text-2xl font-bold">Song Collection</h1>
        </header>
        <aside className="max-w-[85vw] md:w-full rounded-lg mt-3 overflow-x-scroll">
          <table className="md:w-full rounded-lg whitespace-nowrap overflow-hidden">
            <thead className="w-full">
              <tr className="bg-gray-900 rounded-t-md text-center">
                <td className="text-lg p-2 font-medium">Track</td>
                <td className="text-lg p-2 font-medium">Poster</td>
                <td className="text-lg p-2 font-medium">Song Name</td>
                <td className="text-lg p-2 font-medium">Singer(s)</td>
                <td className="text-lg p-2 font-medium">Music Director</td>
                <td className="text-lg p-2 font-medium">Duration</td>
                <td className="text-lg p-2 font-medium">Size</td>
              </tr>
            </thead>
            <tbody>
              {songList && songList.length > 0 ? (
                songList.map((song, index) => {
                  return (
                    <tr
                      onClick={() => handleSongChange(index)}
                      key={index}
                      className="bg-black hover:bg-gray-600 cursor-pointer transition-all duration-75 ease-in-out border-y border-transparent hover:border-gray-400"
                    >
                      <td className="text-center">{index + 1}</td>
                      <td className="flex justify-center items-center py-2 px-2">
                        <img
                          src={song?.songThumbnail}
                          alt={song?.songTitle}
                          className="h-[60px] rounded-md flex justify-center items-center"
                        />
                      </td>
                      <td className="text-center py-2">{song?.songTitle}</td>
                      <td className="text-center py-2">{song?.songSingers}</td>
                      <td className="text-center py-2">
                        {song?.songMusicDirector}
                      </td>
                      <td className="text-center py-2">{song?.duration}</td>
                      <td className="text-center p-2">{song?.size}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4 text-3xl font-semibold"
                  >
                    😕 Song Collection not found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </aside>
      </main>
    </section>
  );
};

export default AlbumDetails;
