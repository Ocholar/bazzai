# BAZZ AI Project Reorganization Script
$ErrorActionPreference = "Continue"

function Move-ItemSafe {
    param(
        [string]$Source,
        [string]$Destination,
        [string]$Description
    )
    
    if (Test-Path $Source) {
        Write-Host "Moving: $Description"
        
        $destDir = Split-Path -Parent $Destination
        if (-not (Test-Path $destDir)) {
            New-Item -ItemType Directory -Force -Path $destDir | Out-Null
        }
        
        Move-Item -Path $Source -Destination $Destination -Force -ErrorAction SilentlyContinue
        Write-Host "  Done"
    }
}

Write-Host "Starting Reorganization..."

# Create directories
$directories = @(
    "c:\Antigravity\scripts\tests",
    "c:\Antigravity\scripts\deployment",
    "c:\Antigravity\scripts\database",
    "c:\Antigravity\docs\deployment",
    "c:\Antigravity\docs\setup",
    "c:\Antigravity\docs\integrations",
    "c:\Antigravity\docs\legal",
    "c:\Antigravity\docs\cleanup"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }
}

# Move test files
Move-ItemSafe "c:\Antigravity\complete-test-suite.js" "c:\Antigravity\scripts\tests\complete-test-suite.js" "Complete test suite"
Move-ItemSafe "c:\Antigravity\create-test-lead.js" "c:\Antigravity\scripts\tests\create-test-lead.js" "Create test lead script"
Move-ItemSafe "c:\Antigravity\quick-test.js" "c:\Antigravity\scripts\tests\quick-test.js" "Quick test script"
Move-ItemSafe "c:\Antigravity\test-whatsapp-flow.js" "c:\Antigravity\scripts\tests\test-whatsapp-flow.js" "WhatsApp flow test"
Move-ItemSafe "c:\Antigravity\verify-whatsapp-data.js" "c:\Antigravity\scripts\tests\verify-whatsapp-data.js" "WhatsApp data verification"
Move-ItemSafe "c:\Antigravity\monitor-whatsapp.js" "c:\Antigravity\scripts\tests\monitor-whatsapp.js" "WhatsApp monitor"

# Move database scripts
Move-ItemSafe "c:\Antigravity\test-db-connection.js" "c:\Antigravity\scripts\database\test-db-connection.js" "DB connection test (JS)"
Move-ItemSafe "c:\Antigravity\test-db-connection.ts" "c:\Antigravity\scripts\database\test-db-connection.ts" "DB connection test (TS)"
Move-ItemSafe "c:\Antigravity\db-connection-fix.js" "c:\Antigravity\scripts\database\db-connection-fix.js" "DB connection fix"
Move-ItemSafe "c:\Antigravity\check-database.ps1" "c:\Antigravity\scripts\database\check-database.ps1" "Database check script"
Move-ItemSafe "c:\Antigravity\test-data-connection.ps1" "c:\Antigravity\scripts\database\test-data-connection.ps1" "Data connection test"

# Move deployment scripts
Move-ItemSafe "c:\Antigravity\deploy-bazztech-optimization.ps1" "c:\Antigravity\scripts\deployment\deploy-bazztech-optimization.ps1" "Deployment script (PowerShell)"
Move-ItemSafe "c:\Antigravity\deploy-bazztech-optimization.sh" "c:\Antigravity\scripts\deployment\deploy-bazztech-optimization.sh" "Deployment script (Bash)"
Move-ItemSafe "c:\Antigravity\commands.ps1" "c:\Antigravity\scripts\deployment\commands.ps1" "Deployment commands"

# Move deployment documentation
Move-ItemSafe "c:\Antigravity\DEPLOYMENT-INSTRUCTIONS.md" "c:\Antigravity\docs\deployment\DEPLOYMENT-INSTRUCTIONS.md" "Deployment instructions"
Move-ItemSafe "c:\Antigravity\DEPLOYMENT_README.md" "c:\Antigravity\docs\deployment\DEPLOYMENT_README.md" "Deployment README"
Move-ItemSafe "c:\Antigravity\DEPLOYMENT_READY.md" "c:\Antigravity\docs\deployment\DEPLOYMENT_READY.md" "Deployment ready doc"
Move-ItemSafe "c:\Antigravity\FINAL_DEPLOYMENT_HANDOFF.md" "c:\Antigravity\docs\deployment\FINAL_DEPLOYMENT_HANDOFF.md" "Final deployment handoff"
Move-ItemSafe "c:\Antigravity\GITHUB_PAGES_RAILWAY_DEPLOYMENT.md" "c:\Antigravity\docs\deployment\GITHUB_PAGES_RAILWAY_DEPLOYMENT.md" "GitHub Pages Railway deployment"
Move-ItemSafe "c:\Antigravity\RAILWAY_DEPLOYMENT.md" "c:\Antigravity\docs\deployment\RAILWAY_DEPLOYMENT.md" "Railway deployment"
Move-ItemSafe "c:\Antigravity\RAILWAY_VARS.md" "c:\Antigravity\docs\deployment\RAILWAY_VARS.md" "Railway variables"

