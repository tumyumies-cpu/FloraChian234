
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { Camera, RefreshCcw, Check, Upload, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import Image from "next/image";

interface CameraCaptureProps {
  onCapture: (dataUrl: string) => void;
}

export function CameraCapture({ onCapture }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      // This check must be inside useEffect to ensure it runs only on the client
      if (typeof window !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing camera:", error);
          setHasCameraPermission(false);
          toast({
            variant: "destructive",
            title: "Camera Access Denied",
            description: "Please enable camera permissions in your browser settings to use this feature.",
          });
        }
      } else {
        console.error("Camera API not available in this browser.");
        setHasCameraPermission(false);
      }
    };
    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setCapturedImage(dataUrl);
    }
  };
  
  const handleConfirm = () => {
    if(capturedImage) {
        onCapture(capturedImage);
        toast({
            title: "Photo Captured!",
            description: "The harvest photo has been attached to the batch.",
        });
    }
  }

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setCapturedImage(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
        {capturedImage ? (
          <Image src={capturedImage} alt="Captured harvest" fill style={{ objectFit: "cover" }} />
        ) : (
          <video ref={videoRef} className="h-full w-full object-cover" autoPlay playsInline muted />
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {hasCameraPermission === false && !capturedImage && (
        <Alert variant="destructive">
          <ImageIcon className="h-4 w-4" />
          <AlertTitle>Camera Not Available</AlertTitle>
          <AlertDescription>
            Could not access the camera. You can upload a photo instead.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-2">
        {capturedImage ? (
          <>
            <Button onClick={handleConfirm} size="lg">
              <Check className="mr-2" /> Confirm Photo
            </Button>
            <Button onClick={handleRetake} variant="outline" size="lg">
              <RefreshCcw className="mr-2" /> Retake or Upload New
            </Button>
          </>
        ) : (
          <>
            {hasCameraPermission && (
              <Button onClick={handleCapture} size="lg" disabled={hasCameraPermission === null}>
                <Camera className="mr-2" /> Capture Photo
              </Button>
            )}
            <Button asChild variant="outline" size="lg">
                <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="mr-2" /> Upload from Device
                    <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </label>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
