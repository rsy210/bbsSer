var express = require('express');
var router = express.Router();
var crypto = require('crypto');//crypto是nodejs的一个核心模块，生成散列值加密密码
var User = require('../models/user.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{
  	user:req.session.user,
  	console.log(req.session.user);
  	//userNick:req.session.user.userNick;
  });
});
router.post('/', function(req, res) {
});
//详情页
router.get('/detail', function(req, res) {
  res.render('details');
});
router.post('/detail', function(req, res) {
});
//个人空间
router.get('/personspace', function(req, res) {
  res.render('person_space',{
  	user:req.session.user
  	//userNick:req.session.user.userNick;
  });
});
router.post('/personspace', function(req, res) {
});
//发布页
router.get('/post', function(req, res) {
  res.render('publish_page');
});
router.post('/post', function(req, res) {
});


//接收注册表单；注册路由
router.post('/reg', function(req, res) {
	var name = req.body.userNick;
	var password = req.body.password;
	var password_re = req.body['password-repeat'];

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
	User.get(newUser.name,function(err,user){
		if(user){
			req.flash('err','用户已经存在');
			return res.redirect('/');//返回失败首页面
		}
		//如果不存在新增用户
		newUser.save(function(err,user){
			if(err){
			req.flash('error',err);
			return res.redirect('/');//返回失败首页面
		}
			req.session.user = user;//用户信息存入session
			req.flash('success','成功');//
			res.redirect('/');//注册成功返回主页
		});
	});
});

module.exports = router;
