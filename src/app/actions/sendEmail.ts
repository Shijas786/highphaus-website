'use server'

import { Resend } from 'resend';

export async function sendEmail(formData: FormData) {
  const apiKey = process.env.RESEND_API_KEY;

  // Safe Diagnostic: Check if API key exists and log its prefix
  if (apiKey && apiKey !== 're_123456789') {
    console.log(`[DIAGNOSTIC] RESEND_API_KEY detected: ${apiKey.substring(0, 7)}...`);
  } else {
    console.warn('[DIAGNOSTIC] RESEND_API_KEY is missing or the placeholder is still in use.');
  }

  if (!apiKey || apiKey === 're_123456789') {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[MOCK_MODE] Simulating successful email dispatch for testing.');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { 
        success: true, 
        id: 'mock_id_for_dev',
        message: 'Developer Notice: This is a SIMULATED success for testing the UI. No real email was sent because your RESEND_API_KEY is missing in .env.local.'
      };
    }
    return { error: 'Inquiry service is currently in maintenance. Please contact highphaus@gmail.com directly.' };
  }

  const resend = new Resend(apiKey);
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const project = formData.get('project') as string;
  const budget = formData.get('budget') as string;

  if (!name || !email || !project) {
    return { error: 'Missing required fields' };
  }

  const fromAddress = 'Highphaus Contact Form <onboarding@resend.dev>';
  const toAddress = ['highphaus@gmail.com'];

  console.log(`[ATTEMPT] Sending email from ${fromAddress} to ${toAddress.join(', ')}`);

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      subject: `New Project Inquiry: ${name}`,
      replyTo: email,
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

    if (error) {
      console.error('[RESEND_ERROR]', error);
      // Specific hint for unverified domain sandbox error
      if (error.name === 'validation_error' || error.message.includes('verified')) {
        return { error: 'Delivery Restricted: Your Resend account must verify the recipient domain or use its registered email.' };
      }
      return { error: error.message };
    }

    console.log('[SUCCESS] Email sent successfully:', data?.id);
    return { success: true, id: data?.id };
  } catch (err: any) {
    console.error('[RUNTIME_ERROR] Integration failed:', err);
    return { error: 'System integration error. Our engineers have been notified.' };
  }
}
