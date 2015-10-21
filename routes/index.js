var express = require('express');
var router = express.Router();
var crypto = require('crypto');//crypto是nodejs的一个核心模块，生成散列值加密密码
var User = require('../models/user.js');
var Post = require('../models/post.js');



/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("session1"+req.session.user);
  res.render('index',{
  	user:req.session.user,
  	userNick:req.session.name
  	//userNick:req.session.user.userNick;
  });
});
router.post('/', function(req, res) {
});




/////////////////////////////
//详情页
router.get('/detail', function(req, res) {
	Post.get(null,function(err,posts){
		if(err){posts=[];}
  res.render('details',{
  	title:'详情',
  	user:req.session.user,
  	posts:posts,
  	userNick:req.session.name
  });
});
});
router.post('/detail', function(req, res) {
});


/////////////////////////////
router.get('/personspace',checkLogin);
//个人空间
router.get('/personspace', function(req, res) {
	console.log("session2"+req.session.user);
  res.render('person_space',{
  	user:req.session.user,
  	userNick:req.session.name
  	//userNick:req.session.user.userNick;
  });
});
router.post('/personspace',checkLogin);
router.post('/personspace', function(req, res) {
});




/////////////////////////
router.get('/post',checkLogin);
//发布页
router.get('/post', function(req, res) {
  res.render('publish_page',{
  	user:req.session.user,
  	userNick:req.session.name
  });
});
router.post('/post',checkLogin);
router.post('/post', function(req, res) {
	var currentUser = req.session.user,
		post = new Post(currentUser.name,req.body.title,req.body.post);
	post.save(function(err){
		if(err){
			req.flash('error',err);
			return res.redirect('/');
		}
		req.flash('success','发布成功');
		res.redirect('/detail');//发布成功跳转到主页
	});
});



//////////////////////
router.post('/reg',checkNotLogin);
//接收注册表单；注册路由
router.post('/reg', function(req, res) {
	var name = req.body.userNick,
		password = req.body.password,
		password_re = req.body['password-repeat'];

	//检验两次输入的密码是否一致
	if(password != password_re){
		req.flash('error','两次输入的密码不一致！');
		return res.redirect('/');//返回shou页面
	}
	//生成密码的md5值
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('hex');
	var newUser = new User({
		name:req.body.userNick,
		password:password,
		email:req.body.userEmail
	});
	//检查用户名是否已经存在
	User.getName(newUser.name,function(err,user){
		if(user){
			console.log("user:"+user);
			req.flash('err','用户已经存在');
			return res.redirect('/');//返回失败首页面
		}
		//如果不存在新增用户
		newUser.save(function(err,user){
			if(err){
			req.flash('error',err);
			return res.redirect('/');//返回失败首页面
		}
		    console.log("user:"+user);
			req.session.user = user;//用户信息存入session
			req.session.name = newUser.name;//用户信息存入session
			console.log("session3"+req.session.user);
			req.flash('success','成功');//
			res.redirect('/personspace');//注册成功返回主页
		});
	});
});
//////////////////////////
router.post('/login',checkNotLogin);
//实现登陆功能
router.post('/login', function(req, res) {
	//生成md5密码
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('hex');

	User.getEmail(req.body.userEmail,function(err,user){
		if (!user) {
			req.flash('error','用户不存在');
			console.log("bucunzai");
			return res.redirect('/');
		}
		//检查密码是否一致
		if (user.password != password ) {
			req.flash('error','密码错误');
			console.log("error");
			return res.redirect('/');
		}
		//用户名密码匹配后，将用户信息存入session
		req.session.user=user;
		req.session.name = user.name;//用户信息存入session
		req.flash('success','登陆成功');
		console.log("ok");
		res.redirect('/personspace');
	})
});
router.get('/logout',checkLogin);
//登出
router.get('/logout', function(req, res) {
  req.session.user = null;
  return res.redirect('/');
});


//////////////////////////////
//页面权限控制
//未登录
function checkLogin(req,res,next){
	console.log("session4  "+req.session.user);
if(!req.session.user){
	req.flash('error','未登录');
	res.redirect('/');
}
next();}
function checkNotLogin(req,res,next){
	console.log("session5  "+req.session.user);
if(req.session.user){
	req.flash('error','已登录');
	res.redirect('back');
}
next();}

module.exports = router;
