import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import {first} from 'lodash'

// Just assume screen sharing is enabled?

export default class screenShare extends Component {
  //state: screenTrack
  //isScreenSharingEnabled: Boolean(screenTrack)
  render() {
    return (
      <div>
        <Button onClick={() => shareScreen()}>
          {isScreenSharingEnabled ? 'Stop sharing' : 'Start sharing'}
        </Button>
      </div>
    )
  }
}

shareScreen = async () => {
  try {
    const {screenTrack} = this.state

    if (!screenTrack) {
      const localVideoTrack = await Video.createLocalVideoTrack()

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      })
      const newScreenTrack = first(stream.getVideoTracks())

      this.setState({
        screenTrack: new Video.LocalVideoTrack(newScreenTrack)
      })

      room.localParticipant.publishTrack(newScreenTrack)
      room.localParticipant.unpublishTrack(localVideoTrack)
    } else {
      room.localParticipant.unpublishTrack(screenTrack)
      room.localParticipant.publishTrack(localVideoTrack)
      this.stopScreenTrack()
    }
  } catch (error) {
    this.stopScreenTrack()

    this.setState({
      errorMessage: error.message
    })
  }
}
