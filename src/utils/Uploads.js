import axios from "axios";
export async function uploadMedia(media, options) {
  try {
    const { type, preset, file } = media;
    const formData = new FormData();
    formData.append("upload_preset", preset);
    formData.append("file", file);

    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/dapifwhwo/${type}/upload`,
      formData
    );
    return data.secure_url;
  } catch (error) {
    return error;
  }
}
