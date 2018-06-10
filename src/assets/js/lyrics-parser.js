export default class Lyrica {
  constructor() {
    this.lyrics = [];
  }

  read(filename) {
    let fs = require('fs'),
        path = require('path'),
        filePath = path.join(__dirname, filename);

    return new Promise(function(resolve, reject) {
      fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
        if (err) reject(err);
        let lines = data.toString().split('\n');
        this.lyrics = lines.map(line => {
          let lyrArr = line.trim().split(']');

          if (!lyrArr) return;

          let timestamp = lyrArr[0].substring(1);
          let lyric = lyrArr[1];
          return {
            'timestamp': timestamp,
            'line': lyric
          }
        });

        resolve(this.lyrics);
      });

    }.bind(this));


  }

  nextLine(timestamp, lines) {
    let hours = '';
    let minutes = '';
    let seconds = '';
    let tsArr = timestamp.split(':');

    if (typeof lines !== undefined)
      this.lines = lines;

    if (tsArr.length > 2) {
      hours = tsArr[0];
      minutes = tsArr[1];
      seconds = tsArr[2];
    } else {
      minutes = tsArr[0];
      seconds = tsArr[1];
    }

    return this.lines.filter(lyrics => {
      if (!lyrics) return false;

      let lyrArr = lyrics.timestamp.split(':');
      let xHours = '',
          xMinutes = '',
          xSeconds = '';
      if (lyrArr.length > 2) {
        xHours = lyrArr[0];
        xMinutes = lyrArr[1];
        xSeconds = lyrArr[2];
      } else {
        xMinutes = lyrArr[0];
        xSeconds = lyrArr[1];
      }

      return xHours >= hours &&
             xMinutes >= minutes &&
             xSeconds >= seconds;
    })[1];
  }
}
