/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    var q; 

    document.getElementById('menubar').addEventListener('backimg1',function(e){
    e.stopPropagation();
});

    $("#d").change(function() {
        $("#fp").attr("style", "display: block");
        var nBytes = 0;
        var name = "";
        var ff = new FileReader();
        oFiles = document.getElementById("d").files,
                nFiles = oFiles.length;
        var fprop=[],e=0;
        for (var nFileId = 0; nFileId < nFiles; nFileId++) {
            var w={};
            w["fname"]=oFiles[nFileId].name;
            w["fsize"]=oFiles[nFileId].size;
            fprop[e]=w;                        
        }
        console.log(fprop);
        localStorage["fprop"]=JSON.stringify(fprop);
   
        ff.onload = function(e) {
            // var data="bcxyt";
            var text = ff.result;
            //console.log(text);
            q = d3.csvParse(text, function(d) {
                // console.log(typeof d);
                //console.log(Object.keys(d));
                for (var x in d) {
                    //console.log(x+"  "+d[x]);
                    if (d[x] === "")
                        continue;
                    var m = moment(d[x], "DD/MM/YY", true);
                    if (m.isValid()) {
                        d[x] = new Date(m.format("DD/MM/YYYY"));
                        continue;
                    }
                    if (!isNaN(d[x]))
                        d[x] = +d[x];
                }
                return d;
            });
            console.log(q);
            //console.log(typeof localStorage["table"]);
            
            localStorage["columns"]=q.columns;
            console.log(localStorage["columns"]);
            localStorage["table"]=JSON.stringify(q);
            console.log(typeof localStorage["table"]);
//            for(var i=0; i<q.length; i++){
//                localStorage["table"].;
//            }
            console.log(localStorage["table"]);
            //document.getElementById("keys").innerHTML=q.columns;
        };
        ff.readAsText(oFiles[0]);
        document.getElementById("c_s").submit();
    });
    });
    
     function nav1(){
   
          document.getElementById("menubar").style.backgroundColor='transparent';
          document.getElementById("menubar").style.boxShadow='0px 0px 0px transparent';
          document.getElementById("nav1").style.backgroundColor="#1976D2";
          document.getElementById("nav2").style.backgroundColor='transparent';
          document.getElementById("nav3").style.backgroundColor='transparent';
      }
 
 
function nav2(){
          document.getElementById("menubar").style.backgroundColor='#424242';
          document.getElementById("menubar").style.boxShadow='2px 2px 20px black';
          document.getElementById("nav2").style.backgroundColor="#1976D2";
          document.getElementById("nav1").style.backgroundColor='transparent';
          document.getElementById("nav3").style.backgroundColor='transparent';
 }
 
 function nav3(){
          document.getElementById("menubar").style.backgroundColor='#424242';
          document.getElementById("menubar").style.boxShadow='2px 2px 20px black';
          document.getElementById("nav3").style.backgroundColor="#1976D2";
          document.getElementById("nav1").style.backgroundColor='transparent';
          document.getElementById("nav2").style.backgroundColor='transparent';
 }
 
 function overlay(){ 
     
     document.getElementById('overlay').style.display='block';
      
 
       }






/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.height = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}


function submit()
{
   document.getElementById("c_s").submit();
   //This will submit the request to `second.jsp` where you can have your validations

}