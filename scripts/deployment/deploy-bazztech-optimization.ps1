# Bazztech Lead Optimization - PowerShell Deployment Script
# Run this from your WordPress root directory

Write-Host "🚀 Bazztech Lead Optimization Deployment Script" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$ThemeDir = "wp-content\themes\bazztech-child"
$BackupDir = "backups\bazztech-$(Get-Date -Format 'yyyyMMdd_HHmmss')"
$SourceDir = "c:\Antigravity\bazztech-child"

# Check if we're in WordPress root
if (-not (Test-Path "wp-config.php")) {
    Write-Host "❌ Error: Not in WordPress root directory" -ForegroundColor Red
    Write-Host "Please run this script from your WordPress installation root"
    exit 1
}

Write-Host "✓ WordPress root directory confirmed" -ForegroundColor Green
Write-Host ""

# Step 1: Create backup
Write-Host "📦 Step 1: Creating backup..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null

# Backup database using WP-CLI
Write-Host "  Backing up database..."
& wp db export "$BackupDir\database.sql" --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Database backed up" -ForegroundColor Green
} else {
    Write-Host "  ⚠ WP-CLI not found, manual database backup recommended" -ForegroundColor Yellow
}

# Backup current theme if exists
if (Test-Path $ThemeDir) {
    Write-Host "  Backing up existing child theme..."
    Copy-Item -Path $ThemeDir -Destination $BackupDir -Recurse
    Write-Host "  ✓ Theme backed up" -ForegroundColor Green
}

Write-Host "✓ Backup complete" -ForegroundColor Green
Write-Host "  Location: $BackupDir"
Write-Host ""

# Step 2: Copy theme files
Write-Host "📂 Step 2: Installing child theme..." -ForegroundColor Yellow
if (-not (Test-Path $SourceDir)) {
    Write-Host "❌ Error: Source directory $SourceDir not found" -ForegroundColor Red
    exit 1
}

# Remove old theme if exists
if (Test-Path $ThemeDir) {
    Write-Host "  Removing old child theme..."
    Remove-Item -Path $ThemeDir -Recurse -Force
}

# Copy new theme
Write-Host "  Copying theme files..."
Copy-Item -Path $SourceDir -Destination $ThemeDir -Recurse
Write-Host "✓ Theme files installed" -ForegroundColor Green
Write-Host ""

# Step 3: Activate theme
Write-Host "🎨 Step 3: Activating theme..." -ForegroundColor Yellow
& wp theme activate bazztech-child 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Theme activated" -ForegroundColor Green
} else {
    Write-Host "⚠ Please activate theme manually in WordPress admin" -ForegroundColor Yellow
}
Write-Host ""

# Step 4: Clear caches
Write-Host "🧹 Step 4: Clearing caches..." -ForegroundColor Yellow
& wp cache flush 2>$null
if (Test-Path "wp-content\cache") {
    Remove-Item -Path "wp-content\cache\*" -Recurse -Force
}
Write-Host "✓ Caches cleared" -ForegroundColor Green
Write-Host ""

# Step 5: Display completion
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "🎉 Deployment Complete!" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Go to Settings > Lead Optimization in WordPress admin"
Write-Host "2. Configure WhatsApp webhook URL"
Write-Host "3. Set email notification address"
Write-Host "4. Add data-service-type attributes to service cards"
Write-Host "5. Add data-section attributes for analytics"
Write-Host "6. Insert shortcodes: [bazztech_badges], [bazztech_coverage]"
Write-Host "7. Test form submission in incognito mode"
Write-Host ""
Write-Host "📊 Monitor deployment:" -ForegroundColor Yellow
Write-Host "- Settings > Lead Optimization for statistics"
Write-Host "- Tools > Bazztech Leads to view submissions"
Write-Host ""
Write-Host "🔄 Rollback command if needed:" -ForegroundColor Yellow
Write-Host "wp theme activate bazztech && wp db import $BackupDir\database.sql"
Write-Host ""
