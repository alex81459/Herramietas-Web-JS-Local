$ErrorActionPreference = 'Stop'

Write-Host 'Iniciando servidor local en http://localhost:5500' -ForegroundColor Green
Start-Process 'http://localhost:5500'
python -m http.server 5500
