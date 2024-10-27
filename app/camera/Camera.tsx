// pages/camera.js
"use client";
import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { v4 as uuidV4 } from "uuid";
import PostToDB from "./postToDb";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { FaRepeat } from "react-icons/fa6";

interface FormFill {
  title: string;
  description: string;
  tags: string[];
}

const videoConstraints = {
  facingMode: "environment",
  aspectRatio: 1,
};

interface Components {
  components: { type: string; props: object }[];
  tags: string[];
  uuid: string;
}

interface Props {
  onFinishedProcessing: (a: string) => void;
}

export default function Camera({ onFinishedProcessing }: Props) {
  const webcamRef = useRef<Webcam>(null);
  const [hasWebcamAccess, setHasWebcamAccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [id, setId] = useState("");

  const capture = async () => {
    setIsProcessing(true);
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      if (!imageSrc) return null;

      try {
        const response = await fetch("/api/vision", {
          method: "POST",
          body: JSON.stringify({ image: imageSrc }),
        });
        const data: FormFill = (await response.json()).message;
        const imageUUID = uuidV4();

        const base: Components = {
          components: [
            { type: "FormTitle", props: { data: data.title } },
            { type: "FormText", props: { data: data.description } },
            { type: "FormImage", props: { data: imageSrc } },
          ],
          tags: data.tags,
          uuid: imageUUID,
        };
        await PostToDB(base);
        setId(imageUUID);
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }
  };

  useEffect(() => {
    const checkWebcamAccess = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setHasWebcamAccess(true);
      } catch (error) {
        setHasWebcamAccess(false);
        console.error("Webcam access denied:", error);
      }
    };

    checkWebcamAccess();
  }, []);

  return (
    <div className="p-2 rounded-xl bg-yellow-600 shadow-lg w-full max-w-[100%] flex flex-col items-center">
      {hasWebcamAccess ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="rounded-xl border-4 border-white shadow-md mb-4 w-full aspect-square"
          />
          {!isProcessing && (
            <button
              onClick={capture}
              disabled={isProcessing}
              className={`flex flex-row items-center gap-1 mb-2 rounded-xl bg-white hover:bg-yellow-600 font-bold py-2 px-4 shadow-md transition duration-300`}
            >
              <MdOutlinePhotoCamera className="text-xl" />
              Odfotiť
            </button>
          )}
          {isProcessing && (
            <div className="flex flex-row gap-2 text-sm font-bold text-black w-full">
              <input
                type="text"
                placeholder="Kód"
                className="flex-grow w-2 border border-gray-300 rounded-md p-2 placeholder-gray-600"
              />
              <button
                className="bg-blue-600 text-white py-2 p-3 rounded-lg shadow-lg flex flex-row gap-2 items-center justify-center"
                onClick={() => setIsProcessing(false)}
              >
                Opakovať
                <FaRepeat className="text-base" />
              </button>
              <button
                className="bg-green-600 text-white py-2 pr-3 pl-4 rounded-lg shadow-lg flex flex-row gap-2 items-center justify-center"
                onClick={() => {
                  if (id != "") {
                    onFinishedProcessing(id);
                  }
                }}
              >
                Potvrdiť
                <IoSend className="text-base" />
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-lg text-red-600">
          Webcam access is not granted or unavailable. Please enable access to
          continue.
        </p>
      )}
    </div>
  );
}
