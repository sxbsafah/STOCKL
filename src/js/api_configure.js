import { urlEncode } from "./utils/urlEncode.js";
const API_KEY = import.meta.env.VITE_API_KEY;
const requestOptions = {
  headers: {
    Authorization: API_KEY,
  },
};
const fetchData = async (url, callback) => {
  const response = await fetch(url, requestOptions);
  if (response.ok) {
    const data = await response.json();
    callback(data);
  }
};

const root = {
  images: "https://api.pexels.com/v1/",
  videos: "https://api.pexels.com/videos/",
};
export const client = {
  photos: {
    search(parameters, callback) {
      fetchData(`${root.images}search${urlEncode(parameters)}`, callback);
    },
    curated(parameters, callback) {
      fetchData(`${root.images}curated?${urlEncode(parameters)}`, callback);
    },
    detail(id, callback) {
      fetchData(`${root.images}photos/${id}`, callback);
    },
  },
  videos: {
    search(parameters, callback) {
      fetchData(`${root.videos}search${urlEncode(parameters)}`, callback);
    },
    popular(parameters, callback) {
      fetchData(`${root.videos}popular?${urlEncode(parameters)}`, callback);
    },
    detail(id, callback) {
      fetchData(`${root.videos}videos/${id}`, callback);
    },
  },
  collections: {
    featured(parameters, callback) {
      fetchData(
        `${root.images}collections/featured?${urlEncode(parameters)}`,
        callback
      );
    },
    detail(id, parameters, callback) {
      fetchData(
        `${root.videos}/collections/${id}?${urlEncode(parameters)}`,
        callback
      );
    },
  },
};
