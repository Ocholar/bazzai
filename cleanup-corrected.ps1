# BAZZ AI Project Cleanup Script - CORRECTED VERSION
# This script removes the OLD root files and keeps bazz-ai-backend as the working repo
# IMPORTANT: bazz-ai-backend is the WORKING repository
# Run this from c:\Antigravity: .\cleanup-corrected.ps1

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "BAZZ AI Project Cleanup - CORRECTED" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "ANALYSIS COMPLETE:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Working Repository: c:\Antigravity (ROOT)" -ForegroundColor Green
Write-Host "  - .env updated: Dec 12, 2025 (newer)" -ForegroundColor Green
Write-Host "  - .env.local: 1169 bytes (active config)" -ForegroundColor Green
Write-Host "  - n8n_workflows: 17 files (complete)" -ForegroundColor Green
Write-Host "  - Has n8n scripts in package.json" -ForegroundColor Green
Write-Host ""
Write-Host "Duplicate Repository: c:\Antigravity\bazz-ai-backend" -ForegroundColor Red
Write-Host "  - .env updated: Dec 9, 2025 (older)" -ForegroundColor Red
Write-Host "  - .env: 101 bytes (minimal)" -ForegroundColor Red
Write-Host "  - n8n_workflows: EMPTY (0 files)" -ForegroundColor Red
Write-Host "  - Missing n8n scripts" -ForegroundColor Red
Write-Host ""
Write-Host "CONCLUSION: ROOT is the working repository!" -ForegroundColor Green
Write-Host "bazz-ai-backend can be safely deleted." -ForegroundColor Yellow
Write-Host ""

$response = Read-Host "Do you want to proceed with cleanup? (y/N)"
if ($response -ne 'y' -and $response -ne 'Y') {
    Write-Host "Cleanup cancelled." -ForegroundColor Yellow
    exit
}

Write-Host ""

$ErrorActionPreference = "Continue"
$deletedFiles = 0
$deletedDirs = 0
$spaceSaved = 0

function Remove-ItemSafe {
    param(
        [string]$Path,
        [string]$Description
    )
    
    if (Test-Path $Path) {
        $item = Get-Item $Path
        $size = 0
        
        if ($item.PSIsContainer) {
            $size = (Get-ChildItem $Path -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
        }
        else {
            $size = $item.Length
        }
        
        $sizeMB = [math]::Round($size / 1MB, 2)
        
        Write-Host "Deleting: $Description" -ForegroundColor Yellow
        Write-Host "  Path: $Path" -ForegroundColor Gray
        Write-Host "  Size: $sizeMB MB" -ForegroundColor Gray
        
        try {
            Remove-Item -Path $Path -Recurse -Force -ErrorAction Stop
            Write-Host "  ✓ Deleted successfully" -ForegroundColor Green
            
            if ($item.PSIsContainer) {
                $script:deletedDirs++
            }
            else {
                $script:deletedFiles++
            }
            $script:spaceSaved += $size
            
        }
        catch {
            Write-Host "  ✗ Failed to delete: $_" -ForegroundColor Red
        }
        Write-Host ""
    }
    else {
        Write-Host "Skipping: $Description (not found)" -ForegroundColor DarkGray
        Write-Host ""
    }
}

Write-Host "Phase 1: Removing Duplicate Repository" -ForegroundColor Cyan
Write-Host "----------------------------------------------" -ForegroundColor Cyan
Write-Host ""

# Remove the duplicate bazz-ai-backend directory
Remove-ItemSafe -Path "c:\Antigravity\bazz-ai-backend" -Description "Duplicate bazz-ai-backend repository (OLD)"

Write-Host ""
Write-Host "Phase 2: Removing Large Files" -ForegroundColor Cyan
Write-Host "----------------------------------------------" -ForegroundColor Cyan
Write-Host ""

# Large files
Remove-ItemSafe -Path "c:\Antigravity\recovery_log.txt" -Description "Recovery log file (3.8 MB)"

# Python virtual environment (not needed for Node.js project)
Remove-ItemSafe -Path "c:\Antigravity\venv" -Description "Python virtual environment"

# Build output (can be regenerated)
Remove-ItemSafe -Path "c:\Antigravity\dist" -Description "Build output directory"

Write-Host ""
Write-Host "Phase 3: Removing Empty and Placeholder Files" -ForegroundColor Cyan
Write-Host "----------------------------------------------" -ForegroundColor Cyan
Write-Host ""

# Empty files
Remove-ItemSafe -Path "c:\Antigravity\.gitkeep" -Description "Empty .gitkeep file"
Remove-ItemSafe -Path "c:\Antigravity\assign" -Description "Empty assign file"
Remove-ItemSafe -Path "c:\Antigravity\fork" -Description "Empty fork file"
Remove-ItemSafe -Path "c:\Antigravity\quota-status" -Description "Empty quota-status file"
Remove-ItemSafe -Path "c:\Antigravity\status" -Description "Empty status file"
Remove-ItemSafe -Path "c:\Antigravity\workspace" -Description "Empty workspace file"

Write-Host ""
Write-Host "Phase 4: Removing Temporary Files" -ForegroundColor Cyan
Write-Host "----------------------------------------------" -ForegroundColor Cyan
Write-Host ""

# Temporary files
Remove-ItemSafe -Path "c:\Antigravity\temp_fb_data.json" -Description "Temporary Facebook data"
Remove-ItemSafe -Path "c:\Antigravity\BACKEND_URL.txt" -Description "Backend URL text file"

Write-Host ""
Write-Host "Phase 5: Removing Questionable Directories (Optional)" -ForegroundColor Cyan
Write-Host "----------------------------------------------" -ForegroundColor Cyan
Write-Host ""
Write-Host "The following directories may not be needed:" -ForegroundColor Yellow
Write-Host "  - bazztech-child/ (WordPress theme)" -ForegroundColor Yellow
Write-Host "  - bazztech-lead-optimization/ (WordPress site)" -ForegroundColor Yellow
Write-Host "  - frontend/ (single HTML file)" -ForegroundColor Yellow
Write-Host "  - backend/ (single credentials file)" -ForegroundColor Yellow
Write-Host ""

$response = Read-Host "Do you want to delete these directories? (y/N)"
if ($response -eq 'y' -or $response -eq 'Y') {
    Remove-ItemSafe -Path "c:\Antigravity\bazztech-child" -Description "WordPress theme directory"
    Remove-ItemSafe -Path "c:\Antigravity\bazztech-lead-optimization" -Description "WordPress optimization directory"
    Remove-ItemSafe -Path "c:\Antigravity\frontend" -Description "Frontend directory (single HTML)"
    Remove-ItemSafe -Path "c:\Antigravity\backend" -Description "Backend directory (single credentials file)"
}
else {
    Write-Host "Skipped optional deletions" -ForegroundColor DarkGray
    Write-Host ""
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Cleanup Complete!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Statistics:" -ForegroundColor Cyan
Write-Host "  Files deleted: $deletedFiles" -ForegroundColor White
Write-Host "  Directories deleted: $deletedDirs" -ForegroundColor White
Write-Host "  Space saved: $([math]::Round($spaceSaved / 1MB, 2)) MB" -ForegroundColor White
Write-Host ""
Write-Host "Working Repository: c:\Antigravity (ROOT)" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Test your application: pnpm dev" -ForegroundColor White
Write-Host "  2. Consider running cleanup-reorganize.ps1 to organize files" -ForegroundColor White
Write-Host "  3. Update any documentation that references bazz-ai-backend" -ForegroundColor White
Write-Host ""
