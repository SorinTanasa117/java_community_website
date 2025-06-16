import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      
      // In a real application, you would send an email here
      console.log("New contact message received:", message);
      
      res.json({ 
        success: true, 
        message: "Thank you for your message! I'll get back to you within 24 hours." 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Please check your form data and try again.",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Something went wrong. Please try again later." 
        });
      }
    }
  });

  // Get contact messages (for admin purposes if needed)
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve messages." 
      });
    }
  });

  // Admin page to view contact messages
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
      res.status(500).send(`<h1>Error</h1><p>Failed to load messages: ${error.message}</p>`);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
