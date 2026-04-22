'use server'

import nodemailer from 'nodemailer';

export async function sendEmail(formData: FormData) {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  // Use highphaus@gmail.com as the default recipient
  const targetEmail = process.env.CONTACT_RECEIVER_EMAIL || 'highphaus@gmail.com';

  if (!emailUser || !emailPass) {
    console.warn('[NODEMAILER] Missing EMAIL_USER or EMAIL_PASS in environment variables.');
    return { error: 'Email service is not configured. Please contact highphaus@gmail.com directly.' };
  }

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const project = formData.get('project') as string;
  const budget = formData.get('budget') as string;

  if (!name || !email || !project) {
    return { error: 'Missing required fields' };
  }

  // Create transporter using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${emailUser}>`,
      to: targetEmail,
      replyTo: email,
      subject: `New Project Inquiry: ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
          <h2 style="color: #4A0F1C; border-bottom: 2px solid #4A0F1C; padding-bottom: 10px;">New Project Inquiry</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Budget Range:</strong> ${budget || 'Not specified'}</p>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="margin-top: 0;"><strong>Project Description:</strong></p>
            <p>${project}</p>
          </div>
          <p style="margin-top: 30px; font-size: 11px; color: #888; border-top: 1px solid #eee; padding-top: 10px;">
            This lead was captured via Highphaus.com
          </p>
        </div>
      `,
    });

    console.log('[SUCCESS] Email sent successfully to', targetEmail);
    return { success: true, message: 'Your message has been sent successfully. We will get back to you soon.' };
  } catch (err: any) {
    console.error('[RUNTIME_ERROR] Nodemailer failed:', err);
    return { error: 'Failed to send email. Please ensure your Gmail App Password is correct.' };
  }
}
