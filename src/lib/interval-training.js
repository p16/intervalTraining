export function getTotalTimeAndVibrations({ intervals, intervalTime, breakTime }) {
  intervals = parseInt(intervals) || 0
  intervalTime = parseInt(intervalTime) * 60 || 0
  breakTime = parseInt(breakTime) * 60 || 0

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

  return { totalTime, vibrationIntervals }
}

export function formatTime ({ passingTime, intervals, intervalTime, breakTime }) {
  if (!passingTime) {
    intervals = parseInt(intervals) || 0
    intervalTime = parseInt(intervalTime) * 60 || 0
    breakTime = parseInt(breakTime) * 60 || 0

    let chunkTime = intervalTime + breakTime
    passingTime = intervals * chunkTime
  }

  const totalSeconds = passingTime
  const totalMinutes = Math.floor(totalSeconds/60)
  const hours = Math.floor(totalMinutes/60)
  const minutes = totalMinutes - (hours * 60)
  const seconds = totalSeconds - (totalMinutes * 60)

  return `${hours < 10 ? '0'+hours : hours}:${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`
}