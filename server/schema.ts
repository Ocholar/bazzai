import { mysqlTable, serial, varchar, text, timestamp, int, json, date, decimal } from 'drizzle-orm/mysql-core';

export const leads = mysqlTable('leads', {
    id: serial('id').primaryKey(),
    customerName: varchar('customerName', { length: 255 }),
    phoneNumber: varchar('phoneNumber', { length: 20 }),
    status: varchar('status', { length: 50 }).default('new'),
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
    leadId: int('leadId'),
    status: varchar('status', { length: 50 }),
    responseCode: int('responseCode'),
    responseBody: text('responseBody'),
    errorMessage: text('errorMessage'),
    retryCount: int('retryCount').default(0),
    lastRetryAt: timestamp('lastRetryAt'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
});

export const config = mysqlTable('config', {
    id: serial('id').primaryKey(),
    key: varchar('key', { length: 100 }).unique(),
    value: json('value'),
    description: text('description'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
});

export const analytics = mysqlTable('analytics', {
    id: serial('id').primaryKey(),
    date: timestamp('date').notNull(),
    totalLeads: int('totalLeads').default(0),
    contactedLeads: int('contactedLeads').default(0),
    qualifiedLeads: int('qualifiedLeads').default(0),
    submittedLeads: int('submittedLeads').default(0),
    installedLeads: int('installedLeads').default(0),
    failedLeads: int('failedLeads').default(0),
    package15Count: int('package15Count').default(0),
    package30Count: int('package30Count').default(0),
    submissionSuccessRate: decimal('submissionSuccessRate', { precision: 5, scale: 2 }).default('0.00'),
    conversionRate: decimal('conversionRate', { precision: 5, scale: 2 }).default('0.00'),
    avgCommissionPerGA: decimal('avgCommissionPerGA', { precision: 10, scale: 2 }).default('0.00'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
});
