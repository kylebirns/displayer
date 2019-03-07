import VideoComponent from './videoComponent'
import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

export default class VideoMain extends Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <AppBar title="React Twilio Video" />
          <VideoComponent />
        </div>
      </MuiThemeProvider>
    )
  }
}
