$backendUrl = 'https://bazz-ai-agentic-team-production-3203.up.railway.app'

Write-Host "=== BAZZ AI DATABASE DIAGNOSTIC ===" -ForegroundColor Cyan
Write-Host "Backend: $backendUrl" -ForegroundColor Gray
Write-Host ""

# Test 1: Direct API endpoint
Write-Host "1. Testing /api/trpc/leads.getAll endpoint..." -ForegroundColor Yellow
try {
    $rawResponse = Invoke-WebRequest -Uri "$backendUrl/api/trpc/leads.getAll?batch=1&input=%7B%7D" -Method Get -ContentType 'application/json' -Headers @{"Accept" = "application/json"}
    $data = $rawResponse.Content | ConvertFrom-Json
    
    if ($data -and $data[0]) {
        $leads = $data[0].result.data.json
        Write-Host "✓ API responded successfully" -ForegroundColor Green
        Write-Host "  Total leads: $($leads.Count)" -ForegroundColor Green
        if ($leads.Count -gt 0) {
            Write-Host "  First lead: $($leads[0].customerName)" -ForegroundColor Green
        }
    }
} catch {
    Write-Host "✗ API call failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Create test lead via backend
Write-Host "`n2. Creating test lead to verify write capability..." -ForegroundColor Yellow

$testLead = @{
    customerName = "Diagnostic Test $(Get-Date -Format 'HH:mm:ss')"
    phone = "254712$(Get-Random -Minimum 100000 -Maximum 999999)"
    email = "diag@test.com"
    source = "diagnostic"
    tag = "high_value"
    status = "new"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$backendUrl/api/leads/create" -Method Post -Body $testLead -ContentType 'application/json'
    if ($response.success) {
        Write-Host "✓ Lead created successfully" -ForegroundColor Green
        Write-Host "  ID: $($response.result.insertId)" -ForegroundColor Green
    } else {
        Write-Host "✗ Creation returned error: $($response.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Creation failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Check database connection
Write-Host "`n3. Checking database health..." -ForegroundColor Yellow
try {
    $healthResponse = Invoke-RestMethod -Uri "$backendUrl/api/trpc/analytics.getLatest" -Method Get
    Write-Host "✓ Database is connected and responding" -ForegroundColor Green
} catch {
    Write-Host "✗ Database check failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Open dashboard
Write-Host "`n4. Opening dashboard in browser..." -ForegroundColor Yellow
Start-Process 'https://bazztech.co.ke/leads'
Start-Sleep -Seconds 1
Write-Host "✓ Dashboard opened. Refresh the page if you don't see new data." -ForegroundColor Green

Write-Host "`n=== DIAGNOSTIC COMPLETE ===" -ForegroundColor Cyan