// This is a Web Worker that will do the needed loading for the NativeCompileCache

const NativeCompileCache = require("../src/native-compile-cache");
const FileSystemBlobStore = require("../src/file-system-blob-store");

// Since we need data from the main JavaScript runner we will act after receiving a message

addEventListener("message", (event) => {
  let pathToLoad = event.data.pathToLoad;
  let processVersion = event.data.processVersion;
  let blobStore = FileSystemBlobStore.load(pathToLoad);

  NativeCompileCache.setCacheStore(blobStore);
  NativeCompileCache.setV8Version(processVersion);
  NativeCompileCache.install();

  self.postMessage({
    blobStore: blobStore
  });
});
