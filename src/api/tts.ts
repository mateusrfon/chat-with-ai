export async function getTextToSpeech(text: string): Promise<HTMLAudioElement> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/text-to-speech?text=${encodeURIComponent(
        text
      )}`
    );
    const blob = await response.blob();
    return new Audio(URL.createObjectURL(blob));
  } catch {
    throw new Error("Error fetching TTS audio");
  }
}
