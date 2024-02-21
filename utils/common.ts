export const b64toBlob = (
  b64Data: string,
  contentType = "image/jpeg",
  sliceSize = 512
) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export const stopCamera = (): void => {
  const videoEl: any = document.getElementById("userImage");
  // now get the steam
  const stream = videoEl?.srcObject;
  // now get all tracks
  const tracks = stream?.getTracks();
  // now close each track by having forEach loop
  tracks?.forEach((track: MediaStreamTrack) => {
    // stopping every track
    track.stop();
  });
  // assign null to srcObject of video
  if (videoEl) {
    videoEl.srcObject = null;
  }
};

export function parseUserAgent() {
  return navigator?.userAgent || navigator?.vendor;
}

export function isAndroid() {
  if (/android/i.test(parseUserAgent())) {
    return true;
  }
}

export const InitCamera = async (facingMode?: any) => {
  try {
    const stream = await window?.navigator?.mediaDevices?.getUserMedia({
      audio: false,
      video: {
        facingMode,
        // aspectRatio: isAndroid() ? undefined : 3 / 4,
        aspectRatio: undefined,
      },
    });
    return stream;
  } catch (error) {
    console.log(error, "init camera error");
  }
};

export const getBase64Data = (imageData: string) => imageData?.split(",")?.[1];
