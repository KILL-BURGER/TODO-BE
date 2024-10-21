const User = require("../model/User");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const userController = {};

// 회원가입
userController.createUser = async (req, res) => {
  try {
    const {email, name, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
      throw new Error('이미 가입된 유저입니다.');
    }
    if (password === '') {
      throw new Error('비밀번호를 입력해주세요.');
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({email: email, name: name, password: hash});
    await newUser.save();
    res.status(200).json({status: 'success'});
  } catch (err) {
    if (err.errors) {
      res.status(400).json({status: 'fail', message: err.errors});
    } else {
      res.status(400).json({status: 'fail', message: err.message});
    }
  }
};

// 로그인
userController.loginWithEmail = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email}, '-createdAt -updatedAt -__v');
    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      console.log('로그인 성공여부', isMatch);
      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({status: 'success', user, token});
      }
    }
    throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
  } catch (err) {
    res.status(400).json({status: 'fail', message: err.message});
  }
}

module.exports = userController;