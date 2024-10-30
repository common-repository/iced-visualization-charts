<?php
/*
Plugin Name: Iced Visualization Charts
Plugin URI: http://icedapp.com/plugin-iced-visualization-charts-for-inserting-google-charts/
Description: Insert Google Charts and Visualizations easily inside your post.
Version: 0.4
Author: harshaperla
Author URI: http://icedapp.com
License: GPL2
*/
?>
<?php
function iced_chart_addbuttons() {
   // Only do this stuff when the current user has permissions and we are in Rich Editor mode
   if ( ( current_user_can('edit_posts') || current_user_can('edit_pages') ) && get_user_option('rich_editing') ) {
     add_filter("mce_external_plugins", "add_iced_chart_tinymce_plugin");
     add_filter('mce_buttons', 'register_iced_chart_button');
   }
}
 
function register_iced_chart_button($buttons) {
   array_push($buttons, "", "iced_chart");
   return $buttons;
}
 
// Load the TinyMCE plugin : editor_plugin.js (wp2.5)
function add_iced_chart_tinymce_plugin($plugin_array) {
   $plugin_array['iced_chart'] = plugins_url('insert-chart.js', __FILE__);
   return $plugin_array;
}
 

// init process for button control
add_action('init', 'iced_chart_addbuttons');
add_shortcode('chart','iced_chart_display');
$chart_id = 0;
function iced_chart_display($atts, $content = null)
{
	global $chart_id;
	wp_enqueue_script('google-visualization', 'http://www.google.com/jsapi', array('jquery'), '1.0', true);
	wp_enqueue_script('iced-visualization', plugins_url('iced-visualization.js', __FILE__), array('google-visualization'), '1.0', true);
	$type = $atts['type'];
	?>  
	<div id="chart_div_<?php echo $chart_id; ?>"></div>
	<script type="text/javascript">
	var chart_id = <?php echo $chart_id; ?>;
	if (typeof(iced_chart_options) == "undefined"){	var iced_chart_options = new Array()}; 
	if (typeof(iced_chart_content) == "undefined"){ var iced_chart_content = new Array()};
	if (typeof(iced_chart_type) == "undefined"){ var iced_chart_type = new Array()};
	iced_chart_options[chart_id] = {
	width: 500, height: 350,
	animation:{   duration: 2000, easing: 'out' },
	};
	iced_chart_content[chart_id] = [<?php echo str_replace(array('<br/>', '<br />'), '', $content); ?>];
	iced_chart_type[chart_id] = "<?php echo $type;?>";
	</script>
	<?php
	$chart_id ++;
}







