/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  TouchableHighlight,
  Vibration,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

/*
<TouchableHighlight
  style={styles.wrapper}
  onPress={() => Vibration.vibrate()}>
  <View style={styles.button}>
    <Text>Vibrate</Text>
  </View>
</TouchableHighlight>
*/

export default class intervalTraining extends Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.renderPassingTime = this.renderPassingTime.bind(this)
    this.renderInputs = this.renderInputs.bind(this)
    this.stop = this.stop.bind(this)
    this.start = this.start.bind(this)
  }

  start () {
    let {
      intervals,
      intervalTime,
      breakTime,
    } = this.state
    let seconds = 0

    intervals = parseInt(intervals)
    intervalTime = parseInt(intervalTime) * 60
    breakTime = parseInt(breakTime) * 60

    let chunkTime = intervalTime + breakTime
    let totalTime = intervals * chunkTime

    const vibrationIntervals = {}
    vibrationIntervals[0] = [500]

    for(let index = 1; index <= intervals; index++) {
      let breakEnd = index * chunkTime
      let intervalEnd = (breakEnd - breakTime)

      vibrationIntervals[intervalEnd] = [500, 200, 500, 200, 500]
      vibrationIntervals[breakEnd] = [1000]
    }

    let time = 0
    this.setState({
      passingTime: totalTime - time
    })

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
    clearInterval(this.state.interval)
    this.setState({
      passingTime: undefined
    })
  }

  formatPassingTime (totalSeconds) {
    const minutes = Math.floor(totalSeconds/60)
    const seconds = totalSeconds - (minutes * 60)

    return `${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`
  }

  renderPassingTime () {
    if (this.state.passingTime !== undefined) {
      return (
        <View>
          <Text style={styles.passingTime}>
            {this.formatPassingTime(this.state.passingTime)}
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
          <TextInput
            style={styles.input}
            placeholder="number of intervals"
            onChangeText={(intervals) => this.setState({intervals})}
            value={this.state.intervals}
          />
          <TextInput
            style={styles.input}
            placeholder="how long each interval?"
            onChangeText={(intervalTime) => this.setState({intervalTime})}
            value={this.state.intervalTime}
          />
          <TextInput
            style={styles.input}
            placeholder="how long the break between intervals?"
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
      <View style={styles.container}>
        {this.renderPassingTime()}
        {this.renderInputs()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  inputs: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: 320,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    textAlign: 'center'
  },
  button: {
    width: 320,
    padding: 10,
    borderRadius: 5,
    borderColor: '#004d1a',
    backgroundColor: '#00e64d'
  },
  buttonStop: {
    width: 320,
    padding: 10,
    borderRadius: 5,
    borderColor: '#e68a00',
    backgroundColor: '#ffad33'
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center'
  },
  passingTime: {
    fontSize: 25,
    textAlign: 'center',
    padding: 20
  }
});

AppRegistry.registerComponent('intervalTraining', () => intervalTraining);
