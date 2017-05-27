<template>
  <div id="app">
    <!--<h1>{{title}}</h1>-->
    <h1 v-text="title"></h1>
    <input type="text" v-model="newItem" @keyup.enter="addNew">
    <ul>
      <li v-for="item in items" v-bind:class="{finished:item.isFinished}"
          v-on:click="toggleFinish(item)">{{item.index}}、{{item.label}}

      </li>
    </ul>
    <hello masfromfather="you die!" @child-tell-me-something="listenToMyBoy"></hello>
    <p>child tells me:{{childWords}}</p>
  </div>
</template>

<script>
  import Hello from './components/Hello.vue';
  export default {
    data () {
      return {
        title: 'this is a todo list',
        items: [],
        newItem: '',
        childWords: '',
      };
    },
    components: { Hello },
    methods: {
      toggleFinish (item) {
        item.isFinished = !item.isFinished;
      },
      addNew () {
        this.items.push({
          index: this.items.length + 1,
          label: this.newItem,
          isFinished: false,
        });
        this.newItem = '';
      },
      listenToMyBoy (msg) {
        this.childWords = msg;
      },
    },
    watch: {
      items: {
        handler (items) {
          console.log(items);
        },
      },
    },
  };
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

  ul {
    width: 300px;
    margin: 0 auto;
  }

  li {
    list-style: none;
    text-align: left;
  }

  .finished {
    color: red;
  }
</style>
