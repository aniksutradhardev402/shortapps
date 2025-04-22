class QRGenerator {
    constructor() {
        this.input = document.getElementById('qr-text');
        this.generateBtn = document.getElementById('generate-qr');
        this.downloadBtn = document.getElementById('download-qr');
        this.qrCode = document.getElementById('qr-code');
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.generateBtn.addEventListener('click', () => this.generateQR());
        this.downloadBtn.addEventListener('click', () => this.downloadQR());
        
        // Generate QR code when Enter is pressed
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.generateQR();
            }
        });
    }
    
    generateQR() {
        const text = this.input.value.trim();
        if (!text) {
            alert('Please enter some text or URL');
            return;
        }
        
        // Clear previous QR code
        this.qrCode.innerHTML = '';
        
        // Create QR code using qrcode.js library
        new QRCode(this.qrCode, {
            text: text,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
    
    downloadQR() {
        const img = this.qrCode.querySelector('img');
        if (!img) {
            alert('Please generate a QR code first');
            return;
        }
        
        // Create a temporary link to download the image
        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = img.src;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Initialize the QR generator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const qrGenerator = new QRGenerator();
}); 