@ECHO OFF
ECHO hello~


@REM C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp
@REM 위치에 파일 추가


:_loop

curl localhost:3000/
echo .
if "%ERRORLEVEL%"=="7" start C:\Users\yuna\Desktop\Source\StudyNodeJs\test2.bat

timeout 5 > NUL
@REM 5초


goto _loop
:_break

PAUSE