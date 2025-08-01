// lib/sendMail.js
import nodemailer from 'nodemailer'
import { google } from 'googleapis'

const {
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REFRESH_TOKEN,
  GMAIL_USER_EMAIL,
} = process.env

const OAuth2 = google.auth.OAuth2

export async function sendInventoryEmail({ to, subject, html }) {
  const oauth2Client = new OAuth2(
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground' // redirect URI utilisé pour générer le refresh token
  )

  oauth2Client.setCredentials({
    refresh_token: GMAIL_REFRESH_TOKEN,
  })

  try {
    const { token } = await oauth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: GMAIL_USER_EMAIL,
        clientId: GMAIL_CLIENT_ID,
        clientSecret: GMAIL_CLIENT_SECRET,
        refreshToken: GMAIL_REFRESH_TOKEN,
        accessToken: token,
      },
    })

    const mailOptions = {
      from: `Checkin Inventaire <${GMAIL_USER_EMAIL}>`,
      to,
      subject,
      html,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email envoyé :', info.messageId)
    return { success: true }
  } catch (err) {
    console.error('Erreur envoi mail :', err)
    return { success: false, error: err.message }
  }
}
