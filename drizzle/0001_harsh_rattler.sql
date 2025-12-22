CREATE TABLE `analytics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` timestamp NOT NULL,
	`totalLeads` int DEFAULT 0,
	`contactedLeads` int DEFAULT 0,
	`qualifiedLeads` int DEFAULT 0,
	`submittedLeads` int DEFAULT 0,
	`installedLeads` int DEFAULT 0,
	`failedLeads` int DEFAULT 0,
	`package15Count` int DEFAULT 0,
	`package30Count` int DEFAULT 0,
	`submissionSuccessRate` decimal(5,2) DEFAULT '0',
	`conversionRate` decimal(5,2) DEFAULT '0',
	`avgCommissionPerGA` decimal(10,2) DEFAULT '0',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `analytics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `config` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(100) NOT NULL,
	`value` json,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `config_id` PRIMARY KEY(`id`),
	CONSTRAINT `config_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customerName` text,
	`phone` varchar(20) NOT NULL,
	`email` varchar(320),
	`source` varchar(50) NOT NULL,
	`tag` enum('high_value','high_volume') NOT NULL,
	`status` enum('new','contacted','qualified','submitted','installed','failed') NOT NULL DEFAULT 'new',
	`preferredPackage` enum('15mbps','30mbps','unspecified') DEFAULT 'unspecified',
	`installationTown` text,
	`deliveryLocation` text,
	`preferredDate` timestamp,
	`preferredTime` varchar(20),
	`conversationHistory` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`leadId` int NOT NULL,
	`status` enum('pending','success','failed','retry') NOT NULL DEFAULT 'pending',
	`submissionPayload` json,
	`responseCode` int,
	`responseBody` text,
	`errorMessage` text,
	`retryCount` int DEFAULT 0,
	`lastRetryAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `submissions_id` PRIMARY KEY(`id`)
);
