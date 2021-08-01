
d3.csv('https://raw.githubusercontent.com/amoghphadke/narrativedata/main/narrativedata.csv', function (data) {
  // Variables
  
  
  var body = d3.select('#code')
  
	var margin = { top: 50, right: 50, bottom: 50, left: 50 }
	var h = 700 - margin.top - margin.bottom
	var w = 700 - margin.left - margin.right
	// Scales
  var colorScale = d3.scale.category20()
  var xScale = d3.scale.linear()
    .domain([
    	d3.min([0,d3.min(data,function (d) { return d.average_log_gdp })]),
    	d3.max([0,d3.max(data,function (d) { return d.average_log_gdp })])
    	])
    .range([0,w])
  var yScale = d3.scale.linear()
    .domain([
    	d3.min([0,d3.min(data,function (d) { return d.average_social_support })]),
    	d3.max([0,d3.max(data,function (d) { return d.average_social_support })])
    	])
    .range([h,0])
	// SVG
	var svg = body.append('svg')
	    .attr('height',h + margin.top + margin.bottom)
	    .attr('width',w + margin.left + margin.right)
	  .append('g')
	    .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
	// X-axis
	var xAxis = d3.svg.axis()
	  .scale(xScale)
	  .ticks(5)
	  .orient('bottom')
  // Y-axis
	var yAxis = d3.svg.axis()
	  .scale(yScale)
	  .ticks(5)
	  .orient('left')
  // Circles
  var circles = svg.selectAll('circle')
      .data(data)
      .enter()
    .append('circle')
      .attr('cx',function (d) { return xScale(d.average_log_gdp) })
      .attr('cy',function (d) { return yScale(d.average_social_support) })
      .attr('r','5')
      .attr('stroke','black')
      .attr('stroke-width',1)
      .attr('fill',function (d,i) { return colorScale(i) })
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',20)
          .attr('stroke-width',3)
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',10)
          .attr('stroke-width',1)
      })
    .append('title') // Tooltip
    .text(function (d) { return d.Country +'\nSocial Support: ' + d.average_social_support +'\nAverage_log_gdp: ' + d.average_log_gdp})
  // X-axis
  svg.append('g')
      .attr('class','axis')
      .style({ 'stroke': 'black', 'fill': 'none', 'stroke-width': '1px'})
      .attr('transform', 'translate(0,' + h + ')')
      .call(xAxis)
    .append('text') // X-axis Label
      .attr('class','label')
      .attr('y',-10)
      .attr('x',w)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('Average LOG GDP')
  // Y-axis
  svg.append('g')
      .attr('class', 'axis')
      .style({ 'stroke': 'black', 'fill': 'none', 'stroke-width': '1px'})
      .call(yAxis)
    .append('text') // y-axis Label
      .attr('class','label')
      .attr('transform','rotate(-90)')
      .attr('x',0)
      .attr('y',5)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('Average Social Support')
      
}
)






