
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import jsQR from "jsqr";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { CameraOff, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface QrScannerProps {
  onScan: (data: string) => void;
}

export function QrScanner({ onScan }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [scanActive, setScanActive] = useState(true);
  const [qrCodeDetected, setQrCodeDetected] = useState(false);
  const { toast } = useToast();

  const tick = useCallback(() => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA && scanActive) {
      if (canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context?.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
        if (imageData) {
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });

          if (code && code.data) { // Check for actual data
            setQrCodeDetected(true);
            setScanActive(false); // Stop scanning once a code is found
            onScan(code.data);
            toast({
              title: "QR Code Detected!",
              description: `ID "${code.data}" found. Verifying...`,
            });
            // Stop camera tracks
             if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }

          }
        }
      }
    }
    if (scanActive) {
        requestAnimationFrame(tick);
    }
  }, [scanActive, onScan, toast]);

  useEffect(() => {
    let animationFrameId: number;

    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("Camera API not available in this browser.");
        setHasCameraPermission(false);
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          animationFrameId = requestAnimationFrame(tick);
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please enable camera permissions to use the scanner.",
        });
      }
    };
    
    if (scanActive) {
        getCameraPermission();
    }

    return () => {
      // Cleanup: Stop camera tracks and animation frame when component unmounts or scan becomes inactive
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [toast, tick, scanActive]);


  return (
    <div className="space-y-4">
      <div className={cn(
          "relative aspect-video w-full overflow-hidden rounded-lg border bg-muted flex items-center justify-center",
          qrCodeDetected && "border-4 border-green-500"
        )}>
        <video ref={videoRef} className={cn("h-full w-full object-cover", !hasCameraPermission && "hidden")} autoPlay playsInline muted />
        <canvas ref={canvasRef} className="hidden" />

        {hasCameraPermission === false && (
            <div className="flex flex-col items-center text-center text-muted-foreground p-4">
                <CameraOff className="h-12 w-12 mb-2" />
                <p className="font-semibold">Camera Not Available</p>
                <p className="text-sm">Could not access camera. Please check permissions.</p>
            </div>
        )}
        {hasCameraPermission && !qrCodeDetected && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-2/3 h-2/3 border-4 border-dashed border-white/50 rounded-lg animate-pulse flex items-center justify-center">
                    <QrCode className="h-10 w-10 text-white/50"/>
                </div>
            </div>
        )}
         {qrCodeDetected && (
             <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
                <div className="text-center">
                    <QrCode className="h-16 w-16 mb-4 mx-auto" />
                    <p className="text-lg font-bold">Code Detected!</p>
                </div>
            </div>
        )}
      </div>

       {hasCameraPermission === null && (
         <Alert className="bg-blue-50 border-blue-200 text-blue-800">
            <AlertDescription>
                Requesting camera permission...
            </AlertDescription>
         </Alert>
       )}
    </div>
  );
}
