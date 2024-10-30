google.load('visualization', '1', {packages: ['corechart']});
var options, data, chart;

function intit_icedchart(){
	for(var i=0; i <= chart_id; i++){
			
		options = iced_chart_options[i];

		data = google.visualization.arrayToDataTable(iced_chart_content[i]);
		var iced_chart = iced_chart_type[i];
		chart = new google.visualization[iced_chart](document.getElementById('chart_div_' + i ));
		chart.draw(data, options);
	}
}

google.setOnLoadCallback(intit_icedchart);