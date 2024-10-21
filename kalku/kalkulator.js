let chart; // Variable untuk menyimpan instance chart

function calculateLine(type) {
    const x1 = parseFloat(document.getElementById('x1').value);
    const y1 = parseFloat(document.getElementById('y1').value);
    const x2 = parseFloat(document.getElementById('x2').value);
    const y2 = parseFloat(document.getElementById('y2').value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
        alert('Input semua nilai x1, y1, x2, dan y2!');
        return;
    }

    let result = '';
    let points = [];

    if (type === 'basic') {
        result = basicAlgorithm(x1, y1, x2, y2, points);
    } else if (type === 'dda') {
        result = ddaAlgorithm(x1, y1, x2, y2, points);
    }

    document.getElementById('result').innerText = result;
    plotChart(points); // Memanggil fungsi untuk menggambar chart
}

// Algoritma dasar
function basicAlgorithm(x1, y1, x2, y2, points) {
    const m = (y2 - y1) / (x2 - x1);
    let result = `m = ${(m).toFixed(2)}\n`;

    for (let x = x1; x <= x2; x++) {
        const y = m * (x - x1) + y1;
        result += `Titik: (${x.toFixed(2)}, ${y.toFixed(2)})\n`;
        points.push({x: x.toFixed(2), y: y.toFixed(2)});
    }

    return result;
}

// Algoritma DDA
function ddaAlgorithm(x1, y1, x2, y2, points) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);

    const xIncrement = dx / steps;
    const yIncrement = dy / steps;

    let x = x1;
    let y = y1;
    let result = `dx = ${dx.toFixed(2)}, dy = ${dy.toFixed(2)}, steps = ${steps}\n`;

    for (let i = 0; i <= steps; i++) {
        result += `Titik: (${Math.round(x)}, ${Math.round(y)})\n`;
        points.push({x: Math.round(x), y: Math.round(y)});
        x += xIncrement;
        y += yIncrement;
    }

    return result;
}

// Fungsi untuk menggambar chart
function plotChart(points) {
    const labels = points.map(point => point.x);
    const data = points.map(point => point.y);

    const ctx = document.getElementById('lineChart').getContext('2d');

    if (chart) {
        chart.destroy(); // Menghancurkan chart sebelumnya jika ada
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Garis',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
                pointRadius: 4,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)'
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'X'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y'
                    }
                }
            }
        }
    });
}

// Fungsi untuk menggambar lingkaran dengan pola LINE_FILL
function drawCircle() {
    const xCenter = parseFloat(document.getElementById('x1').value);
    const yCenter = parseFloat(document.getElementById('y1').value);
    const radius = parseFloat(document.getElementById('x2').value) - xCenter;

    const fillCanvas = document.getElementById("fillCanvas");
    const ctx = fillCanvas.getContext("2d");

    // Menggambar lingkaran
    ctx.clearRect(0, 0, fillCanvas.width, fillCanvas.height); // Bersihkan canvas
    ctx.beginPath();
    ctx.arc(xCenter, yCenter, Math.abs(radius), 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Menerapkan pola LINE_FILL (garis horizontal di dalam lingkaran)
    const lineSpacing = 10; // Spasi antar garis horizontal
    const lineColor = "green"; // Warna garis

    ctx.fillStyle = lineColor;

    for (let y = yCenter - Math.abs(radius); y <= yCenter + Math.abs(radius); y += lineSpacing) {
        // Cek apakah titik y berada di dalam lingkaran
        const distanceFromCenterY = Math.abs(yCenter - y);
        const lineLength = Math.sqrt(Math.abs(radius) * Math.abs(radius) - distanceFromCenterY * distanceFromCenterY);

        // Menggambar garis horizontal di dalam area lingkaran
        ctx.fillRect(xCenter - lineLength, y, lineLength * 2, 2);
    }
}

function drawLineFill() {
    const canvas = document.getElementById('fillCanvas');
    const ctx = canvas.getContext('2d');

    const rectX = 250;
    const rectY = 100;
    const rectWidth = 400;
    const rectHeight = 180;

    // Menggambar persegi panjang
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas
    ctx.fillStyle = "white"; // Warna untuk area persegi panjang
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

    // Mengatur pola LINE_FILL (garis horizontal di dalam persegi panjang)
    const lineSpacing = 10; // Spasi antar garis horizontal
    const lineColor = "green"; // Warna garis

    ctx.fillStyle = lineColor;

    // Menggambar garis horizontal di dalam area persegi panjang
    for (let y = rectY; y < rectY + rectHeight; y += lineSpacing) {
        ctx.fillRect(rectX, y, rectWidth, 2); // Menggambar garis horizontal
    }
}

// Fungsi untuk membersihkan hasil
function clearResult() {
    document.getElementById('result').innerText = '';
    const ctxChart = document.getElementById('lineChart').getContext('2d');
    ctxChart.clearRect(0, 0, ctxChart.canvas.width, ctxChart.canvas.height); // Bersihkan chart
    const fillCanvas = document.getElementById('fillCanvas');
    fillCanvas.getContext('2d').clearRect(0, 0, fillCanvas.width, fillCanvas.height); // Bersihkan canvas
}
