/**
 * Get a MediaStream containing a MediaStreamTrack that represents the user's
 * screen.
 *
 * This function sends a "getUserScreen" request to our Chrome Extension which,
 * if successful, responds with the sourceId of one of the specified sources. We
 * then use the sourceId to call getUserMedia.
 *
 * @param {Array<DesktopCaptureSourceType>} sources
 * @param {string} extensionId
 * @returns {Promise<MediaStream>} stream
 */

function getUserScreen(sources, extensionId) {
  const request = {
    type: 'getUserScreen',
    sources: sources
  }
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(extensionId, request, response => {
      switch (response && response.type) {
        case 'success':
          resolve(response.streamId)
          break

        case 'error':
          reject(new Error(error.message))
          break

        default:
          reject(new Error('Unknown response'))
          break
      }
    })
  }).then(streamId => {
    return navigator.mediaDevices.getUserMedia({
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: streamId,
          // You can provide additional constraints. For example,
          maxWidth: 1920,
          maxHeight: 1080,
          maxFrameRate: 10,
          minAspectRatio: 1.77
        }
      }
    })
  })
}

chrome.runtime.onMessageExternal.addListener(
  (message, sender, sendResponse) => {
    switch (message && message.type) {
      // Our web app sent us a "getUserScreen" request.
      case 'getUserScreen':
        handleGetUserScreenRequest(message.sources, sender.tab, sendResponse)
        break

      // Our web app sent us a request we don't recognize.
      default:
        handleUnrecognizedRequest(sendResponse)
        break
    }

    return true
  }
)

function handleGetUserScreenRequest(sources, tab, sendResponse) {
  chrome.desktopCapture.chooseDesktopMedia(sources, tab, streamId => {
    // The user canceled our request.
    if (!streamId) {
      sendResponse({
        type: 'error',
        message: 'Failed to get stream ID'
      })
    }

    // The user accepted our request.
    sendResponse({
      type: 'success',
      streamId: streamId
    })
  })
}

function handleUnrecognizedRequest(sendResponse) {
  sendResponse({
    type: 'error',
    message: 'Unrecognized request'
  })
}
