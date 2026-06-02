import type { Express } from "express";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";

export function registerRoutes(app: Express): void {
  app.post("/api/contact", async (req, res) => {
    try {
      const parsed = insertContactMessageSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ success: false, message: "Invalid form data." });
      }
      const message = await storage.createContactMessage(parsed.data);
      res.json({ success: true, message: "Message received!", id: message.id });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to submit message." });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to retrieve messages." });
    }
  });

  app.get("/admin/messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Contact Messages - Admin</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
            .container { max-width: 1200px; margin: 0 auto; }
            h1 { color: #333; text-align: center; }
            .message { background: white; margin: 15px 0; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .message-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .name { font-weight: bold; color: #6366f1; }
            .email { color: #666; }
            .date { color: #999; font-size: 0.9em; }
            .subject { background: #e0f2fe; padding: 5px 10px; border-radius: 4px; margin: 10px 0; }
            .message-content { line-height: 1.6; }
            .no-messages { text-align: center; color: #666; font-style: italic; }
            .stats { background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Contact Messages Dashboard</h1>
            <div class="stats">
              <strong>Total Messages: ${messages.length}</strong>
            </div>
            ${messages.length === 0
              ? '<div class="no-messages">No messages yet</div>'
              : messages.map(msg => `
                <div class="message">
                  <div class="message-header">
                    <div>
                      <span class="name">${msg.name}</span>
                      <span class="email">(${msg.email})</span>
                    </div>
                    <div class="date">${new Date(msg.createdAt).toLocaleString()}</div>
                  </div>
                  ${msg.subject ? `<div class="subject"><strong>Subject:</strong> ${msg.subject}</div>` : ''}
                  <div class="message-content">${msg.message}</div>
                </div>
              `).join('')
            }
          </div>
        </body>
        </html>
      `;

      res.send(html);
    } catch (error) {
      res.status(500).send(`<h1>Error</h1><p>Failed to load messages: ${(error as Error).message}</p>`);
    }
  });
}
