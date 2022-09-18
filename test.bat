@ECHO OFF
ECHO hello~

:_loop

curl localhost:3000/
echo .
if "%ERRORLEVEL%"=="7" start test2.bat

timeout 5 > NUL
@REM 5초


goto _loop
:_break

PAUSE