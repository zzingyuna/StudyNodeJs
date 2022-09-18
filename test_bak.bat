@ECHO OFF
ECHO hello~
set /a a=1

:_loop
echo 지금은 %a%번째 루프입니다. %date% %time%
set /a a+=1

set RESULT=$(curl -X GET http://localhost:3000/)
echo "${RESULT}"



if "%ERRORLEVEL%"=="0" echo Programm is running

timeout 10 > NUL
@REM 10초

@REM if %a% == 10  start cmd test.bat && goto _break
if %a% == 10  start test2.bat
if %a% == 10000  start test2.bat

goto _loop
:_break

PAUSE