# Move setup documentation
Move-ItemSafe "c:\Antigravity\SETUP_GUIDE.md" "c:\Antigravity\docs\setup\SETUP_GUIDE.md" "Setup guide"
Move-ItemSafe "c:\Antigravity\IMPLEMENTATION-GUIDE.md" "c:\Antigravity\docs\setup\IMPLEMENTATION-GUIDE.md" "Implementation guide"
Move-ItemSafe "c:\Antigravity\TESTING_GUIDE.md" "c:\Antigravity\docs\setup\TESTING_GUIDE.md" "Testing guide"
Move-ItemSafe "c:\Antigravity\MONITORING_CHECKLIST.md" "c:\Antigravity\docs\setup\MONITORING_CHECKLIST.md" "Monitoring checklist"

# Move integration documentation
Move-ItemSafe "c:\Antigravity\N8N_CONFIG.md" "c:\Antigravity\docs\integrations\N8N_CONFIG.md" "n8n config"
Move-ItemSafe "c:\Antigravity\N8N_SETUP_GUIDE.md" "c:\Antigravity\docs\integrations\N8N_SETUP_GUIDE.md" "n8n setup guide"
Move-ItemSafe "c:\Antigravity\WEBHOOK_SETUP_GUIDE.md" "c:\Antigravity\docs\integrations\WEBHOOK_SETUP_GUIDE.md" "Webhook setup guide"
Move-ItemSafe "c:\Antigravity\RESUME_WHATSAPP_SETUP.md" "c:\Antigravity\docs\integrations\RESUME_WHATSAPP_SETUP.md" "WhatsApp setup"
Move-ItemSafe "c:\Antigravity\QUICK_START_SOCIAL_INTEGRATION.md" "c:\Antigravity\docs\integrations\QUICK_START_SOCIAL_INTEGRATION.md" "Quick start social integration"
Move-ItemSafe "c:\Antigravity\SOCIAL_MEDIA_INTEGRATION_GUIDE.md" "c:\Antigravity\docs\integrations\SOCIAL_MEDIA_INTEGRATION_GUIDE.md" "Social media integration guide"
Move-ItemSafe "c:\Antigravity\SOCIAL_MEDIA_PREWRITTEN_SETUP.md" "c:\Antigravity\docs\integrations\SOCIAL_MEDIA_PREWRITTEN_SETUP.md" "Social media prewritten setup"
Move-ItemSafe "c:\Antigravity\GEMINI_SOCIAL_MEDIA_SETUP.md" "c:\Antigravity\docs\integrations\GEMINI_SOCIAL_MEDIA_SETUP.md" "Gemini social media setup"
Move-ItemSafe "c:\Antigravity\LANDING_PAGE_ENHANCEMENTS.md" "c:\Antigravity\docs\integrations\LANDING_PAGE_ENHANCEMENTS.md" "Landing page enhancements"

# Move legal documentation
Move-ItemSafe "c:\Antigravity\privacy-policy.md" "c:\Antigravity\docs\legal\privacy-policy.md" "Privacy Policy"
Move-ItemSafe "c:\Antigravity\terms-of-service.md" "c:\Antigravity\docs\legal\terms-of-service.md" "Terms of Service"
Move-ItemSafe "c:\Antigravity\user-data-deletion-policy.md" "c:\Antigravity\docs\legal\user-data-deletion-policy.md" "User Data Deletion Policy"

# Move cleanup documentation
Move-ItemSafe "c:\Antigravity\CLEANUP_SUMMARY.md" "c:\Antigravity\docs\cleanup\CLEANUP_SUMMARY.md" "Cleanup summary"
Move-ItemSafe "c:\Antigravity\PROJECT_CLEANUP_ANALYSIS.md" "c:\Antigravity\docs\cleanup\PROJECT_CLEANUP_ANALYSIS.md" "Cleanup analysis"
Move-ItemSafe "c:\Antigravity\WORKING_REPO_CONFIRMED.md" "c:\Antigravity\docs\cleanup\WORKING_REPO_CONFIRMED.md" "Working repo confirmation"

# Move other documentation
Move-ItemSafe "c:\Antigravity\HANDOFF_DOCUMENT.md" "c:\Antigravity\docs\HANDOFF_DOCUMENT.md" "Handoff document"
Move-ItemSafe "c:\Antigravity\SYSTEM_STATUS_REPORT.md" "c:\Antigravity\docs\SYSTEM_STATUS_REPORT.md" "System status report"
Move-ItemSafe "c:\Antigravity\API_REFERENCE.md" "c:\Antigravity\docs\API_REFERENCE.md" "API reference"
Move-ItemSafe "c:\Antigravity\README_BACKEND.md" "c:\Antigravity\docs\README_BACKEND.md" "Backend README"
Move-ItemSafe "c:\Antigravity\todo.md" "c:\Antigravity\docs\todo.md" "Todo list"

# Rename n8n_workflows
if (Test-Path "c:\Antigravity\n8n_workflows") {
    Move-Item -Path "c:\Antigravity\n8n_workflows" -Destination "c:\Antigravity\workflows" -Force
    Write-Host "Renamed n8n_workflows to workflows"
}

Write-Host "Reorganization Complete!"
