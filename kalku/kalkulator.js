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

    if (type === 'algo') {
        result = basicAlgorithm(x1, y1, x2, y2, points);
    } else if (type === 'dda') {
        result = ddaAlgorithm(x1, y1, x2, y2, points);
    }

    document.getElementById('result').innerText = result;
    plotChart(points); // Memanggil fungsi untuk menggambar chart
}

// Algoritma dasar berdasarkan y = mx + b
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
        result += `Titik: (${x.toFixed(2)}, ${y.toFixed(2)})\n`;
        points.push({x: x.toFixed(2), y: y.toFixed(2)});
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

// Fungsi untuk membersihkan hasil
function clearResult() {
    document.getElementById('result').innerText = '';
    if (chart) {
        chart.destroy();
    }
}
