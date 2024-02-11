import { nanoid } from "nanoid";

export { emitter } from "./events";

const eventMap = new Map();

const getIpcId = (func: any) => {
  let id = "";
  if (eventMap.get(func)) {
    id = eventMap.get(func);
  } else {
    id = nanoid();
    eventMap.set(func, id);
  }
  return id;
};

export function addIpcListener(eventName: string, func: any) {
  const id = getIpcId(func);
  window.electron.rendererEvent(eventName, id, func);
}

export function removeIpcListener(eventName: string, func: any) {
  const id = getIpcId(func);
  window.electron.removeEventListener(eventName, id);
}

export interface Item {
  name: string;
  url: string;
  type: string;
}

export function downloadItem(item: Item) {
  window.electron.downloadItem(item);
}

export const BILIBILI_DOWNLOAD_BUTTON =
  ".feed-card .bili-video-card__image--link";
