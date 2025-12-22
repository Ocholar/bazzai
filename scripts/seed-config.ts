import { eq } from "drizzle-orm";
import { getDb } from '../server/db';
import { config } from '../drizzle/schema';

const defaultConfig = [
  {
    key: "qualification_prompt",
    value: JSON.stringify({
      system: "You are a sales agent for Airtel Kenya 5G ODU working for Bazztech Networks.",
      instructions: [
        "Collect: Customer Name, Airtel Number, Alternative Number, Email, Installation Town, Delivery Location, Preferred Date/Time",
        "AGGRESSIVELY upsell the 30Mbps package (KES 2,999/month) over 15Mbps (KES 1,999/month)",
        "Emphasize: Speed (30Mbps = 4K streaming, video calls, gaming; 15Mbps = basic browsing), reliability, future-proofing",
        "Frame 15Mbps as 'basic' option for light users only",
        "Be conversational, friendly, but persistent",
        "Offer limited-time incentives for 30Mbps",
        "Use social proof: '90% of our business customers choose 30Mbps'"
      ]
    }),
    description: "LLM prompt for lead qualification (auto-updated by optimization agent)"
  },
  {
    key: "upsell_target_percentage",
    value: JSON.stringify(70),
    description: "Target percentage of 30Mbps package sales (target: 70%+)"
  },
  {
    key: "max_retry_attempts",
    value: JSON.stringify(3),
    description: "Maximum form submission retry attempts"
  },
  {
    key: "lead_gen_allocation",
    value: JSON.stringify({ high_value: 60, high_volume: 40 }),
    description: "Percentage allocation for lead tagging by source"
  },
  {
    key: "monthly_ga_target",
    value: JSON.stringify(400),
    description: "Monthly Gross Adds target (90-day goal: 400+)"
  },
  {
    key: "conversion_rate_target",
    value: JSON.stringify(20),
    description: "Target conversion rate from lead to installation (%)"
  },
  {
    key: "submission_success_rate_target",
    value: JSON.stringify(97),
    description: "Target form submission success rate (%)"
  },
  {
    key: "avg_commission_target",
    value: JSON.stringify(2500),
    description: "Target average commission per GA (KES)"
  }
];

async function seedConfig() {
  console.log('🌱 Seeding configuration database...');
  
  const db = await getDb();
  if (!db) {
    console.error('❌ Database not available. Please check DATABASE_URL environment variable.');
    process.exit(1);
  }

  try {
    for (const configItem of defaultConfig) {
      const existing = await db.select()
        .from(config)
        .where(eq(config.key, configItem.key))
        .limit(1);

      if (existing.length === 0) {
        await db.insert(config).values({
          key: configItem.key,
          value: configItem.value,
          description: configItem.description
        });
        console.log(`✅ Created config: ${configItem.key}`);
      } else {
        console.log(`⏭️  Config already exists: ${configItem.key}`);
      }
    }

    console.log('\n✅ Configuration seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding configuration:', error);
    process.exit(1);
  }
}

seedConfig();