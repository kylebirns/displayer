import VideoComponent from './videoComponent'
import React, {Component} from 'react'
import UserHome from './user-home'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

export default class VideoMain extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <div id="appBar-Container">
            <AppBar
              title={
                <span id="UserHome">
                  <UserHome />
                </span>
              }
            />
          </div>
          <VideoComponent />
        </div>
      </MuiThemeProvider>
    )
  }
}
