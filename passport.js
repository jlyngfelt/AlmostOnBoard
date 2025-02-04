import express from 'express';
import axios from 'axios';
import passport from 'passport';
import OAuth2Strategy from 'passport-oauth2';

passport.use('vasttrafik', new OAuth2Strategy({
    authorizationURL: 'https://ext-api.vasttrafik.se/token',
    tokenURL: 'https://ext-api.vasttrafik.se/token',
    clientID: '',
    clientSecret: '',
    grant_type: 'client_credentials'
  },

function(accessToken, refreshToken, profile, done) {
    try {
      // Spara token i en global variabel eller databas
      global.vasstrafikToken = {
        token: accessToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // Token giltig i 24 timmar
    };
    //   return done(null, {
    //     accessToken: accessToken
    //   })
    console.log('hej');
    } catch (error) {
      return done(error);
    }
  }
));