
document.addEventListener('DOMContentLoaded', function() {
    function createChart(chartId, chartTitle, labels, data, backgroundColor, borderColor) {
        new Chart(document.getElementById(chartId), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: chartTitle,
                    data: data,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    fetch('ipl_stats.json')
    .then(response => response.json())
    .then(data => {

        // Example: Create charts for multiple datasets
        createChart('orangeCapChart', 'Orange Cap', 
            data['Orange Cap'].map(player => player.PLAYER), 
            data['Orange Cap'].map(player => parseInt(player.RUNS)), 
            'rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 1)');

        createChart('mostFoursChart', 'Most Fours (Innings)', 
            data['Most Fours (Innings)'].map(player => player.PLAYER), 
            data['Most Fours (Innings)'].map(player => parseInt(player['4S'])), 
            'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)');

        // Add more charts as needed
        createChart('mostSixesChart', 'Most Sixes (Innings)', 
            data['Most Sixes (Innings)'].map(player => player.PLAYER), 
            data['Most Sixes (Innings)'].map(player => parseInt(player['6S'])), 
            'rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 1)');

        createChart('mostFiftiesChart', 'Most Fifties', 
            data['Most Fifties'].map(player => player.PLAYER), 
            data['Most Fifties'].map(player => parseInt(player["50"])), 
            'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 1)');

        createChart('mostCenturiesChart', 'Most Centuries', 
            data['Most Centuries'].map(player => player.PLAYER), 
            data['Most Centuries'].map(player => parseInt(player["100"])), 
            'rgba(153, 102, 255, 0.2)', 'rgba(153, 102, 255, 1)');

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});



// Fetch data from data.json
