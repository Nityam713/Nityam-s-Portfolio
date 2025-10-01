# Resume Directory

## How to Add Your Resume

1. **Replace the placeholder PDF file** with your actual resume
2. **Keep the filename as**: `Nityam_Handa_Resume.pdf`
3. **Ensure the file is a PDF format** for universal compatibility

## File Requirements

- **Format**: PDF (Portable Document Format)
- **Filename**: `Nityam_Handa_Resume.pdf`
- **Max Size**: Recommended to keep under 2MB for faster downloads
- **Optimization**: Compress your PDF if it's large

## How to Replace

### Option 1: Using File Manager (Easiest)
1. Navigate to `assets/resume/` folder
2. Delete the placeholder `Nityam_Handa_Resume.pdf`
3. Copy your resume PDF here
4. Rename it to `Nityam_Handa_Resume.pdf`

### Option 2: Using Command Line
```bash
# Navigate to the resume directory
cd /home/review/nityam/Nityam-s-Portfolio/assets/resume/

# Remove placeholder
rm Nityam_Handa_Resume.pdf

# Copy your resume (replace /path/to/your/resume.pdf with actual path)
cp /path/to/your/resume.pdf Nityam_Handa_Resume.pdf
```

## Testing the Download

1. Open your portfolio locally: `http://localhost/`
2. Look for the floating **"RESUME"** button on the right side of the hero section
3. Click it to test the download
4. Verify that the correct PDF opens/downloads

## Important Notes

- ⚠️ Do not change the filename unless you also update it in `index.html` (line 111)
- ✅ Keep the file in this exact directory: `assets/resume/`
- 🔒 Make sure your resume doesn't contain any sensitive information you don't want public
- 📱 The button is responsive and adapts to mobile devices

## Location of Button

The download button appears:
- **Desktop**: Right side of hero section (vertically centered)
- **Mobile**: Bottom right corner, above the scroll indicator
- **Styling**: Cyan accent color with download icon
- **Animation**: Subtle pulse effect to draw attention

---

**Last Updated**: October 1, 2025

