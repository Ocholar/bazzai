# BAZZ AI Project Cleanup Script
# This script safely removes redundant and unnecessary files
# Run this from the project root: .\cleanup-safe.ps1

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "BAZZ AI Project Cleanup Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Set error action preference
$ErrorActionPreference = "Continue"

# Track statistics
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
            $size = (Get-ChildItem $Path -Recurse -File | Measure-Object -Property Length -Sum).Sum
        } else {
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
            } else {
                $script:deletedFiles++
            }
            $script:spaceSaved += $size
            
        } catch {
            Write-Host "  ✗ Failed to delete: $_" -ForegroundColor Red
        }
        Write-Host ""
    } else {
        Write-Host "Skipping: $Description (not found)" -ForegroundColor DarkGray
        Write-Host ""
    }
}

Write-Host "Phase 1: Removing Large Files and Directories" -ForegroundColor Cyan
Write-Host "----------------------------------------------" -ForegroundColor Cyan
Write-Host ""

# Large files
Remove-ItemSafe -Path "c:\Antigravity\recovery_log.txt" -Description "Recovery log file (3.8 MB)"

# Python virtual environment (not needed for Node.js project)
Remove-ItemSafe -Path "c:\Antigravity\venv" -Description "Python virtual environment"

# Duplicate backend repository
Remove-ItemSafe -Path "c:\Antigravity\bazz-ai-backend" -Description "Duplicate backend repository"

# Build output (can be regenerated)
Remove-ItemSafe -Path "c:\Antigravity\dist" -Description "Build output directory"

Write-Host ""
Write-Host "Phase 2: Removing Empty and Placeholder Files" -ForegroundColor Cyan
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
Write-Host "Phase 3: Removing Temporary Files" -ForegroundColor Cyan
Write-Host "----------------------------------------------" -ForegroundColor Cyan
Write-Host ""

# Temporary files
Remove-ItemSafe -Path "c:\Antigravity\temp_fb_data.json" -Description "Temporary Facebook data"
Remove-ItemSafe -Path "c:\Antigravity\BACKEND_URL.txt" -Description "Backend URL text file"

Write-Host ""
Write-Host "Phase 4: Removing Questionable Directories (Optional)" -ForegroundColor Cyan
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
} else {
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
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Review PROJECT_CLEANUP_ANALYSIS.md for details" -ForegroundColor White
Write-Host "  2. Test your application: pnpm dev" -ForegroundColor White
Write-Host "  3. Consider running cleanup-reorganize.ps1 to organize files" -ForegroundColor White
Write-Host ""
