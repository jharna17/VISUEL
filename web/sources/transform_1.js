


//console.log(localStorage["table"]);
$('document').ready(function () {
    var q = JSON.parse(localStorage["table"]);
    //console.log(q);

    var columns = localStorage["columns"].split(',');
    var properties = [];
    var operations = [];
    var datatype_eachcol = [];
    for (var j in columns) {
        datatype_eachcol[j] = 'String';
    }
    var unique = [];
    var missing = [];

    //var miss=0;
    var nmiss = [];
    var invalid = [];

    //var inv=0;
    var ninval = [];
    var nval = [];
    function ismissing(i, j) {
        if (q[i][columns[j]] == '') {
            if (missing[j].includes(i + "") != true) {
                console.log("missing" + i);
                missing[j].push(i + "");
                nmiss[j]++;
                return true;
            }
            return true;
        }
        else {
            for (var m in missing[j]) {
                if (missing[j][m] == i + "") {
                    //missing[j][m] = -1;
                    //nmiss[j]--;
                    console.log("removing" + i + "from missing");
                    missing[j].splice(m, 1);
                    return false;
                }
            }
        }
        return false;
        //console.log(missing);
        //console.log(nmiss);
    }

    function uniqueval(j) {
        var row = 0;
        unique[j] = d3.nest().key(function (d) {
            console.log((row) + "  " + j)
            console.log(d);
            row++;
            if (d[columns[j]] != "" && isvalid(row - 1, j) == true)
                return d[columns[j]];
        }).map(q);
        //console.log(unique[j]);
    }

    function isvalid(i, j) {
        console.log(columns[j] + " ,nkjihyut ");
        var type = datatype_eachcol[j];
        console.log(type);
        if (type == 'Integer') {
            console.log("kwejhgf8ewif" + q[i][columns[j]]);
            var x = +q[i][columns[j]];
            if (!isNaN(x) && x.toString().indexOf('.') == -1) {
                nval[j]++;
                for (var k in invalid[j]) {
                    if (invalid[j][k] == i + "") {
                        //invalid[j][k] = -1;
                        //ninval[j]--;
                        console.log("removing" + i + "from invalid");
                        invalid[j].splice(k, 1);
                    }
                }
                return true;
            }
            else {
                if (invalid[j].includes(i + "") != true) {
                    console.log("invalid" + i);
                    invalid[j].push(i + "");
                    ninval[j]++;
                    return false;
                }
                return false;
            }
        }
        if (type == 'Decimal') {
            console.log(q[i][columns[j]]);
            var x = +q[i][columns[j]];
            if (!isNaN(q[i][columns[j]])) {
                nval[j]++;
                for (var k in invalid[j]) {
                    if (invalid[j][k] == i + "") {
//                        invalid[j][k] = -1;
//                        ninval[j]--;
                        console.log("removing" + i + "from invalid");
                        invalid[j].splice(k, 1);
                    }
                }
                return true;
            }
            else {
                if (invalid[j].includes(i + "") != true) {
                    console.log("invalid" + i);
                    invalid[j].push(i + "");
                    ninval[j]++;
                    return false;
                }
                return false;
            }
        }
        if (type == 'Boolean') {
            if (!(q[i][columns[j]] == 'true' || q[i][columns[j]] == 'false' || q[i][columns[j]] == 't' || q[i][columns[j]] == 'f' || q[i][columns[j]] == '0' || q[i][columns[j]] == '1')) {
                if (invalid[j].includes(i + "") != true) {
                    console.log("invalid" + i);
                    invalid[j].push(i + "");
                    ninval[j]++;
                    return false;
                }
                return false;
            }
            else {
                nval[j]++;
                for (var k in invalid[j]) {
                    if (invalid[j][k] == i + "") {
//                        invalid[j][k] = -1;
//                        ninval[j]--;
                        console.log("removing" + i + "from invalid");
                        invalid[j].splice(k, 1);
                    }
                }
                return true;
            }
        }

        if (type == 'Gender') {
            if (!(q[i][columns[j]] == 'Male' || q[i][columns[j]] == 'Female')) {
                if (invalid[j].includes(i + "") != true) {
                    console.log("invalid" + i + "");
                    invalid[j].push(i + "");
                    ninval[j]++;
                    return false;
                }
                return false;
            }
            else {
                nval[j]++;
                for (var k in invalid[j]) {
                    if (invalid[j][k] == i + "") {
//                        invalid[j][k] = -1;
//                        ninval[j]--;
                        console.log("removing" + i + "from invalid");
                        invalid[j].splice(k, 1);
                    }
                }
                return true;
            }
        }

        if (type == 'Date') {
            var m = moment(q[i][columns[j]], ["MM-DD-YYYY", "MM/DD/YYYY", "M/D/YY", "M/DD/YYYY", "M/D/YYYY", "M-D-YY", "M-DD-YYYY"], true);
            if (m.isValid()) {
                q[i][columns[j]] = moment(q[i][columns[j]]).format("MM/DD/YYYY");
                nval[j]++;
                for (var k in invalid[j]) {
                    if (invalid[j][k] == i + "") {
//                        invalid[j][k] = -1;
//                        ninval[j]--;
                        console.log("removing" + i + "from invalid");
                        invalid[j].splice(k, 1);
                    }
                }
                return true;
            }
            else {
                if (invalid[j].includes(i + "") != true) {
                    console.log("invalid" + i);
                    invalid[j].push(i + "");
                    ninval[j]++;
                    return false;
                }
                return false;
            }
        }
//        console.log(invalid);
//        console.log(ninval);
        return true;
    }

    function dtconversion(i, j) {

        if (datatype_eachcol[j] == 'Decimal' || datatype_eachcol[j] == 'Integer') {
            if (ismissing(i, j) == false && isvalid(i, j) == true)
                q[i][columns[j]] = +q[i][columns[j]];
        }
        else if (datatype_eachcol[j] == 'Date' && ismissing(i, j) == false && isvalid(i, j) == true) {
            var m = moment(q[i][columns[j]], ["MM-DD-YYYY", "MM/DD/YYYY", "M/D/YY", "M/DD/YYYY", "M/D/YYYY"], true);
            if (m.isValid()) {
                q[i][columns[j]] = moment(q[i][columns[j]]).format("MM/DD/YYYY");
                console.log(q[i][columns[j]]);
                nval[j]++;
            }
        }
        else {
            if (ismissing(i, j) == false)
                isvalid(i, j);
        }
    }

    var fprop = JSON.parse(localStorage["fprop"]);
    $('#fname').text(fprop[0]["fname"]);
    $('#fsize').text(fprop[0]["fsize"] + " bytes");
    $('#ncol').text(columns.length + "-columns");
    $('#nrow').text(q.length + " rows");
    //console.log(columns);
    var x = "<thead><tr id='columnrow'>";
    for (var col in columns) {
        x += "<th id='" + columns[col] + "-name'>" + '<form action="javascript:void(0);" method="post" style="float:left; /*display: inline-block;*/">' +
                '<select name="datatype" id="' + columns[col] + '-changedatatype">' +
                '<option value=""></option>' +
                '<option value="String">String</option>' +
                '<option value="Integer">Integer</option>' +
                '<option value="Decimal">Decimal</option>' +
                '<option value="Boolean">Boolean</option>' +
                '<option value="Date">Date</option>' +
                '<option value="Gender">Gender</option>' +
                '</select> ' +
                '<input type="submit" style="display: none" value="Submit">' +
                '</form>' + "   " + columns[col] + "</th>";
    }
    x += "</tr></thead>";
    //console.log(x);
    $('#table').append(x);
    d3.select('body').selectAll('#table').append('tr').attr('id', 'graphrow');
    for (var j in columns) {
        console.log("poi");
        d3.select('body').selectAll('#table').selectAll('#graphrow').append('td').attr('id', 'graph-col-' + columns[j]);
    }

    var y;
    for (var i in q) {
//console.log(i);
//console.log(q[i]);
        d3.select('body').selectAll('#table').append('tr').attr("id", "row-" + i);
        for (var j in columns) {
//console.log(q[i][columns[j]]);
            if (q[i][columns[j]] == "") {
                // q[i][columns[j]] = 'missmiss';
                var w = d3.select('body')
                        .selectAll('#table')
                        .selectAll('#row-' + i)
                        .append('td')
                        .attr("id", 'row-' + i + '-col-' + columns[j]);
                w.append('strong')
                        .style('color', 'red')
                        .append('p')
                        .text(function () {
                            //console.log(columns[j]);

                            return 'MISSING VALUES';
                        });
                var e = w.append('form')
                        .attr('method', 'post')
                        .attr('action', 'javascript:void(0);')
                        .style("float", "left")
                        .append('select')
                        .attr('id', 'row-' + i + '-col-' + columns[j] + '-fillval')
                        .on('change', function () {
                            changetable1(this.id, this.value);
                            w.selectAll('form').style("display", "none");
                            changetable3(this.id);
                        });
                e.append('option')
                        .attr('value', 'select datatype first').text('select datatype first');



            }
            else {
                d3.select('body').selectAll('#table').selectAll('#row-' + i).append('td').attr('id', 'row-' + i + '-col-' + columns[j]).append('p').text(function () {
                    return q[i][columns[j]];

                });
                d3.select('body').selectAll('#table').selectAll('#row-' + i).selectAll('#row-' + i + '-col-' + columns[j]).append('button')
                        .attr('id', 'row-' + i + '-col-' + columns[j] + '-edit')
                        .attr('type', 'button')
                        .on('click', function () {
                            console.log(this.id);
                            id = this.id.replace('-edit', '');
                            var t = d3.select('body').selectAll('#table').selectAll('#' + id);
                            //console.log(id.split("-"));
                            y = id.split("-");

                            //t.text('');
                            t.append('form')
                                    .attr('method', 'post')
                                    .attr('action', 'javascript:void(0);')
                                    .append('input').on('change', function () {
                                t.selectAll('p').text('');
                                t.selectAll('p').text(this.value);
                                q[y[1]][y[3]] = this.value;
                                for (var j in columns) {
                                    if (columns[j] == y[3]) {
//                                        nmiss[j]--;
//                                        for (var k in missing[j]) {
//                                            if (missing[j][k] == y[1]) {
////                                                missing[j][k] = -1;
//                                                    missing[j].splice(k,1);
//                                            }
//                                        }
                                        console.log("editedit");
                                        dtconversion(y[1], j);

                                        uniqueval(j);
                                        graphcol(j);
                                        console.log("missing:");
                                        console.log(missing[j]);
                                        console.log("invalid:");
                                        console.log(invalid[j]);
                                        console.log("unique:");
                                        console.log(unique[j]);
                                        t.selectAll('form').style("display", "none");
                                    }
                                }
                            });
                        })
                        .text('Edit');
                // y+="<td id='row-"+(i)+"--col"+columns[j]+"'>"+q[i][columns[j]]+"</td>";
            }
        }
//        y+="</tr>";
//        $('#table').append(y);
    }
    function graphcol(j) {
        //var data=[[0, q.length-(missing[j].length+invalid[j].length)], []];

        var xx = d3.select("body").selectAll('#graphrow').selectAll('#graph-col-' + columns[j]);
        //console.log(xx);
        xx.text('');
        var svg = xx.append('div')
                .attr('id', 'graph-col-' + columns[j] + '-mvi')
                .style('border', 'solid 1px blue')
                .style('height', '')
                .append('svg')
                //.attr("width", "100%")
                //.attr("height", "100%")
                .style("border", "solid 2px red")
                .attr('height', '5');
        //.style('padding','2%')
        console.log(svg.style('width'));
        var x = d3.scaleLinear().domain([0, q.length]).range([0, svg.style('width')]);
        //xx.appeng('g');
        var svg1 = svg.append('g');
        svg1.append('rect')
                .attr('width', function () {
                    console.log(x(q.length - (missing[j].length + invalid[j].length)));
                    return x(q.length - (missing[j].length + invalid[j].length));
                })
                .attr('height', '5')
                .style('fill', 'rgb(0,0,0)')
                .style('stroke', 'rgb(0,0,0)')
                .style('stroke-width', '3')
                .append('title').text('Valid values');
        svg1.append('rect')
                .attr('width', function () {
                    console.log(x(missing[j].length));
                    return x(missing[j].length);
                })
                .attr('x', function () {
                    return x(q.length - (missing[j].length + invalid[j].length));
                })
                .attr('height', '5')
                .style('fill', 'rgb(0,0,255)')
                .style('stroke', 'rgb(0,23,123)')
                .append('title').text('Missing values');
        svg1.append('rect')
                .attr('width', function () {
                    console.log(x(invalid[j].length));
                    return x(invalid[j].length);
                })
                .attr('x', function () {
                    return x(q.length - (invalid[j].length));
                })
                .attr('height', '5')
                .style('fill', 'rgb(0,255,56)')
                .style('stroke', 'rgb(0,255,56)')
                .append('title').text('Invalid values');
        var svg2 = xx.append('div')
                .attr('id', 'graph-col-' + columns[j] + '-unique')
                .style('border', 'solid 1px blue')
                //.style('height', '')
                .append('svg')
                //.attr("width", "100%")
                //.attr("height", "100%")
                .style("border", "solid 2px red")
                .attr('height', '50');
        //console.log(unique[j].keys());
        var x2 = d3.scaleBand().domain(unique[j].keys()).range([0, 300]).padding(0.1);
        console.log(x2.bandwidth());
        var y2 = d3.scaleLinear().domain([0, q.length]).range([50, 0]);
        console.log(svg2.style('height'));
        console.log(svg2.style('width'));
        console.log(y2(15));
        svg2.append('g')
                //.attr('transform', 'translate(0,100)')
                .selectAll('rect').data(unique[j].keys()).enter().append('rect')
                .attr('x', function (d) {
                    console.log(d);
                    console.log(x2(d));
                    return x2(d);
                })
                .attr('y', function (d) {
                    console.log(unique[j].get(d).length);
                    console.log(y2(unique[j].get(d).length));
                    console.log(50 - y2(unique[j].get(d).length));
                    return (y2(unique[j].get(d).length));
                })
                .attr('width', x2.bandwidth())
                .attr('height', function (d) {
                    if (d != 'undefined')
                        return 50 - y2(unique[j].get(d).length);
                    else {
                        return 0;
                    }
                })
                .append('title').text(function (d) {
            return d;
        });
    }
//var--col=0;
//console.log(columns);

    function changetable3(id) {
        id = id.replace('-fillval', '');
        d3.selectAll('#' + id).append('button')
                .attr('id', 'row-' + i + '-col-' + columns[j] + '-edit')
                .attr('type', 'button')
                .on('click', function () {
                    //console.log(id);
                    var t = d3.select('body').selectAll('#table').selectAll('#' + id);
                    //t.text('');
                    y = id.split("-");
                    t.append('form')
                            .attr('method', 'post')
                            .attr('action', 'javascript:void(0);')
                            .append('input').on('change', function () {
                        t.selectAll('p').text('');
                        t.selectAll('p').text(this.value);
                        q[y[1]][y[3]] = this.value;
                        for (var j in columns) {
                            if (columns[j] == y[3]) {
                                //nmiss[j]--;
//                                for (var k in missing[j]) {
//                                    if (missing[j][k] == y[1]) {
////                                        missing[j][k] = -1;
////                                        nmiss[j]--;
//                                            missing[j].splice(k,1);
//                                    }
//                                }
                                console.log("editedit");
                                dtconversion(y[1], j);

                                uniqueval(j);
                                graphcol(j);
                                console.log("missing:");
                                console.log(missing[j]);
                                console.log("invalid:");
                                console.log(invalid[j]);
                                console.log("unique:");
                                console.log(unique[j]);
                                t.selectAll('form').style("display", "none");
                            }
                        }
                    });
                })
                .text('Edit');
    }
    function changetable1(id, option) {
        id = id.replace('-fillval', '');
        //console.log(id);
        if (option == '') {

        }
        if (option == 'change the text') {
            console.log('jhqwe');
            var t = d3.select('body').selectAll('#table').selectAll('#' + id);
            //t.text('');
            y = id.split("-");
            t.append('form')
                    .attr('method', 'post')
                    .attr('action', 'javascript:void(0);')
                    .append('input').on('change', function () {
                t.selectAll('p').text('');
                t.selectAll('p').text(this.value);
                q[y[1]][y[3]] = this.value;
                for (var j in columns) {
                    if (columns[j] == y[3]) {
//                        nmiss[j]--;
//                        for (var k in missing[j]) {
//                            if (missing[j][k] == y[1]) {
//                                //missing[j][k] = -1;
//                                missing[j].splice(k,1);
//                            }
//                        }
                        dtconversion(y[1], j);

                        uniqueval(j);
                        graphcol(j);
                        console.log("missing:");
                        console.log(missing[j]);
                        console.log("invalid:");
                        console.log(invalid[j]);
                        console.log("unique:");
                        console.log(unique[j]);
                    }
                }
            });
        }
        if (option == 'N/A') {
            console.log('jhqwe');
            y = id.split("-");
            var t = d3.select('body').selectAll('#table').selectAll('#' + id);
            t.selectAll('p').text('N/A');
            q[y[1]][y[3]] = 'N/A';
            for (var j in columns) {
                if (columns[j] == y[3]) {
//                    nmiss[j]--;
//                    for (var k in missing[j]) {
//                        if (missing[j][k] == y[1]) {
//                           // missing[j][k] = -1;
//                           missing[j].splice(k,1);
//                        }
//                    }
                    dtconversion(y[1], j);

                    uniqueval(j);
                    graphcol(j);
                    console.log("missing:");
                    console.log(missing[j]);
                    console.log("invalid:");
                    console.log(invalid[j]);
                    console.log("unique:");
                    console.log(unique[j]);
                }
            }
        }
        if (option == 'change the value') {
            console.log('jhqwe');
            y = id.split("-");
            var t = d3.select('body').selectAll('#table').selectAll('#' + id);
            t.append('form')
                    .attr('method', 'post')
                    .attr('action', 'javascript:void(0);')
                    .append('input').on('change', function () {
                t.selectAll('p').text('');
                t.selectAll('p').text(this.value);
                q[y[1]][y[3]] = this.value;
                for (var j in columns) {
                    if (columns[j] == y[3]) {
//                        nmiss[j]--;
//                        for (var k in missing[j]) {
//                            if (missing[j][k] == y[1]) {
//                                //missing[j][k] = -1;
//                                missing[j].splice(k,1);
//                            }
//                        }
                        dtconversion(y[1], j);

                        uniqueval(j);
                        graphcol(j);
                        console.log("missing:");
                        console.log(missing[j]);
                        console.log("invalid:");
                        console.log(invalid[j]);
                        console.log("unique:");
                        console.log(unique[j]);
                        t.selectAll('form').style("display", "none");
                    }
                }
            });
        }
        if (option == '0') {
            console.log('jhqwe');
            y = id.split("-");
            var t = d3.select('body').selectAll('#table').selectAll('#' + id);
            t.selectAll('p').text('0');
            q[y[1]][y[3]] = '0';
            for (var j in columns) {
                if (columns[j] == y[3]) {
                    nmiss[j]--;
//                    for (var k in missing[j]) {
//                        if (missing[j][k] == y[1]) {
//                            //missing[j][k] = -1;
//                            missing[j].splice(k,1);
//                        }
//                    }

                    dtconversion(y[1], j);

                    uniqueval(j);
                    graphcol(j);
                    console.log("missing:");
                    console.log(missing[j]);
                    console.log("invalid:");
                    console.log(invalid[j]);
                    console.log("unique:");
                    console.log(unique[j]);
                }
            }
        }

        if (option == 'true') {
            console.log('jhqwe');
            y = id.split("-");
            var t = d3.select('body').selectAll('#table').selectAll('#' + id);
            t.selectAll('p').text('true');
            q[y[1]][y[3]] = 'true';
            for (var j in columns) {
                if (columns[j] == y[3]) {
//                    nmiss[j]--;
//                    for (var k in missing[j]) {
//                        if (missing[j][k] == y[1]) {
//                            //missing[j][k] = -1;
//                            missing[j].splice(k,1);
//                        }
//                    }
                    dtconversion(y[1], j);

                    uniqueval(j);
                    graphcol(j);
                    console.log("missing:");
                    console.log(missing[j]);
                    console.log("invalid:");
                    console.log(invalid[j]);
                    console.log("unique:");
                    console.log(unique[j]);
                }
            }
        }
        if (option == 'false') {
            console.log('jhqwe');
            y = id.split("-");
            var t = d3.select('body').selectAll('#table').selectAll('#' + id);
            t.selectAll('p').text('0');
            q[y[1]][y[3]] = 'false';
            for (var j in columns) {
                if (columns[j] == y[3]) {
//                    nmiss[j]--;
//                    for (var k in missing[j]) {
//                        if (missing[j][k] == y[1]) {
//                            //missing[j][k] = -1;
//                            missing[j].splice(k,1);
//                        }
//                    }
                    dtconversion(y[1], j);

                    uniqueval(j);
                    graphcol(j);
                    console.log("missing:");
                    console.log(missing[j]);
                    console.log("invalid:");
                    console.log(invalid[j]);
                    console.log("unique:");
                    console.log(unique[j]);
                }
            }
        }
        if (option == 't') {
            console.log('jhqwe');
            y = id.split("-");
            var t = d3.select('body').selectAll('#table').selectAll('#' + id);
            t.selectAll('p').text('t');
            q[y[1]][y[3]] = 't';
            for (var j in columns) {
                if (columns[j] == y[3]) {
//                    nmiss[j]--;
//                    for (var k in missing[j]) {
//                        if (missing[j][k] == y[1]) {
//                            //missing[j][k] = -1;
//                            missing[j].splice(k,1);
//                        }
//                    }
                    dtconversion(y[1], j);

                    uniqueval(j);
                    graphcol(j);
                    console.log("missing:");
                    console.log(missing[j]);
                    console.log("invalid:");
                    console.lonmiss[j]--;
//                    for (var k in missing[j]) {
//                        if (missing[j][k] == y[1]) {
//                            //missing[j][k] = -1;
//                            missing[j].splice(k,1);
//                        }
//                    }g(invalid[j]);
                    console.log("unique:");
                    console.log(unique[j]);
                }
            }
        }
        if (option == 'f') {
            console.log('jhqwe');
            y = id.split("-");
            var t = d3.select('body').selectAll('#table').selectAll('#' + id);
            t.selectAll('p').text('f');
            q[y[1]][y[3]] = 'f';
            for (var j in columns) {
                if (columns[j] == y[3]) {
//                    nmiss[j]--;
//                    for (var k in missing[j]) {
//                        if (missing[j][k] == y[1]) {
//                            //missing[j][k] = -1;
//                            missing[j].splice(k,1);
//                        }
//                    }
                    dtconversion(y[1], j);

                    uniqueval(j);
                    graphcol(j);
                    console.log("missing:");
                    console.log(missing[j]);
                    console.log("invalid:");
                    console.log(invalid[j]);
                    console.log("unique:");
                    console.log(unique[j]);
                }
            }
        }
        if (option == '1') {
            console.log('jhqwe');
            y = id.split("-");
            var t = d3.select('body').selectAll('#table').selectAll('#' + id);
            t.selectAll('p').text('1');
            q[y[1]][y[3]] = '1';
            for (var j in columns) {
                if (columns[j] == y[3]) {
//                    nmiss[j]--;
//                    for (var k in missing[j]) {
//                        if (missing[j][k] == y[1]) {
//                            //missing[j][k] = -1;
//                            missing[j].splice(k,1);
//                        }
//                    }
                    dtconversion(y[1], j);

                    uniqueval(j);
                    graphcol(j);
                    console.log("missing:");
                    console.log(missing[j]);
                    console.log("invalid:");
                    console.log(invalid[j]);
                    console.log("unique:");
                    console.log(unique[j]);
                }
            }
        }
        if (option == 'enter date') {
            console.log('jhqwe');
            y = id.split("-");
            var t = d3.select('body').selectAll('#table').selectAll('#' + id);
            //t.text('');
            y = id.split("-");
            t.append('form')
                    .attr('method', 'post')
                    .attr('action', 'javascript:void(0);')
                    .append('input').on('change', function () {
                t.selectAll('p').text('');
                t.selectAll('p').text(this.value);
                q[y[1]][y[3]] = this.value;
                for (var j in columns) {
                    if (columns[j] == y[3]) {
                        nmiss[j]--;
//                        for (var k in missing[j]) {
//                            if (missing[j][k] == y[1]) {
//                                //missing[j][k] = -1;
//                                missing[j].splice(k,1);
//                            }
//                        }
                        dtconversion(y[1], j);

                        uniqueval(j);
                        graphcol(j);
                        console.log("missing:");
                        console.log(missing[j]);
                        console.log("invalid:");
                        console.log(invalid[j]);
                        console.log("unique:");
                        console.log(unique[j]);
                        t.selectAll("form").style('display', 'none');
                    }
                }
            });
        }
        if (option == 'Male') {
            y = id.split("-");
            console.log('jhqwe');
            var t = d3.select('body').selectAll('#table').selectAll('#' + id);
            t.selectAll('p').text('Male');
            q[y[1]][y[3]] = 'Male';
            for (var j in columns) {
                if (columns[j] == y[3]) {
//                    nmiss[j]--;
//                    for (var k in missing[j]) {
//                        if (missing[j][k] == y[1]) {
//                            //missing[j][k] = -1;
//                            missing[j].splice(k,1);
//                        }
//                    }
                    dtconversion(y[1], j);

                    uniqueval(j);
                    graphcol(j);
                    console.log("missing:");
                    console.log(missing[j]);
                    console.log("invalid:");
                    console.log(invalid[j]);
                    console.log("unique:");
                    console.log(unique[j]);
                }
            }
        }
        if (option == 'Female') {
            console.log('jhqwe');
            y = id.split("-");
            var t = d3.select('body').selectAll('#table').selectAll('#' + id);
            t.selectAll('p').text('Female');
            q[y[1]][y[3]] = 'Female';
            for (var j in columns) {
                if (columns[j] == y[3]) {
//                    nmiss[j]--;
//                    for (var k in missing[j]) {
//                        if (missing[j][k] == y[1]) {
//                            //missing[j][k] = -1;
//                            missing[j].splice(k,1);
//                        }
//                    }
                    dtconversion(y[1], j);

                    uniqueval(j);
                    graphcol(j);
                    console.log("missing:");
                    console.log(missing[j]);
                    console.log("invalid:");
                    console.log(invalid[j]);
                    console.log("unique:");
                    console.log(unique[j]);
                }
            }
        }
    }
    function changetable(id, datatype) {
//console.log(typeof id);
        id = id.replace('-changedatatype', '');
        y = id.split('-');
        console.log(y[0]);
        var u;
        for (var j in columns) {
            missing[j] = [];
        }
        for (var j in columns) {
            invalid[j] = [];
        }
        for (var j in columns) {
            if (columns[j] == y[0]) {
                u = j;
                datatype_eachcol[j] = datatype;
                console.log("kjhgh" + datatype_eachcol[j]);
            }
        }


        for (var i in q) {
            dtconversion(i, u);
        }


        uniqueval(u);
        console.log("missing:");
        console.log(missing[u]);
        console.log("invalid:");
        console.log(invalid[u]);
        console.log("unique:");
        console.log(unique[u]);
        graphcol(u);

        //console.log(y);
        //console.log("sd"+id+" "+datatype);
        if (datatype == 'String') {
            /* missing values */
//console.log("sFDf");
            for (var i in  q) {
                if (q[i][id] == "") {//     
                    var r = d3.select('body').selectAll('#table').selectAll('#row-' + i + '-col-' + id + '-fillval');
                    r.selectAll('option').remove();
                    r.append('option')
                            .attr('value', '')
                            .text('');
                    r.append('option')
                            .attr('value', 'change the text')
                            .text('change the text');
                    r.append('option')
                            .attr('value', 'N/A')
                            .text('N/A');
                }
            }
        }
        if (datatype == 'Integer') {
            /* missing values */
//console.log("sFDf");
            for (var i in  q) {
                if (q[i][id] == "") {//     
                    var r = d3.select('body').selectAll('#table').selectAll('#row-' + i + '-col-' + id + '-fillval');
                    r.selectAll('option').remove();
                    r.append('option')
                            .attr('value', '')
                            .text('');
                    r.append('option')
                            .attr('value', 'change the value')
                            .text('change the value');
                    r.append('option')
                            .attr('value', '0')
                            .text(function () {
                                return 0;
                            });
                }
            }
        }

        if (datatype == 'Decimal') {
            /* missing values */
//console.log("sFDf");
            for (var i in  q) {
                if (q[i][id] == "") {//     
                    var r = d3.select('body').selectAll('#table').selectAll('#row-' + i + '-col-' + id + '-fillval');
                    r.selectAll('option').remove();
                    r.append('option')
                            .attr('value', '')
                            .text('');
                    r.append('option')
                            .attr('value', 'change the value')
                            .text('change the value');
                    r.append('option')
                            .attr('value', '0')
                            .text(function () {
                                return 0;
                            });
                }
            }
        }

        if (datatype == 'Boolean') {
            /* missing values */
//console.log("sFDf");
            for (var i in  q) {
                if (q[i][id] == "") {//     
                    var r = d3.select('body').selectAll('#table').selectAll('#row-' + i + '-col-' + id + '-fillval');
                    r.selectAll('option').remove();
                    r.append('option')
                            .attr('value', '')
                            .text('');
                    r.append('option')
                            .attr('value', 'true')
                            .text('true');
                    r.append('option')
                            .attr('value', 'false')
                            .text(function () {
                                return 'false';
                            });
                    r.append('option')
                            .attr('value', 't')
                            .text(function () {
                                return 't';
                            });
                    r.append('option')
                            .attr('value', 'f')
                            .text(function () {
                                return 'f';
                            });
                    r.append('option')
                            .attr('value', '0')
                            .text(function () {
                                return '0';
                            });
                    r.append('option')
                            .attr('value', '1')
                            .text(function () {
                                return '1';
                            });
                }
            }
        }

        if (datatype == 'Date') {
            /* missing values */
//console.log("sFDf");
            for (var i in  q) {
                if (q[i][id] == "") {//     
                    var r = d3.select('body').selectAll('#table').selectAll('#row-' + i + '-col-' + id + '-fillval');
                    r.selectAll('option').remove();
                    r.append('option')
                            .attr('value', '')
                            .text('');
                    r.append('option')
                            .attr('value', 'enter date')
                            .text('enter date');
//                    r.append('option')
//                            .attr('value', 'N/A')
//                            .text(function () {
//                                return 'N/A';
//                            });
                }
            }
        }

        if (datatype == 'Gender') {
            /* missing values */
//console.log("sFDf");
            for (var i in  q) {
                if (q[i][id] == "") {//     
                    var r = d3.select('body').selectAll('#table').selectAll('#row-' + i + '-col-' + id + '-fillval');
                    r.selectAll('option').remove();
                    r.append('option')
                            .attr('value', '')
                            .text('');
                    r.append('option')
                            .attr('value', 'Male')
                            .text('Male');
                    r.append('option')
                            .attr('value', 'FeMale')
                            .text(function () {
                                return 'Female';
                            });
                }
            }
        }
    }

    for (var ccol in columns) {
//console.log(ccol);
//console.log(columns[ccol]);
        $('#' + columns[ccol] + "-changedatatype").on("change", function () {
//console.log(columns[ccol]);
//            console.log(this.value);
//            console.log(this.id);
            changetable(this.id, this.value);

        });
    }

    d3.select('body').selectAll('#graphoptions').selectAll('#bargraphbutton')
            .on('click', function () {
                var xdomain;
                var ydomain;
                var yfunction;
                function bargraph_xaxis_domain(columnname) {
                    console.log(columnname);
                    for (var j in columns) {
                        if (columns[j] == columnname) {
                            uniqueval(j);
                            console.log(unique[j]);
                            xdomain = unique[j].keys();
                        }
                    }
                }

                function bargraph_yaxis_domain(columnname) {
                    for (var j in columns) {
                        if (columns[j] == columnname) {
                            if (yfunction == 'count') {
                                ydomain = [];
                                ydomain.push(d3.min(unique[j], function (d) {
                                    return unique[j].get(d).length;
                                }));
                                ydomain.push(d3.max(unique[j], function (d) {
                                    return unique[j].get(d).length;
                                }));
                            }
                            else {
                                ydomain = [d3.min(q, function (d) {
                                        return d[columnname];
                                    }), d3.max(q, function (d) {
                                        return d[columnname];
                                    })];
                            }
                        }
                    }
                }

                function drawgraph(sw, sh) {
                    d3.select('body').append('div')
                            .attr('id', 'bargraph')
                            .style('overflow-x', 'scroll');

                    var margin = {top: 5, right: 0, bottom: 5, left: 0};
                    var width = 1000;
                    var height = 300;
                    //var width = 1300, height = 600;
                    var svg = d3.select("body").selectAll("#bargraph").append("svg")
                            .attr("width", sw)
                            .attr("height", sh)
                            .append("svg")
                            .style("border", "solid 2px lime");

                    var yScale = d3.scaleLinear()
                            .domain(ydomain)
                            .rangeRound([sh - margin.top - margin.bottom - 10, 0]);


                    var xScale = d3.scaleBand()
                            .range([0, (sw - margin.left - margin.right - 50)])
                            .domain(xdomain)
                            .padding(0.1);
                    console.log(xScale.bandwidth());

                    var xAxis = d3.axisBottom()
                            .scale(xScale);

                    var yAxis = d3.axisLeft()
                            .scale(yScale);
                    console.log(yAxis);

                    svg.append("g")
                            .attr("transform", "translate(" + (margin.left + 50) + "," + (margin.top) + ")")
                            .selectAll(".bar")
                            .data(q)
                            .enter()
                            .append("rect")
                            .attr("class", "bar")
                            .attr("x", function (d) {
                                return xScale(d[dimensions["x"]]);
                            })
                            .attr("y", function (d) {
                                //console.log(d);
                                return yScale(d[dimensions["y"]]);
                            })
                            .attr("height", function (d) {
                                return sh - margin.top - margin.bottom - yScale(d[dimensions['y']]) - 5;
                            })
                            .attr("width", xScale.bandwidth());

                    svg.append("g")
                            .attr("transform", "translate(" + (margin.left + 50) + "," + margin.top + ")")
                            .call(yAxis);

                    svg.append("g")
                            .attr("transform", "translate(" + (margin.left + 50) + "," + (height - margin.bottom - 10) + ")")
                            .call(xAxis);

//                    d3.select("body").selectAll("#zoom").style("display", "inline-block");
//                    d3.select("body").selectAll("#zoomy").style("display", "inline-block");
                }

                d3.select('body').selectAll('#x').style('display', 'inline-block');
                d3.select('body').selectAll('#y').style('display', 'inline-block');

                var psw = 1000, psh = 300;
                var zoomdivx = d3.select('body')
                        .append('div')
                        .attr('id', 'zoom')
                        .style('border', 'solid 1px black')
                        .style('width', 'auto')
                        .style('height', 'auto')
                        .style('display', 'block')
                        .text('Zoom-x');
                zoomdivx.append('br');
                zoomdivx.append('button').attr('class', 'button').attr('id', 'zo').attr('type', 'button').text('+');
                zoomdivx.append('button').attr('class', 'button').attr('id', 'zi').attr('type', 'button').text('-');


                var zoomdivy = d3.select('body')
                        .append('div')
                        .attr('id', 'zoomy')
                        .style('border', 'solid 1px black')
                        .style('width', 'auto')
                        .style('height', 'auto')
                        .style('display', 'block')
                        .text('Zoom-y');
                zoomdivy.append('br');
                zoomdivy.append('button').attr('class', 'button').attr('id', 'zoy').attr('type', 'button').text('+');
                zoomdivy.append('button').attr('class', 'button').attr('id', 'ziy').attr('type', 'button').text('-');

                var dimensions = {x: "", y: ""};

                d3.select("body").selectAll("#x").selectAll('a')
                        .data(columns)
                        .enter()
                        .append("a")
                        .style("background-color", "aqua")
                        .style("color", "blue")
                        .style("display", "inline-block")
                        .style("padding", "5px 5px")
                        .style("text-decoration", "none")
                        .style("border", "solid 1px black")
                        .attr("href", "javascript:void(0)")
                        .on("mouseover", function (d, i) {
                            d3.select(this).style("color", "aqua").style("background-color", "blue");
                        })
                        .on("mouseout", function (d, i) {
                            d3.select(this).style("color", "blue").style("background-color", "aqua");
                        })
                        .on("click", function (d, i) {
                            var text = d3.select(this).text().split(" ");
                            dimensions['x'] = text[0];
                            console.log(dimensions);
                            bargraph_xaxis_domain(text[0]);
                        })
                        .text(function (d) {
                            return d;
                        });

                d3.select("body").selectAll("#y")
                        .data(columns)
                        .enter()
                        .append("a")
                        .style("background-color", "aqua")
                        .style("color", "blue")
                        .style("display", "inline-block")
                        .style("padding", "5px 20px")
                        .style("text-decoration", "none")
                        .style("border", "solid 1px black")
                        .attr("href", "javascript:void(0)")
                        .on("mouseover", function (d, i) {
                            d3.select(this).style("color", "aqua").style("background-color", "blue");
                        })
                        .on("mouseout", function (d, i) {
                            d3.select(this).style("color", "blue").style("background-color", "aqua");
                        })
                        .on("click", function (d, i) {
                            var text = d3.select(this).text().split(" ");
                            dimensions["y"] = text[0];
                            console.log(dimensions);
                            //properties(text[0]);
                            bargraph_yaxis_domain(text[0]);
                            d3.select('body').append('button')
                                    .attr('id', 'drawbgraphbutton')
                                    .attr('type', 'button')
                                    .on('click', drawgraph(1000, 300))
                                    .text('Draw graph');

                            //drawgraph(1300, 600);
                        })
                        .text(function (d) {
                            return d;
                        });


                $("#zo").on("click", function zoomout() {
                    $("#bargraph").empty();
                    drawgraph(psw * 2, psh);
                    psw *= 2;
                });

                $("#zi").on("click", function zoomout() {
                    $("#bargraph").empty();
                    drawgraph(psw / 2, psh);
                    psw /= 2;
                });

                $("#zoy").on("click", function zoomyout() {
                    var x = (psh * 2) + "px";
                    $("#bargraph").empty().css("height", x);
                    drawgraph(psw, psh * 2);
                    psh *= 2;
                });

                $("#ziy").on("click", function zoomyin() {
                    var x = (psh / 2) + "px";
                    $("#bargraph").empty().css("height", x);
                    drawgraph(psw, psh / 2);
                    psh /= 2;
                });
            });



    d3.select('body').selectAll('#graphoptions').selectAll('#piechartbutton')
            .on('click', function () {

                var width = 1300,
                        height = 350,
                        radius = Math.min(width, height) / 2;

                var dimensions = {x: "", y: ""};

                function drawpie() {
                    
                    d3.select('body').append('div')
                            .attr('id', 'pie')
                            .style('overflow-x', 'scroll');
                    var data = d3.nest().key(function (d) {
                        return d[dimensions["x"]];
                    }).rollup(function (leaves) {
                        return d3.sum(leaves, function (d) {
                            return +d[dimensions["y"]];
                        })
                    }).entries(q);
                    console.log(data);
                    var color = d3.scaleOrdinal(d3.schemeCategory20);

                    var arc = d3.arc()
                            .outerRadius(radius - 10)
                            .innerRadius(0);

                    var labelArc = d3.arc()
                            .outerRadius(radius - 40)
                            .innerRadius(radius - 40);

                    var pie = d3.pie()
                            .sort(null)
                            .value(function (d) {
                                return d.value;
                            });

                    var svg = d3.select("body").selectAll("#pie").append("svg")
                            .attr("width", width)
                            .attr("height", height)
                            .style("border", "solid 2px red")
                            .append("g")
                            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                    var g = svg.selectAll(".arc")
                            .data(pie(data))
                            .enter().append("g")
                            .attr("class", "arc");

                    g.append("path")
                            .attr("d", arc)
                            .style("fill", function (d) {
                                return color(d.value);
                            });

                    g.append("text")
                            .attr("transform", function (d) {
                                return "translate(" + labelArc.centroid(d) + ")";
                            })
                            .attr("dy", ".35em")
                            .text(function (d) {
                                console.log(d);
                                console.log(d.key);
                                return d.data.key + "\n" + d.data.value;
                            });
                }

                d3.select('body').selectAll('#xp').style('display', 'inline-block');
                d3.select('body').selectAll('#yp').style('display', 'inline-block');

                
                d3.select("body").selectAll("#xp").selectAll('a')
                        .data(columns)
                        .enter()
                        .append("a")
                        .style("background-color", "aqua")
                        .style("color", "blue")
                        .style("display", "inline-block")
                        .style("padding", "5px 5px")
                        .style("text-decoration", "none")
                        .style("border", "solid 1px black")
                        .attr("href", "javascript:void(0)")
                        .on("mouseover", function (d, i) {
                            d3.select(this).style("color", "aqua").style("background-color", "blue");
                        })
                        .on("mouseout", function (d, i) {
                            d3.select(this).style("color", "blue").style("background-color", "aqua");
                        })
                        .on("click", function (d, i) {
                            var text = d3.select(this).text().split(" ");
                            dimensions['x'] = text[0];
                            console.log(dimensions);
                            
                        })
                        .text(function (d) {
                            return d;
                        });

                d3.select("body").selectAll("#yp")
                        .data(columns)
                        .enter()
                        .append("a")
                        .style("background-color", "aqua")
                        .style("color", "blue")
                        .style("display", "inline-block")
                        .style("padding", "5px 20px")
                        .style("text-decoration", "none")
                        .style("border", "solid 1px black")
                        .attr("href", "javascript:void(0)")
                        .on("mouseover", function (d, i) {
                            d3.select(this).style("color", "aqua").style("background-color", "blue");
                        })
                        .on("mouseout", function (d, i) {
                            d3.select(this).style("color", "blue").style("background-color", "aqua");
                        })
                        .on("click", function (d, i) {
                            var text = d3.select(this).text().split(" ");
                            dimensions["y"] = text[0];
                            console.log(dimensions);
                            //properties(text[0]);
                          
                            d3.select('body').append('button')
                                    .attr('id', 'drawbgraphbutton')
                                    .attr('type', 'button')
                                    .on('click', drawpie())
                                    .text('Draw graph');

                        })
                        .text(function (d) {
                            return d;
                        });

            });

//    function operations_according_to_datatype(columnname) {
//        for (var j in columns) {
//            if (columns[j] == columnname) {
//                if (datatype_eachcol[j] == 'String') {
//                    operations[j] = ['value', 'count', 'sort'];
//                }
//            }
//        }
//    }

    /*function propertiess(columnname) {
        for (var j in columns) {
            if (columns[j] == columnname) {
                if (datatype_eachcol[j] == 'String') {
                    properties[j] = {};
                }
                if (datatype_eachcol[j] == 'Integer' || datatype_eachcol[j] == 'Decimal') {
                    var arr1=d3.map(q,function(d){return d[columns[j]];}).keys();
                    properties[j] = {min: d3.min(q, function (d) {
                            return d[columns[j]];
                        }),
                        max: d3.max(q, function (d) {
                            return d[columns[j]];
                        }),
                        mean: d3.mean(q, function (d) {
                            return d[columns[j]];
                        }),
                        median: d3.median(q, function (d) {
                            return d[columns[j]];
                        }),
                        first_quartile: d3.quantile(arr1, 0.25),
                        third_quartile: d3.quantile(arr1, 0.75),
                        second_quartile: d3.median(q, function (d) {
                            return d[columns[j]];
                        })
                    };
                }
                if (datatype_eachcol[j] == 'Date') {

                }
            }
        }
    }*/
});