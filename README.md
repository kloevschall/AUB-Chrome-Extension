# Aalborg University Library Online Access Extension

This browser extension provides Aalborg University (AAU) users with easy remote access to library publications by automatically redirecting them through the library proxy when available.

The extension is compatible with **Google Chrome** and **Microsoft Edge** and is built using **Manifest V3**.

## Features
- **Automatic proxy check:** Queries the library API to see if the current page is supported for remote access.
- **Seamless redirection:** Automatically redirects to the proxied URL if access is confirmed.
- **Smart detection:** Skips checking if the page is already proxied (via `zorac.aub.aau.dk`) to avoid loops.
- **Privacy first:** Only reads the URL of the active tab when the extension icon is clicked.

## Installation for developers
Since modern browsers restrict manual installation of `.crx` files, follow these steps to load the extension locally:

1.  **Download/Clone** this repository to your computer.
2.  **Open Extension Settings:**
    - **Chrome:** Go to `chrome://extensions/`
    - **Edge:** Go to `edge://extensions/`
3.  **Enable Developer Mode:** Toggle the switch in the top-right (Chrome) or bottom-left (Edge).
4.  **Load Unpacked:**
    - Click the **Load unpacked** button.
    - Select the root directory of this project (the folder containing `manifest.json`).
5.  The extension icon will now appear in your browser.

## How to use
1.  Navigate to a research publication, journal article, or database (e.g., ScienceDirect, JSTOR, IEEE Xplore).
2.  Click the **AAU** extension icon.
3.  The extension will check for access:
    - If supported, you will be redirected to the AAU login page or directly to the proxied content.
    - If not supported, the popup will display "Online access is not available for this site."
    - If already proxied, it will inform you that "The page is already proxied via Aalborg University Library."

## Official distribution (TODO)
To distribute this extension officially to users, it must be submitted to the respective web stores:
- **Chrome Web Store:** Requires a developer account and a ZIP of the source code.
- **Microsoft Edge Add-ons:** Requires a Microsoft Partner account and a ZIP of the source code.

*Note: The `.pem` private key file and the `.git` directory should never be included in the final distribution ZIP.*

## Credits
- **Service:** Powered by Aalborg University Library's proxy service.
