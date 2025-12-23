import { mysqlTable, serial, varchar, text, timestamp, int, json, mysqlEnum } from 'drizzle-orm/mysql-core';

export const leads = mysqlTable('leads', {
    id: serial('id').primaryKey(),
    customerName: varchar('customerName', { length: 255 }),
    phone: varchar('phone', { length: 20 }),
    email: varchar('email', { length: 320 }),
    status: mysqlEnum('status', ['new', 'contacted', 'qualified', 'submitted', 'installed', 'failed']).default('new'),
    preferredPackage: varchar('preferredPackage', { length: 50 }),
    installationTown: text('installationTown'),
    deliveryLocation: text('deliveryLocation'),
    preferredDate: timestamp('preferredDate'),
    preferredTime: varchar('preferredTime', { length: 20 }),
    conversationHistory: json('conversationHistory'),
    lastTemplateSent: varchar('lastTemplateSent', { length: 255 }),
    lastTemplateSentAt: timestamp('lastTemplateSentAt'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
    source: varchar('source', { length: 255 }),
    tag: varchar('tag', { length: 255 }),
});

export const submissions = mysqlTable('submissions', {
    id: serial('id').primaryKey(),
    leadId: int('leadId'),
    status: mysqlEnum('status', ['pending', 'success', 'failed', 'retry']),
    submissionPayload: json('submissionPayload'),
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
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
});
