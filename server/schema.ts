import { mysqlTable, serial, varchar, text, timestamp, int, json, date, mysqlEnum } from 'drizzle-orm/mysql-core';

export const leads = mysqlTable('leads', {
    id: serial('id').primaryKey(),
    customerName: varchar('customerName', { length: 255 }),
    phoneNumber: varchar('phoneNumber', { length: 20 }),
    status: varchar('status', { length: 50 }).default('new'), // or enum if we knew values
    preferredPackage: varchar('preferredPackage', { length: 50 }),
    source: varchar('source', { length: 100 }),
    tag: varchar('tag', { length: 50 }),
    conversationHistory: json('conversationHistory'),
    lastTemplateSent: varchar('lastTemplateSent', { length: 255 }),
    lastTemplateSentAt: date('lastTemplateSentAt'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
});

export const submissions = mysqlTable('submissions', {
    id: serial('id').primaryKey(),
    leadId: int('leadId'), // Assuming relationship
    status: varchar('status', { length: 50 }),
    responseCode: int('responseCode'),
    responseBody: text('responseBody'),
    errorMessage: text('errorMessage'),
    retryCount: int('retryCount').default(0),
    lastRetryAt: timestamp('lastRetryAt'),
    createdAt: timestamp('createdAt').defaultNow(),
});
