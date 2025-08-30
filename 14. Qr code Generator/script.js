// script.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const qrText = document.getElementById('qr-text');
    const qrSize = document.getElementById('qr-size');
    const qrType = document.getElementById('qr-type');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const shareBtn = document.getElementById('share-btn');
    const qrCanvas = document.getElementById('qr-canvas');
    const qrResult = document.querySelector('.qr-result');
    const qrPlaceholder = document.querySelector('.qr-placeholder');
    
    // Initialize QR code generator
    function initQRGenerator() {
        generateBtn.addEventListener('click', generateQRCode);
        downloadBtn.addEventListener('click', downloadQRCode);
        shareBtn.addEventListener('click', shareQRCode);
    }
    
    // Generate QR code
    function generateQRCode() {
        const text = qrText.value.trim();
        const size = parseInt(qrSize.value);
        const type = qrType.value;
        
        if (!text) {
            alert('Please enter text or URL to generate QR code');
            return;
        }
        
        // Format text based on type
        let formattedText = text;
        if (type === 'email' && !text.startsWith('mailto:')) {
            formattedText = `mailto:${text}`;
        } else if (type === 'phone' && !text.startsWith('tel:')) {
            formattedText = `tel:${text}`;
        } else if (type === 'url' && !text.startsWith('http')) {
            formattedText = `https://${text}`;
        }
        
        // Clear previous QR code
        const ctx = qrCanvas.getContext('2d');
        ctx.clearRect(0, 0, qrCanvas.width, qrCanvas.height);
        
        // Set canvas size
        qrCanvas.width = size;
        qrCanvas.height = size;
        
        // Generate QR code
        try {
            QRCode.toCanvas(qrCanvas, formattedText, {
                width: size,
                margin: 1,
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                }
            }, function(error) {
                if (error) {
                    console.error(error);
                    alert('Error generating QR code. Please try again.');
                    return;
                }
                
                // Show result section
                qrPlaceholder.classList.add('hidden');
                qrResult.classList.remove('hidden');
                qrResult.classList.add('active');
            });
        } catch (error) {
            console.error('QR Code generation error:', error);
            alert('Error generating QR code. Please try again.');
        }
    }
    
    // Download QR code
    function downloadQRCode() {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = qrCanvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // Share QR code
    function shareQRCode() {
        if (navigator.share) {
            qrCanvas.toBlob(function(blob) {
                const file = new File([blob], 'qrcode.png', { type: 'image/png' });
                
                navigator.share({
                    title: 'QR Code',
                    text: 'Check out this QR code I generated!',
                    files: [file]
                }).catch(error => {
                    console.log('Sharing failed', error);
                    alert('Sharing failed. Please try again or use the download option.');
                });
            });
        } else {
            alert('Web Share API is not supported in your browser. You can download the QR code instead.');
        }
    }
    
    // Initialize the application
    initQRGenerator();
});