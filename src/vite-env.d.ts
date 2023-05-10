/// <reference types="vite/client" />
declare global {
  declare function loadSound(
    path: string | any[],
    successCallback?: (...args: any[]) => any,
    errorCallback?: (...args: any[]) => any,
    whileLoading?: (...args: any[]) => any
  ): p5.SoundFile;
}
