# Migration Script for Multi-Language Setup
# Run this from the cleanify project root directory

Write-Host "Multi-Language Migration Script" -ForegroundColor Green
Write-Host "===============================" -ForegroundColor Green
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "app\layout.tsx")) {
    Write-Host "Error: Please run this script from the cleanify project root directory" -ForegroundColor Red
    exit 1
}

Write-Host "Step 1: Creating [locale] directory..." -ForegroundColor Yellow
New-Item -Path "app\[locale]" -ItemType Directory -Force | Out-Null
Write-Host "  Created [locale] directory" -ForegroundColor Green

Write-Host "Step 2: Moving pages to [locale] folder..." -ForegroundColor Yellow

# Move page.tsx
if (Test-Path "app\page.tsx") {
    Move-Item -Path "app\page.tsx" -Destination "app\[locale]\page.tsx" -Force
    Write-Host "  Moved page.tsx" -ForegroundColor Green
}

# Move directories
$folders = @("about", "services", "blog", "contact")
foreach ($folder in $folders) {
    $sourcePath = "app\$folder"
    if (Test-Path $sourcePath) {
        Move-Item -Path $sourcePath -Destination "app\[locale]\$folder" -Force
        Write-Host "  Moved $folder/" -ForegroundColor Green
    }
}

Write-Host "Step 3: Backing up old layout..." -ForegroundColor Yellow
if (Test-Path "app\layout.tsx") {
    Copy-Item -Path "app\layout.tsx" -Destination "app\layout.tsx.backup" -Force
    Write-Host "  Backed up to layout.tsx.backup" -ForegroundColor Green
}

Write-Host "Step 4: Installing new root layout..." -ForegroundColor Yellow
if (Test-Path "app\root-layout-new.tsx") {
    Copy-Item -Path "app\root-layout-new.tsx" -Destination "app\layout.tsx" -Force
    Write-Host "  Installed new root layout" -ForegroundColor Green
}

Write-Host ""
Write-Host "Migration Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Create app\[locale]\layout.tsx (copy from app\locale-layout-new.tsx)" -ForegroundColor White
Write-Host "2. Update Header component to use translations" -ForegroundColor White
Write-Host "3. Run: npm install" -ForegroundColor White
Write-Host "4. Run: npm run dev" -ForegroundColor White
Write-Host "5. Visit: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "See QUICK-I18N-GUIDE.md for detailed instructions" -ForegroundColor Cyan
