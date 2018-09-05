/* global chrome */
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ allData: [] }, () => {
    console.log('allData set');
  });
});
