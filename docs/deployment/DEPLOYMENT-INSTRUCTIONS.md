# 🚀 BAZZTECH LEAD OPTIMIZATION - DEPLOYMENT INSTRUCTIONS

## AUTOMATED DEPLOYMENT (RECOMMENDED)

### Option 1: Linux/Mac (Bash)
```bash
cd /path/to/wordpress
bash c:/Antigravity/deploy-bazztech-optimization.sh
```

### Option 2: Windows (PowerShell)
```powershell
cd C:\path\to\wordpress
powershell -ExecutionPolicy Bypass -File c:\Antigravity\deploy-bazztech-optimization.ps1
```

---

## MANUAL DEPLOYMENT

### Prerequisites
- ✅ WordPress 5.8+
- ✅ PHP 7.4+
- ✅ Active parent theme: "Bazztech"
- ✅ WP-CLI installed (optional but recommended)
- ✅ FTP/SFTP access OR file manager access
- ✅ Database access

### Step 1: Backup (CRITICAL)
```bash
# Database backup
wp db export backup-$(date +%Y%m%d).sql

# Or via phpMyAdmin: Export > SQL > Go

# File backup
cp -r wp-content/themes/bazztech-child wp-content/themes/bazztech-child.backup
```

### Step 2: Upload Child Theme

#### Via FTP/SFTP:
1. Connect to your server
2. Navigate to `wp-content/themes/`
3. Upload `bazztech-child` folder from `c:\Antigravity\`
4. Verify all files uploaded successfully

#### Via cPanel File Manager:
1. Compress `c:\Antigravity\bazztech-child` to ZIP
2. Log in to cPanel
3. File Manager > `wp-content/themes/`
4. Upload ZIP file
5. Extract archive
6. Delete ZIP file

#### Via WP-CLI:
```bash
cd /path/to/wordpress
cp -r c:/Antigravity/bazztech-child wp-content/themes/
```

### Step 3: Set File Permissions
```bash
# Linux/Mac
find wp-content/themes/bazztech-child -type f -exec chmod 644 {} \;
find wp-content/themes/bazztech-child -type d -exec chmod 755 {} \;

# Or via FTP: Set folders to 755, files to 644
```

### Step 4: Activate Theme
```bash
# Via WP-CLI
wp theme activate bazztech-child

# Or manually:
# WordPress Admin > Appearance > Themes > Activate "Bazztech Child"
```

### Step 5: Verify Database Tables
Go to phpMyAdmin and verify these tables exist:
- `wp_leads`
- `wp_coverage_queries`

If missing, run this SQL:
```sql
CREATE TABLE IF NOT EXISTS wp_leads (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    full_name varchar(255) NOT NULL,
    airtel_number varchar(20) NOT NULL,
    alt_number varchar(20),
    email varchar(255),
    town varchar(255) NOT NULL,
    landmark text,
    preferred_date date,
    preferred_time varchar(20),
    service_type varchar(100),
    submission_date datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY submission_date (submission_date)
);

CREATE TABLE IF NOT EXISTS wp_coverage_queries (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    location varchar(255) NOT NULL,
    query_date datetime DEFAULT CURRENT_TIMESTAMP,
    ip_address varchar(50),
    PRIMARY KEY (id),
    KEY query_date (query_date)
);
```

### Step 6: Configure Settings
1. Go to **Settings > Lead Optimization**
2. Add WhatsApp webhook URL (get from your WhatsApp Business API provider)
3. Add email: `your-sales-email@bazztech.co.ke`
4. Click **Save Changes**

### Step 7: Update Page Content

#### Add Service Type Attributes
Edit your homepage/pricing page and add these attributes to service cards:

**Find this in your page editor:**
```html
<div class="service-card">
    <h3>5G ODU Antenna</h3>
    ...
</div>
```

**Change to:**
```html
<div class="service-card" data-service-type="5g-odu">
    <h3>5G ODU Antenna</h3>
    ...
</div>
```

**All four services:**
- `data-service-type="5g-odu"`
- `data-service-type="5g-iplu"`
- `data-service-type="fttx-fiber"`
- `data-service-type="smartnet"`

#### Add Section Tracking Attributes
```html
<section data-section="hero">
    <!-- Your hero content -->
</section>

<section data-section="pricing">
    <!-- Your pricing/services content -->
</section>

<section data-section="testimonials">
    <!-- Your testimonials -->
</section>

<section data-section="contact">
    <!-- Your contact form -->
</section>
```

#### Insert Shortcodes

**Authority Badges** (below hero):
