import React, { Component } from 'react';
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
  Vibration,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard
} from 'react-native';

import KeepAwake from 'react-native-keep-awake';

import {
  getTotalTimeAndVibrations,
  formatTime
} from '../lib/interval-training';

export default class IntervalTraining extends Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.renderPassingTime = this.renderPassingTime.bind(this)
    this.renderInputs = this.renderInputs.bind(this)
    this.stop = this.stop.bind(this)
    this.start = this.start.bind(this)
  }

  start () {
    KeepAwake.activate()

    const { totalTime, vibrationIntervals} = getTotalTimeAndVibrations(this.state)

    let time = 0
    this.setState({
      passingTime: totalTime
    })
    Vibration.vibrate([200, 100, 200, 100, 200])

    const interval = setInterval(() => {
      time++
      this.setState({
        passingTime: totalTime - time
      })

      if (vibrationIntervals[time]) {
        Vibration.vibrate(vibrationIntervals[time])
      }

      if (time === totalTime) {
        this.stop()
      }
    }, 1000)

    this.setState({ interval })
  }

  stop () {
    KeepAwake.deactivate()
    clearInterval(this.state.interval)
    this.setState({
      passingTime: undefined
    })
  }

  renderPassingTime () {
    if (this.state.passingTime !== undefined) {
      return (
        <View style={styles.passingTimeContainer}>
          <Text style={styles.passingTime}>
            {formatTime(this.state)}
          </Text>
          <TouchableHighlight
            onPress={this.stop}>
            <View style={styles.buttonStop}>
              <Text style={styles.buttonText}>Stop</Text>
            </View>
          </TouchableHighlight>
        </View>
      )
    }
  }

  renderInputs () {
    if (this.state.passingTime === undefined) {
      return (
        <View style={styles.inputs}>

          <Text style={styles.timeSoFar}>
            {formatTime(this.state)}
          </Text>

          <Text>Number of intervals</Text>
          <TextInput
            style={styles.input}
            onChangeText={(intervals) => this.setState({intervals})}
            value={this.state.intervals}
          />
          <Text>How long each interval?</Text>
          <TextInput
            style={styles.input}
            onChangeText={(intervalTime) => this.setState({intervalTime})}
            value={this.state.intervalTime}
          />
          <Text>How long between intervals?</Text>
          <TextInput
            style={styles.input}
            onChangeText={(breakTime) => this.setState({breakTime})}
            value={this.state.breakTime}
          />
          <TouchableHighlight
            onPress={this.start}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Start</Text>
            </View>
          </TouchableHighlight>
        </View>
      )
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {this.renderPassingTime()}
          {this.renderInputs()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  inputs: {
    flex: 1,
    paddingTop: 50,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: 320,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    textAlign: 'center',
    borderRadius: 5
  },
  button: {
    width: 320,
    padding: 10,
    borderRadius: 5,
    borderColor: '#008975',
    backgroundColor: '#00AA8D'
  },
  buttonStop: {
    width: 320,
    padding: 10,
    borderRadius: 5,
    borderColor: '#e68a00',
    backgroundColor: '#ffad33'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 30,
    textAlign: 'center'
  },
  passingTimeContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  passingTime: {
    fontSize: 40,
    textAlign: 'center',
    padding: 20
  },
  timeSoFar: {
    fontSize: 40,
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 30
  }
});
