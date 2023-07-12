import axios from "axios";

export default class AudioFetchingManager {
  constructor(limit = 10) {
    this.objectUrls = new Map();
    this.limit = limit;
    this.abortController = null;
  }

  fifo() {
    if (this.objectUrls.size > this.limit) {
      const [[firstKey, firstObjectUrl]] = this.objectUrls.entries();
      URL.revokeObjectURL(firstObjectUrl);
      this.objectUrls.delete(firstKey);
    }
  }

  async getNewObjectUrl(src) {
    this.abortController = new AbortController();
    const { data: blob } = await axios.get(src, {
      responseType: "blob",
      signal: this.abortController.signal,
    });
    const objectUrl = URL.createObjectURL(blob);
    this.objectUrls.set(src, objectUrl);
    this.fifo();
    return objectUrl;
  }

  getObjectUrl(src) {
    this.abortController?.abort();
    return this.objectUrls.get(src);
  }
}
