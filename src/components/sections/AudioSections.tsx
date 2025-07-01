"use client";

import { Button, Loader } from "@/constants";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { FiUpload, FiMusic, FiDownload, FiPlay, FiPause } from "react-icons/fi";
import AudioLoader from "../ui/audioLoader";

function VideoToAudioConverter() {
  const ffmpegRef = useRef(new FFmpeg());
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioURL, setAudioURL] = useState<any | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [albumArt, setAlbumArt] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState<string>("Lyrics will appear here...");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  // Handle audio playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnd = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('ended', handleEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [audioURL]);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.target.value);
      setCurrentTime(parseFloat(e.target.value));
    }
  };

  // Load FFmpeg
  const loadFFmpeg = async () => {
    setIsLoading(true);
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";
    const ffmpeg = ffmpegRef.current;

    ffmpeg.on("log", ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    });

    setLoaded(true);
    setIsLoading(false);
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      setAudioURL(null);
      setIsPlaying(false);

      // Create album art from video thumbnail
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        video.currentTime = 1;
      };

      video.onseeked = () => {
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          setAlbumArt(canvas.toDataURL('image/jpeg'));
        }
      };
    }
  };

  // Convert video to audio
  const convertToAudio = async () => {
    if (!videoFile) return;
    if (!loaded) await loadFFmpeg();

    const ffmpeg = ffmpegRef.current;
    setIsLoading(true);
    try {
      await ffmpeg.writeFile("input", await fetchFile(videoFile));
      await ffmpeg.exec(["-i", "input", "-q:a", "0", "-map", "a", "output.mp3"]);

      const data = await ffmpeg.readFile("output.mp3");
      const audioBlob = new Blob([data], { type: "audio/mp3" });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);

      setLyrics("Fetching lyrics...");
      setTimeout(() => {
        setLyrics("🎵 Example lyrics line 1\n🎵 Example lyrics line 2\n🎵 Example lyrics line 3");
      }, 1500);
    } catch (error) {
      console.error("Conversion error:", error);
      if (messageRef.current) messageRef.current.innerHTML = `Error: ${error instanceof Error ? error.message : String(error)}`;
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="sm:text-4xl text-xl  font-bold text-gray-900 dark:text-white mb-2">Video to Audio Converter</h1>
          <p className="  text-sm sm:text-sm  text-gray-600 dark:text-gray-300">
            Convert your videos to high-quality MP3 files with embedded metadata
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 h-fit rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="p-4 sm:p-8 ">
              <h2 className="sm:text-2xl text-sm font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <FiUpload className="mr-2" /> Upload & Convert
              </h2>

              <div className="mb-6">
                <label className="block sm:text-sm text-xs font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Select Video File
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-10 text-center transition-all duration-200 hover:border-indigo-500 dark:hover:border-indigo-400 bg-gray-50 dark:bg-gray-700/50">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center justify-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <FiUpload className="text-2xl text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {videoFile ? (
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">{videoFile.name}</span>
                      ) : (
                        <>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Drag & drop files or</span>{' '}
                          <span className="text-indigo-600 dark:text-indigo-400 underline">browse</span>
                        </>
                      )}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      MP4, WebM, AVI, MOV (Max 100MB)
                    </p>
                  </label>
                </div>
              </div>

              <div className="flex  sm:flex-row items-center justify-between  mt-8">
                <div className="w-full sm:w-auto">
                  <Button
                    onClick={convertToAudio}
                    isProcessing={isLoading}
                    labal='Convert to MP3'
                  />
                </div>

                {audioURL && (
                  <a
                    href={audioURL}
                    download="converted-audio.mp3"
                    className="flex items-center  px-2 py-2  border border-transparent text-sm font-medium rounded-[8px] text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <FiDownload className="mr-1" /> Download
                  </a>
                )}
              </div>

              <audio ref={audioRef} src={audioURL} className="hidden" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="p-4 sm:p-8">
              <div className="flex items-center justify-between pb-5 ">
                <span className="flex items-center gap-2">
                  <FiMusic className="mr-2" />
                  <span>  Music Player</span>
                </span>
                {isPlaying && <span><AudioLoader /></span>}
              </div>
              <div className="mb-6">
                {albumArt ? (
                  <div className="relative aspect-square w-full h-80  mx-auto rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={albumArt || "https://a10.gaanacdn.com/gn_img/albums/10q3Zj1352/q3ZRBOA235/size_l_1684418170.webp"}
                      alt="Album art"
                      fill
                      quality={100}
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white font-medium text-sm">{videoFile?.name.replace(/\.[^/.]+$/, "")}</span>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square w-full  mx-auto rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center">
                    <FiMusic className="text-6xl text-gray-400 dark:text-gray-500" />
                  </div>
                )}
              </div>

              {audioURL && (
                <div className="mb-8">
                  <div className="flex items-center justify-center mb-6">
                    <button
                      onClick={togglePlayback}
                      className="p-4 rounded-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {isPlaying ? (
                        <FiPause size={28} className="flex-shrink-0" />
                      ) : (
                        <FiPlay size={28} className="flex-shrink-0 ml-1" />
                      )}
                    </button>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-indigo-600"
                      style={{
                        backgroundImage: `linear-gradient(to right, #4f46e5 ${(currentTime / (duration || 100)) * 100}%, #d1d5db ${(currentTime / (duration || 100)) * 100}%)`
                      }}
                    />
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="sm:text-lg text-sm font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  Lyrics
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 h-fit overflow-y-auto">
                  <pre className="font-sans text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {lyrics}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>


        {messageRef.current && (
          <p
            ref={messageRef}
            className="mt-6  text-center text-sm text-gray-500 dark:text-gray-400 italic"
          />
        )}

        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Note: Conversion happens in your browser. Your files are never uploaded to any server.</p>
        </div>
      </div>
    </div>
  );
}

export default VideoToAudioConverter;