var main = function(){
	var window_width = 0;
	var window_height = 0;
	var windowHeight_border = 0;
	var app_height = 0;

	var scroll = 0;
	var scroll_appProcent = 0
	var scroll_figureProcent = 0

	var appScrolls = 3;
	var appPadding = 75;

	var figure_size = 75;
	var figure_startColor = "#55ff55";
	var figure_endColor = "#f44336";
	var $figure = $(".figure");



	function changeWindowSize(){
		window_width = $(window).width();
		window_height = $(window).height();
		windowHeight_border = window_height - (appPadding * 2);
		app_height = window_height * appScrolls;

		$("[app]").css("height", app_height + "px");
	} // function. changeWindowSize

	function changeScroll(){
		scroll = $(window).scrollTop();
		scroll_appProcent = (scroll / (app_height - window_height)) * 100;
	} // function. changeScroll

	function figure_startSettings(figure_size, figure_startColor, figure_endColor){
		$figure.css("width", figure_size + "px");
		$figure.css("height", figure_size + "px");
		$figure.css("background", figure_startColor);
		$figure.css("top", appPadding);
		$figure.css("transform", "rotate(45deg)");

		changeColor(figure_startColor, figure_endColor, scroll_appProcent);
	} // function. figure_startSettings

	function changeFigure(scroll_appProcent){
		var figureScroll = appPadding + ((windowHeight_border - figure_size) / 100) * scroll_appProcent;

		$figure.css("top", figureScroll + "px");
		$figure.css("border-radius", (scroll_appProcent / 2) + "%");

		changeColor(figure_startColor, figure_endColor, scroll_appProcent);
	} // function. changeFigure

	function changeColor(startColor, endColor, scroll_appProcent){
		startColor = startColor.slice(1);
		endColor = endColor.slice(1);

		var startColor_arr = startColor.split("");
		var endColor_arr = endColor.split("");
		var startColorNum_arr = startColor.split("");
		var endColorNum_arr = endColor.split("");

		var colorsDiff_arr = [];
		var colorsDiffPos_arr = [];



		function shortColorExpand(color){
			var colorArr = [];

			for(var i = 0; i < color.length; i++){
				var colorPunc = color.charAt(i);
				for(var j = 0; j < 2; j++) colorArr.push(colorPunc);
			} // for. i < color.length

			return colorArr;
		} // function. shortColorExpand

		function colorToNum(){
			function switchColor(color){
				switch(color){
					case "a":
						return 10;
						break;
					case "b":
						return 11;
						break;
					case "c":
						return 12;
						break;
					case "d":
						return 13;
						break;
					case "e":
						return 14;
						break;
					case "f":
						return 15;
						break;
					default:
						return parseInt(color);
				} // switch. color
			} // function. switchColor

			for(var i = 0; i < 6; i++){
				startColorNum_arr[i] = switchColor(startColor_arr[i]);
				endColorNum_arr[i] = switchColor(endColor_arr[i]);
			} // for. i < 6
		} // function. colorToNum

		function numToColor(num){
			switch(num){
				case 10:
					return "a";
					break;
				case 11:
					return "b";
					break;
				case 12:
					return "c";
					break;
				case 13:
					return "d";
					break;
				case 14:
					return "e";
					break;
				case 15:
					return "f";
					break;
				default:
					return num;
			} // switch. num
		} // function. numToColor

		function colorCompare(){
			var finalColor = "#";

			for(var i = 0; i < 6; i++){
				var colorsDiff = Math.abs(startColorNum_arr[i] - endColorNum_arr[i]);
				var colorsDiffProcent = 0;
				var colorSteps = 0;

				if(startColorNum_arr[i] > endColorNum_arr[i]){
					colorsDiff = "-" + colorsDiff;
					colorsDiff = parseInt(colorsDiff);
				} // if. startColorNum_arr[i] > endColorNum_arr[i]

				if(window_height !== 0){
					var finalColorNum = 0;

					colorsDiffProcent = 100 / Math.abs(colorsDiff);
					colorSteps = Math.abs((scroll_appProcent / colorsDiffProcent).toFixed());


					if(colorsDiff > 0){
						finalColorNum = startColorNum_arr[i] + colorSteps;
					} else if(colorsDiff < 0){
						finalColorNum = startColorNum_arr[i] - colorSteps;
					} else {
						finalColorNum = startColorNum_arr[i];
					}

					finalColor = finalColor + numToColor(finalColorNum);
				} // if. scroll_appProcent !== 0
			} // for. i < 6

			$figure.css("background", finalColor);
		} // function. colorCompare



		if(startColor.length == 3) startColor_arr = shortColorExpand(startColor);
		if(endColor.length == 3) endColor_arr = shortColorExpand(endColor);



		colorToNum();
		colorCompare();
	} // function. changeColor



	$(window).resize(function(){
		changeWindowSize();
	}); // resize. window

	$(window).on("scroll", function(){
		changeScroll();
		changeFigure(scroll_appProcent);
	}); // scroll. window



	changeWindowSize();
	changeScroll();
	figure_startSettings(figure_size, figure_startColor, figure_endColor);
}

$(document).ready(main);