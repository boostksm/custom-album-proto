import axiosMain from "../instances";

export default function getAlbumData(id) {
  return axiosMain.get(`/data/album${id}.json`);
}
