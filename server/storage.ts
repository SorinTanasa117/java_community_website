import { type User, type InsertUser, type ContactMessage, type InsertContactMessage } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

let contactMessages: ContactMessage[] = [];

export class InMemoryStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    return { ...insertUser, id: 1 };
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const message: ContactMessage = {
      ...insertMessage,
      id: contactMessages.length + 1,
      createdAt: new Date(),
      subject: insertMessage.subject || null,
    };
    contactMessages.push(message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return contactMessages;
  }
}

export const storage = new InMemoryStorage();
