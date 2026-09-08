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
mkdir "%TARGET%\N.E.X.U.S" 2>nul
mkdir "%TARGET%\Projelerim" 2>nul
mkdir "%TARGET%\Fotograflarim" 2>nul
mkdir "%TARGET%\Sifrelerim_Vault" 2>nul

echo [2/3] N.E.X.U.S. derlenmis dosyalari USB'ye kopyalaniyor...
xcopy /E /Y /I "dist\*" "%TARGET%\N.E.X.U.S\"

echo [3/3] USB Baslatma scripti kopyalaniyor...
copy /Y "N.E.X.U.S_BASLAT.bat" "%TARGET%\N.E.X.U.S\"

echo.
echo =======================================================
echo [TEBRIKLER] N.E.X.U.S. USB Belleginize Basariyla Yuklendi!
echo =======================================================
echo.
echo USB Belleginizdeki "%TARGET%\N.E.X.U.S\N.E.X.U.S_BASLAT.bat"
echo dosyasina cift tiklayarak N.E.X.U.S.'u aninda acabilirsiniz.
echo.
pause
exit

:ERROR
echo [HATA] Gecerli bir surucu harfi girmediniz.
pause
