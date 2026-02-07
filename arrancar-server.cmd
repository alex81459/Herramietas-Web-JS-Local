@echo off
setlocal

powershell -NoProfile -ExecutionPolicy Bypass -Command "Write-Host 'Iniciando servidor local en http://localhost:5500'; Start-Process 'http://localhost:5500'; python -m http.server 5500"
