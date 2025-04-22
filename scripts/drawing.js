class DrawingBoard {
    constructor() {
        this.canvas = document.getElementById('drawing-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
        
        // Controls
        this.colorPicker = document.getElementById('color');
        this.brushSize = document.getElementById('brush-size');
        this.clearButton = document.getElementById('clear-canvas');
        this.saveButton = document.getElementById('save-drawing');
        
        // Set canvas size
        this.resizeCanvas();
        
        // Initialize
        this.initializeEventListeners();
        this.loadDrawing();
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        
        // Restore drawing after resize
        this.loadDrawing();
    }
    
    initializeEventListeners() {
        // Drawing events
        this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
        
        // Touch events for mobile
        this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.canvas.addEventListener('touchend', this.stopDrawing.bind(this));
        
        // Control events
        this.clearButton.addEventListener('click', this.clearCanvas.bind(this));
        this.saveButton.addEventListener('click', this.saveDrawing.bind(this));
        
        // Window resize
        window.addEventListener('resize', this.resizeCanvas.bind(this));
    }
    
    startDrawing(e) {
        this.isDrawing = true;
        [this.lastX, this.lastY] = this.getCoordinates(e);
    }
    
    draw(e) {
        if (!this.isDrawing) return;
        
        const [currentX, currentY] = this.getCoordinates(e);
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(currentX, currentY);
        this.ctx.strokeStyle = this.colorPicker.value;
        this.ctx.lineWidth = this.brushSize.value;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.stroke();
        
        [this.lastX, this.lastY] = [currentX, currentY];
    }
    
    stopDrawing() {
        this.isDrawing = false;
        this.ctx.beginPath();
    }
    
    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        this.canvas.dispatchEvent(mouseEvent);
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        this.canvas.dispatchEvent(mouseEvent);
    }
    
    getCoordinates(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        return [x, y];
    }
    
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        localStorage.removeItem('drawingData');
    }
    
    saveDrawing() {
        const drawingData = this.canvas.toDataURL();
        localStorage.setItem('drawingData', drawingData);
        alert('Drawing saved successfully!');
    }
    
    loadDrawing() {
        const drawingData = localStorage.getItem('drawingData');
        if (drawingData) {
            const img = new Image();
            img.onload = () => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(img, 0, 0);
            };
            img.src = drawingData;
        }
    }
}

// Initialize the drawing board when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const drawingBoard = new DrawingBoard();
}); 