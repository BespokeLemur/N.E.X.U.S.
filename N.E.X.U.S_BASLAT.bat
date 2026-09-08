@echo off
:: N.E.X.U.S. Portable USB Environment Launcher
title N.E.X.U.S. Portable USB Environment
color 0A
cls
echo =======================================================
echo     N.E.X.U.S. USB PORTABLE WEB SUNUCUSU BASLATILIYOR
echo =======================================================
echo.
echo [1/2] Yerel port (http://localhost:5500) hazirlaniyor...
echo [2/2] Tarayici otomatik aciliyor...
echo.
echo Sunucuyu durdurmak icin bu pencereyi kapatabilirsiniz.
echo.
powershell -NoProfile -ExecutionPolicy Bypass -Command "$dir='%~dp0'; $port=5500; $listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:'+$port+'/'); $listener.Start(); Start-Process ('http://localhost:'+$port); while ($listener.IsListening) { try { $ctx = $listener.GetContext(); $req = $ctx.Request; $res = $ctx.Response; $urlPath = $req.Url.AbsolutePath.TrimStart('/'); if ([string]::IsNullOrEmpty($urlPath)) { $urlPath = 'index.html' }; $filePath = [System.IO.Path]::Combine($dir, $urlPath); if (Test-Path $filePath -PathType Leaf) { $bytes = [System.IO.File]::ReadAllBytes($filePath); $ext = [System.IO.Path]::GetExtension($filePath); switch ($ext) { '.html' { $res.ContentType = 'text/html; charset=utf-8' } '.js' { $res.ContentType = 'application/javascript; charset=utf-8' } '.css' { $res.ContentType = 'text/css' } '.json' { $res.ContentType = 'application/json' } '.png' { $res.ContentType = 'image/png' } '.ico' { $res.ContentType = 'image/x-icon' } default { $res.ContentType = 'application/octet-stream' } }; $res.ContentLength64 = $bytes.Length; $res.OutputStream.Write($bytes, 0, $bytes.Length) } else { $res.StatusCode = 404 }; $res.OutputStream.Close() } catch {} }"
