// dimensions and margins of the graph
  var margin = {top: 80, right: 25, bottom: 30, left: 40},
  width = 625 - margin.left - margin.right,
  height = 625 - margin.top - margin.bottom;
  
  var inputData = ""
  
  function removeSVG(){
    d3.selectAll('svg').remove();
  }

  function chooseMonth(userMonth){
    var svg = d3.select("#covidVis")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    
    if (userMonth.localeCompare("Jan") == 0) {
      inputData = "https://raw.githubusercontent.com/aditanup/covidVis/main/january.csv"
    } else if (userMonth.localeCompare("Feb") == 0) {
      inputData = "https://raw.githubusercontent.com/aditanup/covidVis/main/februaryUpdated2.csv"
    } else if (userMonth.localeCompare("Mar") == 0) {
      inputData = "https://raw.githubusercontent.com/aditanup/covidVis/main/march.csv"
    } else if (userMonth.localeCompare("Apr") == 0) {
      inputData = "https://raw.githubusercontent.com/aditanup/covidVis/main/april.csv"
    } else if (userMonth.localeCompare("May") == 0) {
      inputData = "https://raw.githubusercontent.com/aditanup/covidVis/main/may.csv"
    } else if (userMonth.localeCompare("Jun") == 0) {
      inputData = "https://raw.githubusercontent.com/aditanup/covidVis/main/june.csv"
    } else if (userMonth.localeCompare("Jul") == 0) {
      inputData = "https://raw.githubusercontent.com/aditanup/covidVis/main/july.csv"
    } else if (userMonth.localeCompare("Aug") == 0) {
      inputData = "https://raw.githubusercontent.com/aditanup/covidVis/main/august.csv"
    } else if (userMonth.localeCompare("Sep") == 0) {
      inputData = "https://raw.githubusercontent.com/aditanup/covidVis/main/september.csv"
    } else if (userMonth.localeCompare("Oct") == 0) {
      inputData = "https://raw.githubusercontent.com/aditanup/covidVis/main/october.csv"
    } else if (userMonth.localeCompare("Nov") == 0) {
      inputData = "https://raw.githubusercontent.com/aditanup/covidVis/main/november.csv"
    } else if (userMonth.localeCompare("Dec") == 0) {
      inputData = "https://raw.githubusercontent.com/aditanup/covidVis/main/december.csv"
    }
    
  
  d3.csv(inputData, function(data) { 
    // Labels of row and columns 
    var myGroups = d3.map(data, function(d){return d.group;}).keys()
    var myVars = d3.map(data, function(d){return d.variable;}).keys()
  
    // X scales and axis:
    var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(myGroups)
      .padding(0.05);
    svg.append("g")
      .style("font-size", 15)
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0))
      .select(".domain").remove()
  
    // Y scales and axis:
    var y = d3.scaleBand()
      .range([ height, 0 ])
      .domain(myVars)
      .padding(0.05);
    svg.append("g")
      .style("font-size", 15)
      .call(d3.axisLeft(y).tickSize(0))
      .select(".domain").remove()
  
    // colors
    var myColor = d3.scaleSequential()
      .interpolator(d3.interpolateMagma)
      .domain([0,75000])
  
    // tooltip
    var tooltip = d3.select("#covidVis")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
  
    // 
    var mouseover = function(d) {
      tooltip
        .style("opacity", 1)
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
    }
    var mousemove = function(d) {
      tooltip
        .html("On " + userMonth + " " + d.variable + ", 2020, " + d.group + " reported " + d.value + " new cases")
        .style("left", (d3.mouse(this)[0]+70) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave = function(d) {
      tooltip
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }
  
    // add the squares
    svg.selectAll()
      .data(data, function(d) {return d.group+':'+d.variable;})
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.group) })
        .attr("y", function(d) { return y(d.variable) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return myColor(d.value)} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
  })
  
  // title
  svg.append("text")
          .attr("x", 0)
          .attr("y", -50)
          .attr("text-anchor", "left")
          .style("font-size", "22px")
          .text("International New Covid-19 Cases Over Time");
  
  // subtitle
  svg.append("text")
          .attr("x", 0)
          .attr("y", -20)
          .attr("text-anchor", "left")
          .style("font-size", "14px")
          .style("fill", "grey")
          .style("max-width", 400)
          .text("10 most populated countries");
  
  
  }