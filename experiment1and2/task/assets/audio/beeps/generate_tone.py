import numpy as np
import wave
import random

def generate_tone(frequency, duration, sample_rate=44100, amplitude=0.5):
    t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
    return amplitude * np.sin(2 * np.pi * frequency * t)

def create_wav_file(filename, sample_rate=44100, duration=4):
    # Parameters
    tone_duration = 0.5
    break_duration = 0.5
    num_tones = 4
    high_tone_count = random.randint(0, 4)
    low_tone_count = num_tones - high_tone_count
    
    # Generate tones
    high_tone = generate_tone(1000, tone_duration, sample_rate)
    low_tone = generate_tone(500, tone_duration, sample_rate)

    tones = [high_tone] * high_tone_count + [low_tone] * low_tone_count
    random.shuffle(tones)
    
    # Initialize audio data with silence
    audio_data = np.zeros(int(sample_rate * duration))
    
    # Place tones every 500 ms
    for i in range(4):
        start_idx = (2*i+1) * int(break_duration * sample_rate) 
        end_idx = start_idx + int(tone_duration * sample_rate)
        # randomly select high or low
        audio_data[start_idx:end_idx] = tones[i]

    # Normalize to 16-bit PCM range
    audio_data = (audio_data * 32767).astype(np.int16)
    
    # Write to wav file
    with wave.open(filename + "_" + str(high_tone_count) + ".wav", 'w') as wf:
        wf.setnchannels(1)  # Mono
        wf.setsampwidth(2)  # 16-bit
        wf.setframerate(sample_rate)
        wf.writeframes(audio_data.tobytes())

# Example usage
for i in range(25):  # Generate 5 example files
    create_wav_file(str(i+1))
