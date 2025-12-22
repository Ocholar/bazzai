ALTER TABLE conversations 
ADD COLUMN lastTemplateSent VARCHAR(255) NULL,
ADD COLUMN lastTemplateSentAt DATETIME NULL;
