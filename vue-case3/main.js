// v-show: 如果是什么，就展示什么
let view = new Vue({
    el: '#app',
    data:{
     selected: 0
    },
    template:`
      <div>
       <ol>
          <li v-bind:class="{active:selected === 0}"
            v-on:click="selected = 0">1</li>
          <li v-bind:class="{active:selected === 1}"
            v-on:click="selected = 1">2</li>
          <li v-bind:class="{active:selected === 2}"
            v-on:click="selected = 2">3</li>
       </ol>
       <ol>
          <li v-show="selected === 0">1</li>
          <li v-show="selected === 1">2</li>
          <li v-show="selected === 2">3</li>
       </ol>
      </div>
    `,
    methods: {
  
    }
  })