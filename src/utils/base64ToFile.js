function base64ToFile(base64String, fileName, mimeType) {
  // Decodifica el string Base64
  const byteCharacters = atob(base64String.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);

  // Convierte cada carácter en un número correspondiente
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  // Crea un array de bytes
  const byteArray = new Uint8Array(byteNumbers);

  // Crea un objeto Blob y luego lo convierte en un File
  const file = new File([byteArray], fileName, { type: mimeType });

  return file;
}

export default base64ToFile;
