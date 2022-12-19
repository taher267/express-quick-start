const { genSalt } = require('bcrypt');
const { model, Schema } = require('mongoose');
const { randomBytes } = require('crypto');
const { compare } = require('jsonwebtoken');

const userSchema = new Schema(
  {
    firstName: { type: String, required: [false, 'First name is required!'] },
    lastName: String,
    username: { type: String, required: [false, 'Username is required!'] },
    email: { type: String, required: [true, 'Email is required!'] },
    password: { type: String, max: [32, 'Password maximum 32 Characters'] },
    phoneNo: String,
    avatar: {
      _id: { type: String },
      url: { type: String, required: [false, 'Please privide avatar!'] },
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  //update time working
  //  if (!this.isModified('password')) {
  //     next();
  // }
  if (this.password) {
    this.password = await hash(this.password, await genSalt(10));
  }
});
//JWT Token
userSchema.methods.getJWTToken = function () {
  return sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};
userSchema.methods.getResetPasswordToken = function () {
  //Generating Token
  const resetToken = randomBytes(20).toString('hex');
  //Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const expiry = process.env.RESET_PASSWORD_EXPIRY
    ? parseInt(process.env.RESET_PASSWORD_EXPIRY)
    : 5;

  this.resetPasswordExpire = Date.now() + expiry * 60 * 1000;
  return resetToken;
};
module.exports = model('People', userSchema);
