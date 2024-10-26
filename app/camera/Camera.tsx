// pages/camera.js
'use client'
import React, { useRef, useCallback, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { v4 as uuidV4 } from 'uuid';
import Header from '../components/Header';

interface FormFill {
  title: string;
  description: string;
  tags: string[];
}

const videoConstraints = {
  facingMode: 'environment',
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
  const [buttonText, setButtonText] = useState('Capture Image');
  const [isProcessing, setIsProcessing] = useState(false);

  const capture = useCallback(async () => {
    setButtonText('Processing...');
    setIsProcessing(true);
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      if (!imageSrc) return null;

      try {
        const response = await fetch('/api/vision', {
          method: 'POST',
          body: JSON.stringify({ image: imageSrc }),
        });
        const data: FormFill = (await response.json()).message;
        const imageUUID = uuidV4();

        const base: Components = {
          components: [
            { type: 'FormTitle', props: { data: data.title } },
            { type: 'FormText', props: { data: data.description } },
            { type: 'FormImage', props: { data: imageSrc } },
          ],
          tags: data.tags,
          uuid: imageUUID,
        };

        onFinishedProcessing(imageUUID);
        console.log(base);
      } catch (error) {
        console.error('Error processing image:', error);
      } finally {
        setButtonText('Capture Image');
        setIsProcessing(false);
      }
    }
  }, [onFinishedProcessing]);

  useEffect(() => {
    const checkWebcamAccess = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setHasWebcamAccess(true);
      } catch (error) {
        setHasWebcamAccess(false);
        console.error('Webcam access denied:', error);
      }
    };

    checkWebcamAccess();
  }, []); // Ensuring useEffect runs only once

  return (
    <div className="flex flex-col items-center justify-center py-[40%] bg-primaryGray text-gray-800">
      {/* <Header /> */}
      <div className="mt-8 p-4 rounded-xl bg-white shadow-lg w-full max-w-[100%] flex flex-col items-center">
        {hasWebcamAccess ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="rounded-xl border-4 border-primaryYellow shadow-md mb-4 w-full"
            />
            <button
              onClick={capture}
              disabled={isProcessing}
              className={`${
                isProcessing ? 'bg-gray-400' : 'bg-primaryYellow hover:bg-yellow-600'
              } text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300`}
            >
              {buttonText}
            </button>
          </>
        ) : (
          <p className="text-center text-lg text-red-600">
            Webcam access is not granted or unavailable. Please enable access to continue.
          </p>
        )}
      </div>
      
    </div>
  );
}
