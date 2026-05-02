import { MailService } from '@sendgrid/mail';

let mailService: MailService | null = null;

function getMailService() {
  if (mailService) return mailService;

  if (!process.env.SENDGRID_API_KEY) {
    throw new Error("SENDGRID_API_KEY environment variable is not set. Please configure it in your Netlify environment variables.");
  }

  mailService = new MailService();
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
  return mailService;
}

interface ContactEmailParams {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function sendContactEmail(params: ContactEmailParams): Promise<void> {
  const mailService = getMailService();

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

    // Log the complete request object (excluding sensitive info if any, though here it's mostly form data)
    const request = {
      to: 'tanasa.sorin@gmail.com',
      from: 'tanasa.sorin@gmail.com',
      subject: `Contact Form: ${params.subject || 'New Message'} - from ${params.name}`,
      text: textContent,
      html: htmlContent,
      replyTo: params.email,
    };
    console.log('Sending contact email to receiver');

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
    console.log('Sending confirmation email to sender');

    await mailService.send(confirmationRequest);
  } catch (error: any) {
    console.error('SendGrid email error:', error);
    if (error.response) {
      console.error('SendGrid error body:', JSON.stringify(error.response.body, null, 2));
      const errorMessage = error.response.body.errors?.[0]?.message || "Failed to send email via SendGrid";
      throw new Error(errorMessage);
    }
    throw error;
  }
}