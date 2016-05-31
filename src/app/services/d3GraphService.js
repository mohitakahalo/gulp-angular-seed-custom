/*
 ** D3 service to draw pie chart
 ** author: @Harshit
 */

(function() {
  'use strict';

  angular
    .module('services')
    .factory('d3GraphService', d3GraphService);

  /** @ngInject */
  function d3GraphService() {

    function drawPieChart(dataSet, pieChartDiv) {
      var total = d3.sum(dataSet, function(d) {
        return d.amount_invested
      });
      var width = 390,
        height = 390,
        radius = Math.min(width, height) / 2;
      /* ------- PIE SLICES -------*/
      var pie = d3.layout.pie()
        .value(function(d) {
          return d.amount_invested;
        })
        .sort(null);
      var color = d3.scale.category20();
      var arc = d3.svg.arc()
        .innerRadius(radius - 80)
        .outerRadius(radius - 50);
      var svgHeight = Math.max(height, dataSet.length * 22);
      var svg = d3.select(pieChartDiv).append("svg")
        .data([dataSet])
        .attr("width", "100%")
        .attr("height", svgHeight)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
      // create <path> elements using arc data...
      var path = svg.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("svg:g")
        .attr("class", "slice");

      path.append("path")
        .attr("fill", function(d, i) {
          return color(i);
        })
        .attr("d", arc);

      // Add a Label to each arc slice...
      var legendRectSize = 15;
      var legendSpacing = 4;
      var legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
          var height = legendRectSize + legendSpacing;
          var offset = height * color.domain().length / 2;
          var horz = width / 2;
          var vert = i * height - offset;
          return 'translate(' + horz + ',' + vert + ')';
        });
      legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color);
      legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(i) {
          return d3.round(100 * dataSet[i].amount_invested / total, 1) + "% " + dataSet[i].name;
        });

      var totalInvestor = svg.selectAll("g.slice").size();
      // Add center Label to chart...
      svg.append("text")
        .attr("text-anchor", "middle")
        .style("transform", "translatey(2rem)")
        .style("fill", "#F08137")
        .style("font", "bold 10rem Source Sans")
        .text(function() {
          return totalInvestor;
        });
      svg.append("text")
        .attr("text-anchor", "middle")
        .style("transform", "translatey(5rem)")
        .style("fill", "#F08137")
        .style("font", "2rem Source Sans")
        .text(function() {
          return "Investors";
        });
    }

    return {
      drawPieChart: drawPieChart
    }
  }
})();
