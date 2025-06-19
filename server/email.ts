import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

interface ContactEmailParams {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function sendContactEmail(params: ContactEmailParams): Promise<boolean> {
  try {
    // Verify SendGrid API Key
    try {
      await mailService.send({
        to: 'test@example.com', // Replace with a test email address
        from: 'tanasa.sorin@gmail.com',
        subject: 'Test Email from Contact Form',
        text: 'This is a test email to verify the SendGrid API key.',
        html: '<p>This is a test email to verify the SendGrid API key.</p>',
      });
      console.log('SendGrid API key verified successfully.');
    } catch (error: any) {
      console.error('SendGrid API key verification failed:', error);
      throw new Error('Failed to verify SendGrid API key. Please check your API key and try again.');
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #6366f1; border-bottom: 2px solid #e0f2fe; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #374151;">Contact Details</h3>
          <p><strong>Name:</strong> ${params.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${params.email}">${params.email}</a></p>
          ${params.subject ? `<p><strong>Subject:</strong> ${params.subject}</p>` : ''}
        </div>
        
        <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #374151;">Message</h3>
          <p style="line-height: 1.6; white-space: pre-wrap;">${params.message}</p>
        </div>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
          <p>This message was sent from your website contact form at ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    const textContent = `
New Contact Form Submission

Name: ${params.name}
Email: ${params.email}
${params.subject ? `Subject: ${params.subject}` : ''}

Message:
${params.message}

---
Sent from your website contact form at ${new Date().toLocaleString()}
    `;

    // Log SendGrid API Key
    console.log('SendGrid API Key:', process.env.SENDGRID_API_KEY);

    // Log the complete request object
    const request = {
      to: 'tanasa.sorin@gmail.com',
      from: 'tanasa.sorin@gmail.com',
      subject: `Contact Form: ${params.subject || 'New Message'} - from ${params.name}`,
      text: textContent,
      html: htmlContent,
      replyTo: params.email,
    };
    console.log('SendGrid Request:', JSON.stringify(request, null, 2));

    // Send email to the receiver
    await mailService.send(request);

    // Send confirmation email to the sender
    const confirmationHtmlContent = `
      <p>Thank you for contacting me! I have received your message and will get back to you within 24 hours.</p>
      <p>Here is a copy of your message:</p>
      ${htmlContent}
    `;

    const confirmationTextContent = `
      Thank you for contacting me! I have received your message and will get back to you within 24 hours.

      Here is a copy of your message:
      ${textContent}
    `;

    // Log the complete request object
    const confirmationRequest = {
      to: params.email,
      from: 'tanasa.sorin@gmail.com',
      subject: `Confirmation: Contact Form Submission - ${params.subject || 'New Message'}`,
      text: confirmationTextContent,
      html: confirmationHtmlContent,
    };
    console.log('SendGrid Confirmation Request:', JSON.stringify(confirmationRequest, null, 2));

    await mailService.send(confirmationRequest);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    console.error('SendGrid email error:', JSON.stringify(error));
    return false;
  }
}