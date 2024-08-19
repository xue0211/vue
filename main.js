fakeData()
/* 如何从传统的 MVC 变成 Vue 的 MVC？
1.忘掉 render
2.把 data 放到 view  上面
3.需要改变那个值(name,number,id)，就直接去改那个值 --> 
  更新 view.data, 它会去自动更新HTML
4.Vue 会非常精细的更新它该更新的地方，未更新的地方不会刷新改变
5.不再需要controller，已经合并到 Vue 里面
*/

function Model(options){
  this.data = options.data
  this.resource = options.resource
}

Model.prototype.fetch = function(id){
  return axios.get(`/${this.resource}s/${id}`).then((response)=>{
      this.data = response.data
      return response
  })

}

Model.prototype.update = function(data){
   let id = this.data.id
    return axios.put(`/${this.resource}s/${id}`, data).then((response)=>{
      this.data = response.data
      return response
    })  // 更新数据
}

//------------ 上面是 MVC类，下面是对象
let model = new Model({
   data: {
    name: '',
    number: 0,
    id: ''
  }, // 初始数据
  resource: 'book' // 请求的 url
})

let view = new Vue({
  el: '#app', // element
  data: {
   book:{
      name: '未命名',
      number: 0,
      id: ''
      },
    n: 1
  },
  template:` 
 <div>
   <div>
      书名：《{{book.name}}》
      数量：<span id="number">{{book.number}}</span>
   </div>
   <div>
       <input v-model="n" />
      N 的值是 {{n}}
   </div>
   <div>
    <button v-on:click="addOne">加N</button> 
    <button v-on:click="minusOne">减N</button>
    <button v-on:click="reset">归零</button>
   </div>
 </div>
  `,
  created(){
    model.fetch(1).then(()=>{
      this.book = model.data
    })
  },
  methods:{
    addOne(){
      model.update({
        number: this.book.number + (this.n-0)    // 读值
      }).then(()=>{
        this.view.book = this.model.data   // 赋值
    })
  },
    minusOne(){
      model.update({
        number: this.book.number - (this.n-0)
      }).then(()=>{
       this.view.book = this.model.data
    })
  },
    reset(){
        model.update({
          number: 0
        }).then(()=>{
       this.view.book = this.model.data
     })
   },
  }
})






/*下面是假的后台数据库*/
// 在真正返回 response 之前使用
function fakeData(){
  let book = {
    name: 'JavaScript高级程序设计',
    number: 2,
    id: 1
  }
  axios.interceptors.response.use(function(response){
    /*let config = response.config
    let {method,url,data} = config // data 是请求的data*/
    let {config:{method,url,data}} = response
    if(url === '/books/1' && method === 'get'){
      response.data = book          // data 是响应的data
    }else if(url === '/books/1' && method === 'put'){
      data = JSON.parse(data)  // 将 string 变成 number
      Object.assign(book,data)
      response.data = book
    }
     return response
  })
}
