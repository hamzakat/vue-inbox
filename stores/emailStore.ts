// i want to make a Pinia store for the emails. the email can be marked as read and can be archived. the emails are stored in the "data/db.json". each email object in the jjson file contains a title and body.

import { defineStore } from "pinia";
import db from "../data/db.json";

interface Email {
  id: number;
  title: string;
  body: string;
  read: boolean;
  archived: boolean;
}

interface EmailStoreState {
  emails: Email[];
}

export const useEmailStore = defineStore({
  id: "email",
  state: (): EmailStoreState => ({
    emails: db.emails,
  }),
  actions: {
    async fetchEmails() {
      try {
        const response = await fetch("data/db.json");
        const data = await response.json();
        this.emails = data.emails;
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    },
    markAsRead(emailId: number): void {
      const email = this.emails.find((email) => email.id === emailId);
      if (email) {
        email.read = true;
      }
    },
    archiveEmail(emailId: number): void {
      const email = this.emails.find((email) => email.id === emailId);
      if (email) {
        email.archived = true;
      }
    },
    unarchiveEmail(emailId: number): void {
      const email = this.emails.find((email) => email.id === emailId);
      if (email) {
        email.archived = false;
      }
    },
  },
  getters: {
    archivedEmails: (state) => state.emails.filter((email) => email.archived),
    inboxEmails: (state) => state.emails.filter((email) => !email.archived),
    markedAsReadEmails: (state) => state.emails.filter((email) => email.read),
  },
});
