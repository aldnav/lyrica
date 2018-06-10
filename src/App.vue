<template>
  <div id="app">
    <input type="text" v-model="videoId" placeholder="place youtube video id" />
    <youtube :video-id="videoId" ref="youtube" @playing="playing"></youtube>
    <div>
      <button @click="playVideo">play</button>
      <button @click="pauseVideo">pause</button>
      <span>{{currentTime}}</span>
    </div>
    <div>
      <span>{{line}}</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueYoutube from 'vue-youtube';
import Lyrica from './assets/js/lyrics-parser';

Vue.use(VueYoutube);

let timer = null;
let Parser = new Lyrica();

export default {
  name: 'app',
  data() {
    return {
      // videoId: 'J9gKyRmic20',
      videoId: '0Gl2QnHNpkA',
      currentTime: 0,
      lyrics: [],
      line: null
    }
  },
  methods: {
    playVideo() {
      this.player.playVideo();
    },
    pauseVideo() {
      this.player.pauseVideo();
    },
    playing() {
      if (this.lyrics.length == 0)
        return;
      if (!timer) {
        timer = setInterval(function getTime() {
          this.player.getCurrentTime().then((seconds) => {
            this.currentTime = this.prettyCurrTime(seconds);
            this.line = Parser.nextLine(this.currentTime, this.lyrics);
          });
        }.bind(this), 100);
      }
    },
    prettyCurrTime(s) {
      return(s-(s%=60))/60+(9<s?':':':0')+s
    },
    loadLyrics() {
      this.lyrics = [];
      alert(JSON.stringify(Parser))
      Parser.read('./assets/js/samplyrics.lrc').then((lyrics) => {
        this.lyrics = lyrics;
      });
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    }
  },
  mounted() {
    this.loadLyrics();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
