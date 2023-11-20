export const getFormattedNumber = number => number?.toString().padStart(2, '0');

export const convertBase64ToBlob = base64 => {
  const byteString = atob(base64);
  const mimeString = 'audio/mpeg';
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i += 1) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([arrayBuffer], { type: mimeString });

  return URL.createObjectURL(blob);
};
