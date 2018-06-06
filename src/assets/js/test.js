let Lyrica = require('./lyrics-parser');

Lyrica.read('samplyrics.lrc').then((lyrics) => {
  console.log(Lyrica.nextLine('01:14', lyrics));
  console.log(Lyrica.nextLine('01:16.80', lyrics));
});

