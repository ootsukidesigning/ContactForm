const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  secure: false,
})

exports.handler = function (event, context, callback) {
  const { name, email, type, text } = JSON.parse(event.body).payload.data

  let mailOptions = {
    from: `"大槻デザイニング"<info@de-signing.com> `,
    to: `${email}`,
    subject: `【大槻デザインニング】お問い合わせありがとうございます。`,
    text: `${name}様
お問い合わせありがとうございます。
本メールは自動返信メールです。
内容を確認後、あらためてご連絡をさせていただきますので
今しばらくお待ちくださいますようお願い申し上げます。
お問い合わせ内容[${type}]
${text}`,
    html: `<b>${name}様</b>
<p><b>お問い合わせありがとうございます。</b></p>
<p>本メールは自動返信メールです。<br />
内容を確認後、あらためてご連絡をさせていただきますので<br />
今しばらくお待ちくださいますようお願い申し上げます。</p>
<p><b>お問い合わせ内容[${type}]</b><br />
${text}</p>`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      callback(error)
    } else {
      callback(null, {
        statusCode: 200,
        body: 'Ok',
      })
    }
  })
}
