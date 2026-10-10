# Google Sheets Integration Setup Guide

Follow these steps to connect your Manify Media contact form to a Google Sheet using Google Apps Script. This will save all project inquiries automatically.

## 1. Create the Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Name it **"Manify Media Inquiries"**.
3. Rename the first tab at the bottom from "Sheet1" to **"Inquiries"** (exactly as spelled).
4. Add the following headers in Row 1 (A to I):
   - **A1**: Timestamp
   - **B1**: Full Name
   - **C1**: Email Address
   - **D1**: Phone Number
   - **E1**: Company / Organization
   - **F1**: Service Required
   - **G1**: Preferred Language
   - **H1**: Project Budget
   - **I1**: Expected Timeline
   - **J1**: Project Description
5. Make the header row bold and freeze it (View > Freeze > 1 row).

## 2. Set Up Google Apps Script
1. In your Google Sheet, click on **Extensions** > **Apps Script**.
2. Delete any existing code in the `Code.gs` editor.
3. Paste the following script:

```javascript
// Google Apps Script to save form submissions to Google Sheets

function doPost(e) {
  // Setup headers for CORS
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  try {
    // 1. Get the active spreadsheet and "Inquiries" sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Inquiries");
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": "Sheet not found"}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Parse the incoming JSON data
    var data = JSON.parse(e.postData.contents);
    
    // 3. Check Honeypot field (abuse protection)
    if (data._honey && data._honey.length > 0) {
      // If the honeypot is filled, silently ignore it (it's a bot)
      return ContentService.createTextOutput(JSON.stringify({"status": "success", "message": "Ignored"}))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders(headers);
    }

    // 4. Validate required fields
    if (!data.name || !data.email || !data.service || !data.message) {
       return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": "Missing required fields"}))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders(headers);
    }

    // 5. Create new row data
    var rowData = [
      new Date(), // Timestamp
      data.name,
      data.email,
      data.phone || "",
      data.company || "",
      data.service,
      data.language || "",
      data.budget || "",
      data.timeline || "",
      data.message
    ];

    // 6. Append row to sheet
    sheet.appendRow(rowData);

    // 7. Return success response
    return ContentService.createTextOutput(JSON.stringify({"status": "success", "message": "Inquiry saved successfully"}))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
      
  } catch (error) {
    // Handle errors
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
}

// Handle preflight OPTIONS request for CORS
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
}
```

## 3. Deploy the Web App
1. Click the **Deploy** button in the top right corner and select **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the deployment settings:
   - **Description**: Initial deployment
   - **Execute as**: Me (your Google account)
   - **Who has access**: Anyone
4. Click **Deploy**.
5. You may be prompted to review permissions. Click **Review permissions**, select your account, click **Advanced** at the bottom, and click **Go to Untitled project (unsafe)**. Allow the required permissions.
6. Once deployed, copy the **Web app URL**. It will look something like:
   `https://script.google.com/macros/s/AKfycby.../exec`

## 4. Connect the Website
1. In your Manify Media project code, create a `.env.local` file at the root of the project (if it doesn't exist).
2. Add the URL you copied as an environment variable:
   ```env
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. Restart your Next.js development server (`npm run dev`).
4. Test the form by submitting an inquiry!

## 5. Media Hosting Guidelines
For best performance, large video files should NOT be placed in the `public/videos` folder unless they are extremely small (<5MB).
For a scalable video portfolio:
1. Upload your videos to a platform like **Vimeo Pro**, **AWS S3**, **Cloudinary**, or **Mux**.
2. Get the direct `.mp4` URLs or streaming URLs.
3. Update `src/data/portfolio.ts` with these external URLs for the `videoUrl` fields.
4. Use optimized `.jpg` or `.webp` formats for `thumbnailUrl`.
