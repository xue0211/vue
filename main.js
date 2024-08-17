fakeData()
/* 所有和数据相关的操作，全部都由 model 来实现;
   所有和html有关的操作，全部都由 view来实现;
   通过绑定事件，实现所有的this 都是 controller
   view 和 model 操作不了的部分交给 controller
*/
let model = {
  data: {
    name: '',
    number: 0,
    id: ''
  }, // 初始数据
  fetch(id){
      return axios.get(`/books/${id}`).then((response)=>{
      this.data = response.data
      return response
   })
  }, // 获取数据
  update(data){
    id = this.data.id
    return axios.put(`/books/${id}`, data).then((response)=>{
      this.data = response.data
      return response
    })  // 更新数据
  }
}

let view = {
  el: '#app', // element
  template:` 
   <div>
      书名：《__name__》
      数量：<span id="number">__number__</span>
   </div>
   <div>
    <button id="addOne">加一</button>
    <button id="minusOne">减一</button>
    <button id="reset">归零</button>
   </div>
`,  
  render(data){
    let html = this.template.replace('__name__', data.name)
    .replace('__number__', data.number)
    $(this.el).html(html)
  }
}  // 如何去更新 view

var controller = {
  init(options){
     //let {model, view} = options
     let view = options.view
     let model = options.model
     this.model = model
     this.view = view
     this.view.render(this.model.data) // 初次渲染 view
     this.bindEvents()
     this.model.fetch(1)               // 获取一本书 
      .then(()=>{
       this.view.render(this.model.data)
    })
  },
  addOne(){
      var oldNumber = $('#number').text() //string
      var newNumber = oldNumber -0 +1
      // $('#number').text(newNumber) 
      // 用 put 发请求，修改数据
      this.model.update({number:newNumber})
        .then(()=>{
      this.view.render(this.model.data)
    })
  },
  minusOne(){
     var oldNumber = $('#number').text()
     var newNumber = oldNumber -0 -1
     // $('#number').text(newNumber)
     this.model.update({number:newNumber})
       .then(()=>{
     this.view.render(this.model.data)
    })
  },
  reset(){
     // $('#number').text(0)
     this.model.update({number:0})
        .then(()=>{
     this.view.render( this.model.data)
    })
  },
  bindEvents(){
    // this === controller
    $(this.view.el).on('click','#addOne',this.addOne.bind(this))
    $(this.view.el).on('click','#minusOne',this.minusOne.bind(this))
    $(this.view.el).on('click','#reset',this.reset.bind(this))
  }
}

controller.init({view: view, model: model})












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
