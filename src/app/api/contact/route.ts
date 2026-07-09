import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const TO_EMAIL = 'info@lomagundiconstructionservicesltd.co.uk'
const FROM_EMAIL = 'Lomagundi Construction <noreply@lomagundiconstructionservicesltd.co.uk>'

export async function POST(request: Request) {
  const { name, email, phone, service, message } = await request.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      reply_to: email,
      subject: `New Enquiry: ${service || 'General'} — ${name}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Phone:   ${phone || 'Not provided'}`,
        `Service: ${service || 'Not specified'}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    })

    if (error) {
      return NextResponse.json({ error: 'Failed to send. Please call us directly.' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send. Please call us directly.' }, { status: 500 })
  }
}
