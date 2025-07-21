import asyncio
import cv2
import numpy as np
import pygame
from pygame import mixer
import os

# Initialize pygame mixer
pygame.init()
mixer.init()

# Audio file paths (place these WAV files in the same directory as the script)
audio_files = {
    "orchestra": "orchestra.wav",
    "violin": "violin.wav",
    "drum": "drum.wav"
}

# Load audio files with error handling
try:
    orchestra_sound = mixer.Sound(audio_files["orchestra"])
    violin_sound = mixer.Sound(audio_files["violin"])
    drum_sound = mixer.Sound(audio_files["drum"])
except pygame.error as e:
    print(f"Error loading audio files: {e}")
    print("Ensure 'orchestra.wav', 'violin.wav', and 'drum.wav' are valid WAV files in the script directory.")
    exit()

# Video capture setup
cap = cv2.VideoCapture(0)  # Webcam
if not cap.isOpened():
    print("Error: Could not open webcam")
    exit()

# Conducting parameters
base_tempo = 120  # Base tempo in BPM
tempo = base_tempo
last_y = None
tempo_sensitivity = 0.1  # Pixels to BPM conversion factor
trigger_threshold = 50  # Pixels for instrument trigger zones

async def main():
    global tempo, last_y
    orchestra_sound.play(loops=-1)  # Loop background track

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Failed to capture frame")
            break

        # Flip frame for natural movement
        frame = cv2.flip(frame, 1)
        height, width = frame.shape[:2]

        # Convert to YCrCb color space for skin detection
        ycrcb = cv2.cvtColor(frame, cv2.COLOR_BGR2YCrCb)
        lower_skin = np.array([0, 135, 85], dtype=np.uint8)
        upper_skin = np.array([255, 180, 135], dtype=np.uint8)
        mask = cv2.inRange(ycrcb, lower_skin, upper_skin)

        # Find contours
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if contours:
            largest_contour = max(contours, key=cv2.contourArea)
            if cv2.contourArea(largest_contour) > 500:  # Minimum area to avoid noise
                # Get centroid of the largest contour (hand)
                M = cv2.moments(largest_contour)
                if M["m00"] != 0:
                    cx = int(M["m10"] / M["m00"])
                    cy = int(M["m01"] / M["m00"])

                    # Draw hand position
                    cv2.circle(frame, (cx, cy), 10, (0, 255, 0), -1)

                    # Tempo control: Track vertical movement
                    if last_y is not None:
                        delta_y = last_y - cy
                        tempo_change = delta_y * tempo_sensitivity
                        tempo = max(60, min(240, base_tempo + tempo_change))  # Constrain tempo
                        print(f"Tempo: {int(tempo)} BPM")

                    last_y = cy

                    # Instrument triggers based on horizontal position
                    if cx < width // 3:  # Left side: Violin
                        violin_sound.play()
                        cv2.putText(frame, "Violin", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)
                    elif cx > 2 * width // 3:  # Right side: Drum
                        drum_sound.play()
                        cv2.putText(frame, "Drum", (width - 100, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)

        # Display frame
        cv2.imshow("Conductor", frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

        await asyncio.sleep(1.0 / 60)  # 60 FPS

    # Cleanup
    cap.release()
    cv2.destroyAllWindows()
    orchestra_sound.stop()
    pygame.quit()

if __name__ == "__main__":
    asyncio.run(main())
