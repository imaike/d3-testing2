// helper function
function findOccurrences(arr, val) {
  var i, j,
    count = 0;
  for (i = 0, j = arr.length; i < j; i++) {
    (arr[i] === val) && count++;
  }
  return count;
}

// analyze sort triangle
var sortTriangle = [-2, -1, -1, 0, 0, 0, 1, 1, 2, ];
var uniques = _.uniq(sortTriangle);
// uniques are [-2,-1,0,1,2]

var instances = [];
var temp1;
for (var k = 0; k < uniques.length; k++) {
  temp1 = findOccurrences(sortTriangle, uniques[k]);
  instances.push(temp1);
}
//  console.log(JSON.stringify(instances));
// instances is [1,2,3,2,1]

// get x position
var xPosLoop = [];
var counterX = 0;
for (var m = 0; m < instances.length; m++) {
  for (var p = 0; p < instances[m]; p++) {
    xPosLoop.push(counterX);
  }
  counterX = counterX + 1;
}

// get y position
var yPosLoop = [];
var counterY;
for (var r = 0; r < instances.length; r++) {
  counterY = 0;
  for (var s = 0; s < instances[r]; s++) {
    yPosLoop.push(counterY);
    counterY = counterY + 1;
  }
}

// var xPosLoop = [0, 1, 1, 2, 2, 2, 3, 3, 4];
// var yPosLoop = [0, 0, 1, 0, 1, 2, 0, 1, 0]
//set their width and height

var elementWidth = 150;
var elementHeight = 110;

body = d3.select('body');
svg = body.append('svg')
  .attr('height', 1600)
  .attr('width', 1600);

var textArray = ["We accept improvements in status and power of lower class",
  "All men expected to try to improve selves",
  "Success in life by a previously deprived person is resented",
  "Men can expect fair treatment according to merit",
  "Lower-class not revolutionary",
  "Political goals relatively moderate, even conservative",
  "Those born to high place in society should retain it",
  "Person with wealth deserves place in high society",
  "We try to eliminate privileged classes"
];

for (var i = 0; i < textArray.length; i++) {
  var rect = svg.append('rect')
    .attr('width', 150)
    .attr('height', 110)
    .attr('x', xPosLoop[i] * (elementWidth))
    .attr('y', yPosLoop[i] * (elementHeight))
    .attr('fill', 'skyblue')
    //.style('fill', 'none')
    //.attr("rx", 4)
    .attr('stroke', 'black');

    var text = svg.append('foreignObject')
      .attr('x', (xPosLoop[i] * elementWidth) + 10)
      .attr('y', (yPosLoop[i] * elementHeight) + 20)
      .attr('width', 140)
      .attr('height', 85)
      .append("xhtml:body")
      .html('<div style="width: 138px; text-align: center; display: table-cell; vertical-align: middle">' + textArray[i] + '</div>');

  var symbol = svg.append('foreignObject')
    .attr('x', (xPosLoop[i] * elementWidth) + 10)
    .attr('y', (yPosLoop[i] * elementHeight))
    .attr('width', 140)
    .attr('height', 13)
    .append("xhtml:body")
    .html('<div style="width: 138px; text-align: right; display: table-cell; vertical-align: middle"> &#9658;** </div>');

  }

  // when called, will open a new tab with the SVG
  // which can then be right-clicked and 'save as...'
  function saveSVG(){

      // get styles from all required stylesheets
      // http://www.coffeegnome.net/converting-svg-to-png-with-canvg/
      // var style = "\n";
      // var requiredSheets = ['phylogram_d3.css', 'open_sans.css']; // list of required CSS
      // for (var i=0; i<document.styleSheets.length; i++) {
      //     var sheet = document.styleSheets[i];
      //     if (sheet.href) {
      //         var sheetName = sheet.href.split('/').pop();
      //         if (requiredSheets.indexOf(sheetName) != -1) {
      //             var rules = sheet.rules;
      //             if (rules) {
      //                 for (var j=0; j<rules.length; j++) {
      //                     style += (rules[j].cssText + '\n');
      //                 }
      //             }
      //         }
      //     }
      // }

      var svg = d3.select("svg"),
          img = new Image(),
          serializer = new XMLSerializer(),
          width = svg.node().getBBox().width,
          height = svg.node().getBBox().height;

      // prepend style to svg
      svg.insert('defs',":first-child");
      d3.select("svg defs")
          .append('style')
          .attr('type','text/css')
          .html(style);

      // generate IMG in new tab
      var svgStr = serializer.serializeToString(svg.node());
      img.src = 'data:image/svg+xml;base64,'+window.btoa(unescape(encodeURIComponent(svgStr)));
      window.open().document.write('<img src="' + img.src + '"/>');
  }

  // save button
  d3.select('body')
      .append("button")
      .on("click",saveSVG)
      .attr('class', 'btn btn-success');

// console.log();
