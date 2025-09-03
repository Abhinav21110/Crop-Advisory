@echo off
echo Building for GitHub Pages...
npm run build:gh-pages

echo.
echo Build completed! Files are in the 'dist' folder.
echo.
echo To deploy to GitHub Pages:
echo 1. Push your changes to the main branch
echo 2. The GitHub Action will automatically deploy
echo 3. Or manually upload the 'dist' folder contents to the gh-pages branch
echo.
echo Your site will be available at: https://abhinav21110.github.io/Crop-Advisory/
pause
