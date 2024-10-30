var  iced_chart_rows;
var iced_chart_columns;
function closethis(){
	var shortcode = '[chart type="' + document.getElementById('charttype').value + '"';
	shortcode += ']["' + document.getElementById('r_0_c_0').value + '"'
	for(var c = 1; c <= iced_chart_columns; c++){
		shortcode += ',"' + document.getElementById('r_0_c_' + c).value + '"';
	}
	for(var r = 1; r <= iced_chart_rows; r++){
		shortcode += '],["' + document.getElementById('r_' + r + '_c_0').value + '"'
		for(var c = 1; c <= iced_chart_columns; c++){
			shortcode += ',' + document.getElementById('r_' + r + '_c_' + c).value;
			
		}
	}
	shortcode += '][/chart]';
	tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);
	tb_remove();
}	

(function() {
	tinymce.create('tinymce.plugins.iced_chart', {

		init : function(ed, url){
			ed.addButton('iced_chart', {
				title : 'Insert Chart',
				onclick : function() {
					// triggers the thickbox
					var width = jQuery(window).width(), H = jQuery(window).height(), W = ( 720 < width ) ? 720 : width;
					W = W - 150;
					H = H - 100;
					tb_show( 'Insert Chart', '#TB_inline?width=' + W + '&height=' + H + '&inlineId=chart-form' );					
				},
				image: url + "/icon.png"
			});
		},

		getInfo : function() {
			return {
				longname : 'Iced Chart Insert Button',
				author : 'Harsha',
				authorurl : 'http://icedapp.com',
				infourl : '',
				version : "1.0"
			};
		}
	});

	tinymce.PluginManager.add('iced_chart', tinymce.plugins.iced_chart);

	jQuery(function(){
	
		// creates a form to be displayed everytime the button is clicked
		// you should achieve this using AJAX instead of direct html code like this
		var form = jQuery('<div id="chart-form"><table id="icedchart-table" class="form-table">\
			<tr>\
				<td><label for="charttype">Chart Type:</label><select id="charttype" name="charttype"><option value="BarChart">Bar Chart</option> \
				<option value="PieChart">Pie Chart</option>  <option value="ColumnChart">Column Chart</option></select>\
				</td><td></td></tr><tr><td><label for="chart-columns">Rows</label>\
				<input type="text" id="chartrows" name="chartrows" value="3" /><br /><small>specify the number of data sets.</small>\
				</td><td><label for="chartcolumns">Columns</label>\
				<input type="text" id="chartcolumns" name="chartcolumns" value="1" /><br />\
				<small>specify the number of values.</small>	</td></tr><tr><td>	<p class="submit">\
			<input type="button" id="icedchart-submit" class="button-primary" value="Add values" name="submit" /></td>\
			</tr>\
				</table>\
		</p>\
		<div id="tableinput"></div></div>');
		
		var table = form.find('table');
		form.appendTo('body').hide();
		form.find('#icedchart-submit').click(function(){
			iced_chart_columns = document.getElementById("chartcolumns").value;
			iced_chart_rows = document.getElementById("chartrows").value;
			var tablecontent = '<form><table><tr><th><input id="r_0_c_0" value="Label" /></th>'
			for(var c = 1; c <= iced_chart_columns; c++){
				tablecontent += '<th><input id="r_0_c_' + c + '" value="Column ' + c + '"/></th>';			
			}
			for(var r = 1; r <= iced_chart_rows; r++){
				tablecontent += '</tr><tr>'
				for(var c = 0; c <= iced_chart_columns; c++){
					tablecontent += '<td><input id="r_' + r + '_c_' + c +'"/></td>';
				}
			}
			tablecontent += '</tr>';
			tablecontent += '</table></form>';
			tablecontent += '<input type="buttom" id="chart-submit" class="button-primary" value="Insert Chart" name="submit" onclick="closethis();"/>';
			document.getElementById("tableinput").innerHTML = tablecontent;
				
		});
	});
})();	