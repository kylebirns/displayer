const AccessToken = require('twilio').jwt.AccessToken
const VideoGrant = AccessToken.VideoGrant

// Used when generating any kind of Access Token
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID
const twilioApiKey = process.env.TWILIO_SID
const twilioApiSecret = process.env.TWILIO_SECRET

// Create an access token which we will sign and return to the client,
// containing the grant we just created
const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret)
token.identity = 'alice'

// Create a Video grant which enables a client to use Video
// and limits access to the specified Room (DailyStandup)
const videoGrant = new VideoGrant({
  room: 'DailyStandup'
})

// Add the grant to the token
token.addGrant(videoGrant)

// Serialize the token to a JWT string
console.log(token.toJwt())

const {connect} = require('twilio-video')

// Connect to a Room
connect('$TOKEN', {name: 'my-new-room'}).then(
  room => {
    console.log(`Successfully joined a Room: ${room}`)
    room.on('participantConnected', participant => {
      console.log(`A remote Participant connected: ${participant}`)
    })
  },
  error => {
    console.error(`Unable to connect to Room: ${error.message}`)
  }
)

// Join a Room
connect('$TOKEN', {name: 'existing-room'}).then(
  room => {
    console.log(`Successfully joined a Room: ${room}`)
    room.on('participantConnected', participant => {
      console.log(`A remote Participant connected: ${participant}`)
    })
  },
  error => {
    console.error(`Unable to connect to Room: ${error.message}`)
  }
)

// Setup local media - connect to users microphone and camera
const {createLocalTracks} = require('twilio-video')

// Option 1
createLocalTracks({
  audio: true,
  video: {width: 640}
})
  .then(localTracks => {
    return connect('$TOKEN', {
      name: 'my-room-name',
      tracks: localTracks
    })
  })
  .then(room => {
    console.log(`Connected to Room: ${room.name}`)
  })

// Option 2
connect('$TOKEN', {
  audio: true,
  name: 'my-room-name',
  video: {width: 640}
}).then(room => {
  console.log(`Connected to Room: ${room.name}`)
})

//Handle connected participants
// Log your Client's LocalParticipant in the Room
const localParticipant = room.localParticipant
console.log(
  `Connected to the Room as LocalParticipant "${localParticipant.identity}"`
)

// Log any Participants already connected to the Room
room.participants.forEach(participant => {
  console.log(`Participant "${participant.identity}" is connected to the Room`)
})

// Log new Participants as they connect to the Room
room.once('participantConnected', participant => {
  console.log(`Participant "${participant.identity}" has connected to the Room`)
})

// Log Participants as they disconnect from the Room
room.once('participantDisconnected', participant => {
  console.log(
    `Participant "${participant.identity}" has disconnected from the Room`
  )
})

// Handle particpant connection events
room.on('participantConnected', participant => {
  console.log(`Participant connected: ${participant.identity}`)
})

room.on('participantDisconnected', participant => {
  console.log(`Participant disconnected: ${participant.identity}`)
})
