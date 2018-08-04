/* 
* @Author: 2861399191@qq.com
* @Date:   2018-06-24 17:04:16
* @Last Modified by:   lianglizhong
* @Last Modified time: 2018-08-04 15:06:01
*/

'use strict';
const koa=require("koa");
const app =new koa();
const convert=require("koa-convert");
const hbs = require('koa-hbs');//引入handlebars

const helpers = require('handlebars-helpers')({
  handlebars:hbs.handlebars
});//使用帮助方法
const path=require("path");
const serve = require('koa-static');
// const common= require("common");


hbs.registerHelper('fullName', function(person) {
   console.log("111-->",person);
   return `${person}111`
});




app.use(async(ctx,next)=>{
    Object.assign(ctx, {
      
      toValue(){
        console.log("添加到ctx方法上");
      }
    });
    await next();
});
// app.use(convert(hbs.middleware({
//   viewPath: path.join(__dirname , './www'),
//   layoutsPath: path.join(__dirname , './www'),
//   partialsPath: path.join(__dirname , './www'),
//   defaultLayout: "layout",
//   extname: ".html",
//   disableCache: false

// })))
app.use(serve(path.join(__dirname , './www')));
app.use(async(ctx,next)=>{

  const url=ctx.path;
  let  layout=null;
  ctx.toValue();

  console.log("url-->",url);
    const data = {
        title: 'my title',
        author: 'queckezz',
        "accounts": [
            { 'name': 'John', 'email': 'john@example.com' },
            { 'name': 'Malcolm', 'email': 'malcolm@example.com' },
            { 'name': 'David', 'email': 'david@example.com' }
        ]
    }


  // 对pjax进行判断
     
     console.log(ctx.headers["x-pjax"]);
     layout=ctx.headers["x-pjax"]?layout:"layout";
      console.log("layout-->",layout);
     await convert(hbs.middleware({
      viewPath: path.join(__dirname , './www'),
      layoutsPath: path.join(__dirname , './www'),
      partialsPath: path.join(__dirname , './www'),
      defaultLayout: layout,
      extname: ".html",
      disableCache: true
    }))(ctx,next)
  
  if(url==="/index"){
    console.log(122);
     await ctx.render('index',data);
  }

  if(url==="/other"){



    await ctx.render('other');
   
  }
  
})



app.listen(3012,()=>{
    console.log("模板引擎");
})