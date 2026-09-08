@echo off
:: N.E.X.U.S. USB Flash Drive Installer & Packaging Tool v3.2
title N.E.X.U.S. USB Installer
color 0A
cls
echo =======================================================
echo     N.E.X.U.S. USB BELLEK PAKETLEME VE KURULUM ARACI
echo =======================================================
echo.
echo Lutfen USB belleginizin surucu harfini girin (Ornegin E veya F):
set /p USB_LETTER=Surucu Harfi: 

if "%USB_LETTER%"=="" goto ERROR

:: Strip spaces
set USB_LETTER=%USB_LETTER: =%
set TARGET=%USB_LETTER:~0,1%:

if not exist "%TARGET%\" (
    echo.
    echo =======================================================
    echo [HATA] "%TARGET%" surucusu bulunamadi!
    echo Lutfen USB belleginizin bilgisayara takili oldugundan ve
    echo "Bu PC" altinda harfinin göründugunden emin olun.
    echo =======================================================
    echo.
    pause
    exit
)

echo.
echo [1/3] Klasor yapisi olusturuluyor (%TARGET%)...
mkdir "%TARGET%N.E.X.U.S" 2>nul
mkdir "%TARGET%Projelerim" 2>nul
mkdir "%TARGET%Fotograflarim" 2>nul
mkdir "%TARGET%Sifrelerim_Vault" 2>nul

echo [2/3] N.E.X.U.S. derlenmis dosyalari USB'ye kopyalaniyor...
xcopy /E /Y /I "dist\*" "%TARGET%N.E.X.U.S\"

echo [3/3] USB Baslatma scripti ve Portable Sunucu olusturuluyor...
(
  echo @echo off
  echo title N.E.X.U.S. Portable USB Environment
  echo color 0A
  echo cls
  echo =======================================================
  echo     N.E.X.U.S. USB PORTABLE WEB SUNUCUSU BASLATILIYOR
  echo =======================================================
  echo.
  echo [1/2] Yerel port ^(http://localhost:5500^) hazirlaniyor...
  echo [2/2] Tarayici otomatik aciliyor...
  echo.
  echo Sunucuyu durdurmak icin bu pencereyi kapatabilirsiniz.
  echo.
  echo powershell -NoProfile -ExecutionPolicy Bypass -Command "$dir='%%~dp0'; $port=5500; $listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:'+$port+'/'); $listener.Start(); Start-Process ('http://localhost:'+$port); while ($listener.IsListening) { try { $ctx = $listener.GetContext(); $req = $ctx.Request; $res = $ctx.Response; $urlPath = $req.Url.AbsolutePath.TrimStart('/'); if ([string]::IsNullOrEmpty($urlPath)) { $urlPath = 'index.html' }; $filePath = [System.IO.Path]::Combine($dir, $urlPath); if (Test-Path $filePath -PathType Leaf) { $bytes = [System.IO.File]::ReadAllBytes($filePath); $ext = [System.IO.Path]::GetExtension($filePath); switch ($ext) { '.html' { $res.ContentType = 'text/html; charset=utf-8' } '.js' { $res.ContentType = 'application/javascript; charset=utf-8' } '.css' { $res.ContentType = 'text/css' } '.json' { $res.ContentType = 'application/json' } '.png' { $res.ContentType = 'image/png' } '.ico' { $res.ContentType = 'image/x-icon' } default { $res.ContentType = 'application/octet-stream' } }; $res.ContentLength64 = $bytes.Length; $res.OutputStream.Write($bytes, 0, $bytes.Length) } else { $res.StatusCode = 404 }; $res.OutputStream.Close() } catch {} }"
) > "%TARGET%N.E.X.U.S\N.E.X.U.S_BASLAT.bat"

echo.
echo =======================================================
echo [TEBRIKLER] N.E.X.U.S. USB Belleginize Basariyla Yuklendi!
echo =======================================================
echo.
echo USB Belleginizdeki "%TARGET%N.E.X.U.S\N.E.X.U.S_BASLAT.bat"
echo dosyasina cift tiklayarak N.E.X.U.S.'u aninda acabilirsiniz.
echo.
pause
exit

:ERROR
echo [HATA] Gecerli bir surucu harfi girmediniz.
pause
