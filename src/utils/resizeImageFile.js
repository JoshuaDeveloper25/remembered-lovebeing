import FileResizer from "react-image-file-resizer";

// Function to convert base64 to blob
const base64ToBlob = (base64, mime) => {
  const sliceSize = 1024;
  const byteChars = atob(base64.split(',')[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteChars.length; offset += sliceSize) {
    const slice = byteChars.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mime });
};

export const uploadResizedImage = async (file, x, y, quality) => {
  const resizeFile = (file) =>
    new Promise((resolve) => {
      FileResizer.imageFileResizer(
        file,
        x,
        y,
        "WEBP",
        quality,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  try {
    const resizedBase64 = await resizeFile(file);
    const resizedBlob = base64ToBlob(resizedBase64, file.type);

    const resizedFile = new File([resizedBlob], file.name, {
      type: file.type,
      lastModified: file.lastModified,
    });

    return resizedFile;
  } catch (error) {
    console.error("Error resizing image:", error);
    throw error;
  }
};
