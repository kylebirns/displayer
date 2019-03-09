import React, {Component} from 'react'
const {connect, LocalVideoTrack} = require('twilio-video')

export default class screenShare extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>Hello</div>
  }
}

// Option 2. First connect, and then add screenLocalTrack.
async function shareScreen() {
  const room = await connect('my-token', {
    name: 'my-room-name',
    tracks: []
  })

  const stream = await getUserScreen(
    ['window', 'screen', 'tab'],
    process.env.EXTENSION_ID
  )
  const screenLocalTrack = new LocalVideoTrack(stream.getVideoTracks()[0])

  screenLocalTrack.once('stopped', () => {
    room.localParticipant.removeTrack(screenLocalTrack)
  })

  room.localParticipant.addTrack(screenLocalTrack)
  return room
}

//state: screenTrack
//isScreenSharingEnabled: Boolean(screenTrack)
// <div>
//   <video autoPlay id="screen-view" />
//   <button type="submit" id="get-screen">
//     Get the screen
//   </button>
//   <button
//     type="submit"
//     id="stop-screen"
//     onClick={this.stopScreen}
//     style={{display: 'none'}}
//   >
//     Stop the screen
//   </button>
// </div>

// shareScreen() {
//   const EXTENSION_ID = process.env.EXTENSION_ID

//   // const video = document.getElementById('screen-view');
//   // const getScreen = document.getElementById('get-screen');
//   // const stopScreen = document.getElementById('stop-screen');
//   const request = {sources: ['window', 'screen', 'tab']}
//   let stream
//   getScreen.addEventListener('click', event => {
//     chrome.runtime.sendMessage(EXTENSION_ID, request, response => {
//       if (response && response.type === 'success') {
//         navigator.mediaDevices
//           .getUserMedia({
//             video: {
//               mandatory: {
//                 chromeMediaSource: 'desktop',
//                 chromeMediaSourceId: response.streamId
//               }
//             }
//           })
//           .then(returnedStream => {
//             stream = returnedStream
//             video.src = URL.createObjectURL(stream)
//             getScreen.style.display = 'none'
//             stopScreen.style.display = 'inline'
//           })
//           .catch(err => {
//             console.error('Could not get stream: ', err)
//           })
//       } else {
//         console.error('Could not get stream')
//       }
//     })
//   })
//   stopScreen.addEventListener('click', event => {
//     stream.getTracks().forEach(track => track.stop())
//     video.src = ''
//     stopScreen.style.display = 'none'
//     getScreen.style.display = 'inline'
//   })
// }
// shareScreen = async () => {
//   try {
//     const {screenTrack} = this.state

//     if (!screenTrack) {
//       const localVideoTrack = await Video.createLocalVideoTrack()

//       const stream = await navigator.mediaDevices.getDisplayMedia({
//         video: true
//       })
//       const newScreenTrack = first(stream.getVideoTracks())

//       this.setState({
//         screenTrack: new Video.LocalVideoTrack(newScreenTrack)
//       })

//       activeRoom.localParticipant.publishTrack(newScreenTrack)
//       activeRoom.localParticipant.unpublishTrack(localVideoTrack)
//     } else {
//       activeRoom.localParticipant.unpublishTrack(screenTrack)
//       activeRoom.localParticipant.publishTrack(localVideoTrack)
//       this.stopScreenTrack()
//     }
//   } catch (error) {
//     this.stopScreenTrack()

//     this.setState({
//       errorMessage: error.message
//     })
//   }
// }

// navigator.mediaDevices.getDisplayMedia is not a function
// stop is not set up either

// shareScreen = async () => {
//   try {
//     const {screenTrack} = this.state

//     if (!screenTrack) {
//       const localVideoTrack = await Video.createLocalVideoTrack()
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true
//       })
//       const newScreenTrack = first(stream.getVideoTracks())

//       this.setState({
//         screenTrack: new Video.LocalVideoTrack(newScreenTrack)
//       })

//       this.state.activeRoom.localParticipant.publishTrack(newScreenTrack)
//       this.state.activeRoom.localParticipant.unpublishTrack(localVideoTrack)
//     } else {
//       const localVideoTrack = await Video.createLocalVideoTrack()
//       this.state.activeRoom.localParticipant.unpublishTrack(screenTrack)
//       this.state.activeRoom.localParticipant.publishTrack(localVideoTrack)
//       // this.stopScreenTrack()
//     }
//   } catch (error) {
//     // this.stopScreenTrack()
//     alert(error.message)
//   }
// }

// shareScreen = () => {
//   let extensionId = process.env.EXTENSION_ID;
//   return new Promise((resolve, reject) => {
//     const request = {
//       sources: ['screen']
//     };
//     chrome.runtime.sendMessage(extensionId, request, response => {
//       if (response && response.type === 'success') {
//         resolve({ streamId: response.streamId });
//       } else {
//         reject(new Error('Could not get stream'));
//       }
//     });
//   }).then(response => {
//     return navigator.mediaDevices.getUserMedia({
//       video: {
//         mandatory: {
//           chromeMediaSource: 'desktop',
//           chromeMediaSourceId: response.streamId
//         }
//       }
//     });
//   });
// }

//other try
