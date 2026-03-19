
/**
 * Renders a message to the popup status area.
 * @param {string} statusText - The message to display.
 * @param {boolean} isError - Whether to style the message as an error.
 */
function renderStatus(statusText, isError = false) {
    const statusElement = document.getElementById('status');
    statusElement.textContent = statusText;
    
    if (isError) {
        statusElement.classList.add('error');
    } else {
        statusElement.classList.remove('error');
    }
}

// Ensure the code runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (!tabs || tabs.length === 0) {
            renderStatus("No active tab found.", true);
            return;
        }

        const tab = tabs[0];
        const url = tab.url;

        // Extensions cannot read URLs of chrome://, edge://, etc. unless they have special permissions
        if (!url || url.startsWith('chrome://') || url.startsWith('edge://') || url.startsWith('about:')) {
            renderStatus("Cannot access this type of page. Try a journal or database.", true);
            return;
        }

        // Check if the page is already proxied via zorac.aub.aau.dk
        if (url.includes("zorac.aub.aau.dk")) {
            renderStatus("The page is already proxied via Aalborg University Library.");
            return;
        }

        // Properly encode the URL to handle special characters
        const apiUrl = "https://alma-services-1.aub.aau.dk/UmbracoSupporter/remote_access?qurl=" + encodeURIComponent(url);
        
        renderStatus('Looking up online access...');

        fetch(apiUrl)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Online access lookup failed: " + response.statusText);
                }
                return response.json();
            })
            .then(function (body) {
                if (body && body.error == 1) {
                    renderStatus("Error:\nUnable to contact API. Please try again later.")
                }
                if (body && body.proxy == 1) {
                    renderStatus("Online access found. Redirecting...");
                    const newurl = 'https://login.zorac.aub.aau.dk/login?qurl=' + encodeURIComponent(url);
                    chrome.tabs.update(tab.id, {url: newurl});
                } else {
                    renderStatus("Online access is not available for this site.");
                }
            })
            .catch(function (error) {
                console.error("Extension Error:", error);
                // Differentiate between network issues and specific AUB errors
                const message = error.message.includes('fetch') 
                    ? "Network error. Please check your internet connection." 
                    : error.message;
                renderStatus("Error:\n" + message, true);
            });
    });
});
