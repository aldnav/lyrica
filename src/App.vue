<template>
  <div id="app">
    <youtube :video-id="videoId" ref="youtube" @playing="playing"></youtube>
    <div>
      <button @click="playVideo">play</button>
      <button @click="pauseVideo">pause</button>
      <span>{{currentTime}}</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueYoutube from 'vue-youtube';

Vue.use(VueYoutube);

let timer = null;

export default {
  name: 'app',
  data() {
    return {
      videoId: 'J9gKyRmic20',
      currentTime: 0
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
      if (!timer) {
        timer = setInterval(function getTime() {
          this.player.getCurrentTime().then((seconds) => {
            this.currentTime = this.prettyCurrTime(seconds);
          });
        }.bind(this), 100);
      }
    },
    prettyCurrTime(s) {
      return(s-(s%=60))/60+(9<s?':':':0')+s
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    }
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
