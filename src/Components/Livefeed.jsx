import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

function Livefeed({ onVerification }) {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      ]);
      setLoading(false);
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (!loading && webcamRef.current) {
      const interval = setInterval(async () => {
        if (webcamRef.current) {
          const video = webcamRef.current.video;
          if (video) {
            try {
              const detection = await faceapi.detectSingleFace(video, new faceapi.SsdMobilenetv1Options());
              if (detection) {
                const landmarks = await faceapi.detectFaceLandmarks(video);
                const descriptor = await faceapi.computeFaceDescriptor(video, landmarks);
                const details = JSON.parse(sessionStorage.getItem('details')) || [];
                let bestMatch = null;
                let bestDistance = Infinity;
                for (const person of details) {
                  for (const imageBase64 of person.images) {
                    if (!imageBase64.startsWith('data:image/jpeg;base64,')) {
                      continue;
                    }
                    const image = await faceapi.fetchImage(imageBase64);
                    const referenceDetection = await faceapi.detectSingleFace(image, new faceapi.SsdMobilenetv1Options());
                    if (referenceDetection) {
                      const referenceLandmarks = await faceapi.detectFaceLandmarks(image);
                      const referenceDescriptor = await faceapi.computeFaceDescriptor(image, referenceLandmarks);
                      const distance = faceapi.euclideanDistance(descriptor, referenceDescriptor);
                      if (distance < bestDistance && distance < 1) {
                        bestDistance = distance;
                        bestMatch = { firstName: person.firstName, lastName: person.lastName };
                      }
                    }
                  }
                }
                if (bestMatch) {
                  onVerification(bestMatch);
                  clearInterval(interval);
                }
              }
            } catch (error) {
              console.error('Face verification error:', error);
            }
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <div>
      {loading ? (
        <p>Loading models...</p>
      ) : (
        <Webcam ref={webcamRef} width={500} height={450} />
      )}
    </div>
  );
}

export { Livefeed };