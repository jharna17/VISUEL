<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" width="width=device-width,initial-scale=1">
        <title>Visuel</title>

        <link rel="stylesheet" href="sources/index.css">
        <link rel="stylesheet" type="text/css" href="main.css" media="all" />
        

    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js" ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js"></script>
    <script src="https://d3js.org/d3.v4.js"></script>
    <script type="text/javascript" src="sources/index.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

</head>
<body>

    <div id="backimg1" onmouseover="nav1()" onmousewheel="nav1()" >
        <div class="opaque">
            <div id="menubar">
                <ul>
                    <li><a id="nav1" href="#backimg1" onclick="nav1()">HOME</a></li>
                </ul>
                <ul style="float:right">
                    <li ><a id="nav2"  onclick="nav2()" href="#content1">ABOUT</a></li>
                    <li><a id="nav3" onclick="nav3()" href="#content3">CONTACT</a></li>
                </ul>
            </div>
            <h1>VISUEL</h1><br><h2>Cleaning and Displaying data</h2>
            <button class='button' onclick='openNav()'> Upload File</button>
            -

            <div id="myNav" class="overlay">

                <!-- Button to close the overlay navigation -->
                <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>

                <div class="overlay-content">
                    <div class="abc">
                        <form id="c_s" method="POST" action="result.jsp">
                            <select id="cs" name='Choose Sample' onchange="submit()">  
                                <option value='0' selected="selected" disabled="disabled">Choose Sample</option>
                                <option value='1'>Cars</option>
                                <option value='2'>Movies</option>
                                <option value='3'>Music</option>
                                <option value='4'>Cocktails</option>
                            </select>
                        </form>
                    </div>

                    <br><br>

                    <div class="styled">
                        <form id="filesend" method="post"  action="upload" enctype="multipart/form-data">
                            <a1 style="color:#ff6633">

                                <input type="hidden" id="file" name="file" value=""/>
                                <input type="file" id="d" accept=".csv,.xlsx,.xls" name="upload"  value="upload"/> 

                                <label for="d" color="#ff6633">Upload file</a1></label>

                        </form>
                    </div>
                    <div1 style color="white"><b>Note:</b> Upload only csv and excel files.</div1>
                </div>


            </div>

        </div>
    </div>
    <div id="content1" onmousewheel="nav2()" onmouseover="nav2()" >
        <div class='section'>
            <div class='section-head'>About</div>
            <p> Welcome. Cleaning your files have never been so easier. Visual representation of data in form of bar and pie charts also follow.
            </p>
        </div>           

    </div>

    <div class="backimg2" onmouseover="nav2()"  onmousewheel="nav2()"></div>

    <div id="content3" onmouseover="nav3()" onmousewheel="nav3()">


        <div class='section1'>
            <div class='section-head'>Contact</div>
            <li1><i class="material-icons">person</i><span><b> Harsh singh chauhan</b></span></li1><br>
            <br> <li1><i class="material-icons">phone</i><span><b> +91 9717026415</b></span></li1><br>
            <br><li1><i class="material-icons">email</i><span><b> imharsh13596@gmail.com</b></span></li1><br>
            <br><li1><i class="material-icons">location_city</i><span><b> JAYPEE , Noida &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp</b></span></li1><br>
            <br><li1><i class="material-icons">place</i><span><b> 201309</b></span></li1><br>
        </div>

    </div>      




    <div class= "footer" onmouseover="nav3()" onmousewheel="nav3()" >
        <div id='fb' style='float: right'> <img src="resource/image/fb.png"  style='width: 30px; height: 30px'>   </div>
        Disclaimer: Violation of any privacy policy is not done.</div>




</body>
</html>
