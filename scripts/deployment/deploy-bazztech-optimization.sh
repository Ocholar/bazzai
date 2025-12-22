#!/bin/bash

# Bazztech Lead Optimization - Deployment Script
# Run this script from your WordPress root directory

echo "🚀 Bazztech Lead Optimization Deployment Script"
echo "=============================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
THEME_DIR="wp-content/themes/bazztech-child"
BACKUP_DIR="backups/bazztech-$(date +%Y%m%d_%H%M%S)"

# Check if we're in WordPress root
if [ ! -f "wp-config.php" ]; then
    echo -e "${RED}Error: Not in WordPress root directory${NC}"
    echo "Please run this script from your WordPress installation root"
    exit 1
fi

echo "✓ WordPress root directory confirmed"
echo ""

# Step 1: Create backup
echo "📦 Step 1: Creating backup..."
mkdir -p "$BACKUP_DIR"

# Backup database
echo "  Backing up database..."
wp db export "$BACKUP_DIR/database.sql" --quiet
if [ $? -eq 0 ]; then
    echo -e "  ${GREEN}✓${NC} Database backed up"
else
    echo -e "  ${RED}✗${NC} Database backup failed"
    exit 1
fi

# Backup current theme if exists
if [ -d "wp-content/themes/bazztech-child" ]; then
    echo "  Backing up existing child theme..."
    cp -r wp-content/themes/bazztech-child "$BACKUP_DIR/"
    echo -e "  ${GREEN}✓${NC} Theme backed up"
fi

echo -e "${GREEN}✓ Backup complete${NC}"
echo "  Location: $BACKUP_DIR"
echo ""

# Step 2: Copy theme files
echo "📂 Step 2: Installing child theme..."
if [ ! -d "c:/Antigravity/bazztech-child" ]; then
    echo -e "${RED}Error: Source directory c:/Antigravity/bazztech-child not found${NC}"
    exit 1
fi

# Remove old theme if exists
if [ -d "$THEME_DIR" ]; then
    echo "  Removing old child theme..."
    rm -rf "$THEME_DIR"
fi

# Copy new theme
echo "  Copying theme files..."
cp -r c:/Antigravity/bazztech-child "$THEME_DIR"
echo -e "${GREEN}✓ Theme files installed${NC}"
echo ""

# Step 3: Set permissions
echo "🔐 Step 3: Setting permissions..."
find "$THEME_DIR" -type f -exec chmod 644 {} \;
find "$THEME_DIR" -type d -exec chmod 755 {} \;
echo -e "${GREEN}✓ Permissions set${NC}"
echo ""

# Step 4: Activate theme
echo "🎨 Step 4: Activating theme..."
wp theme activate bazztech-child
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Theme activated${NC}"
else
    echo -e "${RED}✗ Theme activation failed${NC}"
    echo "  Please activate manually in WordPress admin"
fi
echo ""

# Step 5: Create database tables
echo "💾 Step 5: Creating database tables..."
wp eval-file "$THEME_DIR/includes/create-tables.php"
echo -e "${GREEN}✓ Database tables created${NC}"
echo ""

# Step 6: Clear caches
echo "🧹 Step 6: Clearing caches..."
wp cache flush
if [ -d "wp-content/cache" ]; then
    rm -rf wp-content/cache/*
fi
echo -e "${GREEN}✓ Caches cleared${NC}"
echo ""

# Step 7: Verification
echo "✅ Step 7: Verifying installation..."

# Check theme is active
ACTIVE_THEME=$(wp theme list --status=active --field=name --quiet)
if [ "$ACTIVE_THEME" = "bazztech-child" ]; then
    echo -e "  ${GREEN}✓${NC} Theme is active"
else
    echo -e "  ${YELLOW}⚠${NC} Theme may not be active"
fi

# Check database tables
LEADS_TABLE=$(wp db query "SHOW TABLES LIKE 'wp_leads'" --skip-column-names --quiet)
if [ ! -z "$LEADS_TABLE" ]; then
    echo -e "  ${GREEN}✓${NC} Leads table exists"
else
    echo -e "  ${YELLOW}⚠${NC} Leads table not found"
fi

COVERAGE_TABLE=$(wp db query "SHOW TABLES LIKE 'wp_coverage_queries'" --skip-column-names --quiet)
if [ ! -z "$COVERAGE_TABLE" ]; then
    echo -e "  ${GREEN}✓${NC} Coverage table exists"
else
    echo -e "  ${YELLOW}⚠${NC} Coverage table not found"
fi

echo ""
echo "=============================================="
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo "=============================================="
echo ""
echo "📋 Next Steps:"
echo "1. Go to Settings > Lead Optimization in WordPress admin"
echo "2. Configure WhatsApp webhook URL"
echo "3. Set email notification address"
echo "4. Add data-service-type attributes to service cards"
echo "5. Add data-section attributes for analytics"
echo "6. Insert shortcodes: [bazztech_badges], [bazztech_coverage]"
echo "7. Test form submission in incognito mode"
echo ""
echo "📊 Monitor deployment:"
echo "- Check Settings > Lead Optimization for statistics"
echo "- View leads at Tools > Bazztech Leads"
echo "- Test all features on staging first!"
echo ""
echo "🔄 Rollback if needed:"
echo "wp theme activate bazztech && wp db import $BACKUP_DIR/database.sql"
echo ""
