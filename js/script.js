d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(err, a) {
    var data = JSON.stringify(a);
    var dateSet = a.data.map(a => a[0].substring(0, 4));
    var dataSet = a.data.map(a => a[1]);
    var fullYear = a.data.map(a => a[0]);
  
    const w = 700,
          h = 500,
          padding = 50,
          margin = 20,
          bar = (w - padding)/dataSet.length; 
  
    const xScale = d3.scaleLinear()
                     .domain(d3.extent(dateSet))
                     .range([0, bar * dataSet.length - 7]);

    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(dataSet)])
                     .range([h - padding, 0]);
  
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h)
    
    const tooltip = svg.append("text")
                       .attr("id", "tooltip");
    
    svg.selectAll("rect")
        .data(dataSet)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * bar + padding)
        .attr("y", (d) => yScale(d) + margin)
        .attr("width", bar)
        .attr("height", (d) => h - padding - yScale(d))
        .attr("class", "bar")
        .attr("data-date",(d,i) => fullYear[i])
        .attr("data-gdp",(d,i) => dataSet[i])
        .attr("fill", "blue")
        .on("mouseover", (d, i) => {
            tooltip.attr("data-date",(d) => fullYear[i])
            .text("Date: " + fullYear[i] + ", GDP: " + d)
            .attr('x', i * bar - padding)
            .attr('y', h)
            .attr("opacity", 100)
            .attr("font-size","11");
        });
    
    svg.append("text")
        .text("United States GDP")
        .attr("class", "title")
        .attr("x", w / 2 - 80)
        .attr("y", 20)
        .attr("font-size", 25)
  
    svg.append("text")
        .text("Gross Domestic Product (million)")
        .attr("class", "barname")
        .attr("x", 0)
        .attr("y", 300)
        .attr("transform", "translate(-215,300)rotate(-90)")
              
    svg.append("g")
        .attr("id", "x-axis")
        .attr("class", "tick")
        .attr("transform", "translate(" + padding + "," + (h - padding + margin) + ")")
        .call(xAxis);
  
    svg.append("g")
        .attr("id", "y-axis")
        .attr("class", "tick")
        .attr("transform", "translate(" + padding + "," + margin + ")")
        .call(yAxis);
    
    svg.on("mouseout", (d, i) => {
        tooltip.attr("opacity", 0);
    });
      
   
});