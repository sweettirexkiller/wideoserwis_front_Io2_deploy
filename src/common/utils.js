export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      // console.log(fileReader.result);
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      // console.log('Error: ', error);
      reject(error);
    };
  });
};

