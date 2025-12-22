# Test backend connectivity and seed sample data
$backendUrl = 'https://bazz-ai-agentic-team-production-3203.up.railway.app'

# Test 1: Create sample leads
Write-Host "Creating sample leads..." -ForegroundColor Cyan

$leads = @(
    @{
        customerName = "John Mwangi"
        phone = "254712345001"
        email = "john@example.com"
        source = "linkedin"
        tag = "high_value"
        status = "qualified"
        preferredPackage = "30Mbps"
        installationTown = "Nairobi"
    },
    @{
        customerName = "Jane Wanjiku"
        phone = "254723456002"
        email = "jane@example.com"
        source = "whatsapp"
        tag = "high_volume"
        status = "new"
        preferredPackage = "15Mbps"
        installationTown = "Mombasa"
    },
    @{
        customerName = "Peter Omondi"
        phone = "254734567003"
        email = "peter@example.com"
        source = "google_maps"
        tag = "high_value"
        status = "submitted"
        preferredPackage = "30Mbps"
        installationTown = "Kisumu"
    }
)

foreach ($lead in $leads) {
    $body = @{
        customerName = $lead.customerName
        phone = $lead.phone
        email = $lead.email
        source = $lead.source
        tag = $lead.tag
        status = $lead.status
        preferredPackage = $lead.preferredPackage
        installationTown = $lead.installationTown
    } | ConvertTo-Json

    try {
        $response = Invoke-RestMethod -Uri "$backendUrl/api/leads/create" -Method Post -Body $body -ContentType 'application/json'
        Write-Host "Created lead: $($lead.customerName)" -ForegroundColor Green
    } catch {
        Write-Host "Failed to create lead: $($lead.customerName) - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nTesting frontend endpoints..." -ForegroundColor Cyan

# Test 2: Verify leads endpoint
try {
    $leadsResponse = Invoke-RestMethod -Uri "$backendUrl/api/trpc/leads.getAll" -Method Get
    Write-Host "Leads endpoint working - Found $($leadsResponse.result.data.json.Count) leads" -ForegroundColor Green
} catch {
    Write-Host "Leads endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Open frontend pages
Write-Host "`nOpening frontend pages..." -ForegroundColor Cyan
Start-Process 'https://bazztech.co.ke/leads'
Start-Sleep -Seconds 2
Start-Process 'https://bazztech.co.ke/dashboard'

Write-Host "`nSetup complete! Check your browser." -ForegroundColor Green
Write-Host "If pages show no data, wait 30 seconds for DNS and SSL to fully propagate." -ForegroundColor Yellow