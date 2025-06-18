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

    await mailService.send({
      to: 'tanasa.torin@gmail.com',
      from: 'tanasa.torin@gmail.com', // Using your email as sender (must be verified in SendGrid)
      subject: `Contact Form: ${params.subject || 'New Message'} - from ${params.name}`,
      text: textContent,
      html: htmlContent,
      replyTo: params.email, // This allows you to reply directly to the sender
    });

    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}