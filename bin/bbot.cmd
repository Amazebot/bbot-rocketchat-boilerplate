@echo off
call npm install
SETLOCAL
node ../index.js %* 