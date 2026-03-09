# GitHub Pages Troubleshooting Guide

## Step 1: Verify GitHub Pages is Enabled

1. Go to: https://github.com/hunterberry640/Ramirezcleaning/settings/pages
2. Under **Source**, make sure it's set to:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
3. Click **Save**
4. Wait 1-5 minutes for GitHub to build and deploy

## Step 2: Check the Correct URLs

Your site should be available at:
- **Root (redirects)**: `https://hunterberry640.github.io/Ramirezcleaning/`
- **English**: `https://hunterberry640.github.io/Ramirezcleaning/en/`
- **Spanish**: `https://hunterberry640.github.io/Ramirezcleaning/es/`

**Important**: The URL is case-sensitive! Make sure you're using:
- `Ramirezcleaning` (capital R, lowercase rest)
- Not `ramirezcleaning` or `RamirezCleaning`

## Step 3: Test Direct Access

Try accessing these URLs directly:
1. `https://hunterberry640.github.io/Ramirezcleaning/en/index.html`
2. `https://hunterberry640.github.io/Ramirezcleaning/es/index.html`

If these work but the root doesn't, the redirect might need adjustment.

## Step 4: Check GitHub Actions (if enabled)

1. Go to: https://github.com/hunterberry640/Ramirezcleaning/actions
2. Look for any failed builds or errors

## Step 5: Clear Browser Cache

- Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac) to hard refresh
- Or try in an incognito/private window

## Step 6: Verify Files are Committed

Make sure all files are pushed to GitHub:
```bash
git status
```

Should show: "Your branch is up to date with 'origin/main'"

## Common Issues

### 404 Error
- **Cause**: GitHub Pages not enabled, wrong branch/folder, or files not committed
- **Solution**: Follow Step 1 above

### Blank Page
- **Cause**: JavaScript redirect issue or missing assets
- **Solution**: Check browser console (F12) for errors

### Assets Not Loading (CSS/JS broken)
- **Cause**: Incorrect relative paths
- **Solution**: Verify paths in `en/index.html` and `es/index.html` use `../src/`

## Still Having Issues?

1. Check the GitHub Pages status in Settings → Pages
2. Look for any error messages
3. Verify the repository is public (required for free GitHub Pages)
4. Try accessing `https://hunterberry640.github.io/Ramirezcleaning/.nojekyll` - should return empty (confirms GitHub Pages is serving files)
