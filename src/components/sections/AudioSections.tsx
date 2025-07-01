"use client";

import { Button, Loader } from "@/constants";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { FiUpload, FiMusic, FiDownload, FiPlay, FiPause } from "react-icons/fi";

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
    <div className="mx-auto max-w-7xl px-4 py-8 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4">Video to Audio Converter</h2>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">
              Upload Video File
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
                id="video-upload"
              />
              <label htmlFor="video-upload" className="cursor-pointer">
                <FiUpload className="mx-auto text-3xl mb-2 text-gray-500" />
                <p className="text-sm text-gray-500">
                  {videoFile ? videoFile.name : 'Click to browse or drag and drop'}
                </p>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              onClick={convertToAudio}
              isProcessing={isLoading}
              labal='Convert to MP3'
            />
            {audioURL && (
              <div className="flex items-center justify-end ">
                <a
                  href={audioURL}
                  download="converted-audio.mp3"
                  className="flex items-center  px-4 py-2  text-sm font-medium rounded-[8px] text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <FiDownload className="mr-1" /> Download
                </a>
                <audio ref={audioRef} src={audioURL} className="hidden" />
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg ">
          <h2 className="text-xl font-semibold mb-4">Music Details</h2>

          {albumArt ? (
            <div className="mb-6 flex justify-center">
              <div className="w-full h-64 relative rounded-lg overflow-hidden">
                <Image
                  src={albumArt}
                  alt="Album art"
                  fill
                  quality={80}
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="mb-6 flex justify-center items-center w-64 h-64  mx-auto rounded-lg dark:bg-gray-800">
              <FiMusic className="text-4xl text-gray-600" />
            </div>
          )}

          {audioURL && (
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <button
                  onClick={togglePlayback}
                  className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-700 text-white shadow-md transition-colors"
                >
                  {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
                </button>
              </div>

              <div className="flex items-center justify-between mb-1 text-xs text-gray-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(to right, #4338ca ${(currentTime / (duration || 100)) * 100}%, transparent ${(currentTime / (duration || 100)) * 100}%)`
                }}
              />
            </div>
          )}

          <div>
            <h3 className="text-lg font-medium mb-2">Lyrics</h3>
            <div
              className="p-4 rounded-lg h-fit whitespace-pre-line  border-gray-300 dark:bg-gray-800 border dark:border-gray-700  text-gray-700 dark:text-gray-300"
            >
              {lyrics}
            </div>
          </div>
        </div>
      </div>

      {messageRef.current && (
        <p
          ref={messageRef}
          className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400"
        />
      )}
    </div>
  );
}

export default VideoToAudioConverter;