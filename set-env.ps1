# Script for automatic IPv4 address update in .env file
# Author: PowerShell Script
# Date: 2025

# Path to .env file
$envFilePath = "apps/mobile/.env"

# Check if directory exists, create if not
$directory = Split-Path -Parent $envFilePath
if (!(Test-Path -Path $directory)) {
    New-Item -ItemType Directory -Path $directory -Force
    Write-Host "Created directory: $directory" -ForegroundColor Green
}

try {
    # Getting IPv4 address - method 1: via Get-NetIPAddress cmdlet
    $ipv4Address = Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Ethernet*", "Wi-Fi*" -PrefixOrigin Dhcp, Manual | 
                   Where-Object { $_.IPAddress -notmatch "^169\.254\." -and $_.IPAddress -ne "127.0.0.1" } | 
                   Select-Object -First 1 -ExpandProperty IPAddress
    
    # If first method doesn't work, use alternative method
    if (-not $ipv4Address) {
        $ipv4Address = (Get-NetIPConfiguration | Where-Object { $_.NetProfile.NetworkCategory -ne "DomainAuthenticated" }).IPv4Address.IPAddress | 
                       Where-Object { $_ -notmatch "^169\.254\." -and $_ -ne "127.0.0.1" } | 
                       Select-Object -First 1
    }
    
    # If still no IP, use Test-NetConnection method
    if (-not $ipv4Address) {
        $ipv4Address = (Test-NetConnection -ComputerName "8.8.8.8" -Port 53).SourceAddress.IPAddress
    }
    
    if (-not $ipv4Address) {
        throw "Failed to find IPv4 address"
    }
    
    Write-Host "Found IPv4 address: $ipv4Address" -ForegroundColor Cyan
    
    # Preparing content for .env file
    $envVariableName = "EXPO_PUBLIC_API_URL"
    $newEnvLine = "$envVariableName=http://$ipv4Address" + ":7061"
    
    # Check if .env file exists
    if (Test-Path -Path $envFilePath) {
        # Read file content
        $envContent = Get-Content -Path $envFilePath
        
        # Check if variable already exists in file
        $variableExists = $false
        $updatedContent = @()
        
        foreach ($line in $envContent) {
            if ($line -match "^$envVariableName=") {
                # Replace existing line
                $updatedContent += $newEnvLine
                $variableExists = $true
                Write-Host "Updated existing variable $envVariableName" -ForegroundColor Yellow
            } else {
                $updatedContent += $line
            }
        }
        
        # If variable doesn't exist, add it at the end
        if (-not $variableExists) {
            $updatedContent += $newEnvLine
            Write-Host "Added new variable $envVariableName" -ForegroundColor Green
        }
        
        # Save updated content
        $updatedContent | Out-File -FilePath $envFilePath -Encoding UTF8
    } else {
        # Create new .env file
        $newEnvLine | Out-File -FilePath $envFilePath -Encoding UTF8
        Write-Host "Created new .env file" -ForegroundColor Green
    }
    
    Write-Host "IPv4 address saved to file: $envFilePath" -ForegroundColor Green
    Write-Host "Content: $newEnvLine" -ForegroundColor White
    
} catch {
    Write-Error "An error occurred: $($_.Exception.Message)"
    exit 1
}

# Optional: display .env file content
Write-Host "`n.env file content:" -ForegroundColor Magenta
Get-Content -Path $envFilePath | Write-Host