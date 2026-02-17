const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

const googleLogin = async (req, res) => {
  const { code } = req.body; // Changed from token to code

  if (!code) {
    return res.status(400).json({ message: 'Authorization code is required' });
  }

  try {
    // Exchange code for tokens
    // When using 'postmessage' flow (popup) with @react-oauth/google, we must specify 'postmessage' as the redirect_uri
    const { tokens } = await client.getToken({
      code,
      redirect_uri: 'postmessage' 
    });
    const idToken = tokens.id_token;

    // Verify the ID token
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {
      user = new User({
        name,
        email,
        googleId,
        password: '',
      });
      await user.save();
    }

    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        picture: picture
      }
    });

  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ message: 'Google authentication failed' });
  }
};

module.exports = {
  login,
  googleLogin
};
