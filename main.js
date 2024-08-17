// 在真正返回 response 之前使用
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
      Object.assign(book,data)
      response.data = book
    }
    return response
  })
  /*上面是假的后台数据库*/
  
  
  
  
  
  axios.get('/books/1') // 使用 AJAX去获取一个数据
   .then(({data})=>{
   let originalHtml = $('#app').html() // 将获取到的数据替换到 html中
   let newHtml = originalHtml.replace('__name__', data.name)
    .replace('__number__', data.number)
   $('#app').html(newHtml)
  })
  
  
  
  
  
  
  
  
  $('#app').on('click','#addOne',function(){ // 通过事件委托监听 app 的点击事件
    var oldNumber = $('#number').text() //string
    var newNumber = oldNumber -0 +1
   // $('#number').text(newNumber) 
   // 用 put 发请求，修改数据
    axios.put('/books/1',{
      number: newNumber
    }).then(()=>{
      $('#number').text(newNumber)
  })
  })
  $('#app').on('click','#minusOne',function(){
    var oldNumber = $('#number').text()
    var newNumber = oldNumber -0 -1
   // $('#number').text(newNumber)
    axios.put('/books/1',{ // 将 number 以 newNumber 的形式，push到服务器上
      number: newNumber
    }).then(()=>{
      $('#number').text(newNumber) // 如果put 成功了，就修改本地的 number
    })
  })
  $('#app').on('click','#reset',function(){
   // $('#number').text(0)
    axios.put('/books/1',{
      number: 0
    }).then(()=>{
      $('#number').text(0)
    })
  })