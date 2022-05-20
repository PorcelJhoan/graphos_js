var container = document.getElementById("mynetwork");
var nodes = new vis.DataSet();
var edges = new vis.DataSet();
var flag=0;

var options = {
  nodes:{
    physics: false,
    color: {
      border: 'white',
      background: 'rgba(255, 226, 132, 0.877)',
      highlight: {
        border: 'white',
        background: '#113c75'
      },
      hover: {
        border: 'white',
        background: 'rgba(255, 280, 132, 0.877);'
      }
    },
    font: {
      color: 'black',
    }
  },
  edges:{
        arrows:{
          to:{
             enabled:true
          }
        },
        font: {
          align: 'top'
        }
  },
  physics: {
    stabilization: true,
    barnesHut: {
      springLength: 150,
    },
  },
  manipulation: {
    enabled: true,
    initiallyActive: false,
    addNode: function (nodeData, callback) {
      Swal.fire({
        title: "Nodo",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Ok",
        cancelButtonText: "Cancel",
        inputValidator: nombre => {
            if (!nombre) {
                return "Escribe el nombre del nodo";
            } else {
                return undefined;
            }
        }
    }).then(resultado => {
        if (resultado.value) {
            var auxid = 0;
            let nombre = resultado.value;
            console.log("Hola, " + nombre);
            nodeData.label=nombre;
            if(nodes.length!=0){
              nodes.forEach((node)=>{
                auxid=node.id;
              });
              auxid++;
            };
            nodeData.ttp="";
            nodeData.tpp="";
            nodeData.id=auxid;
            nodes.add(nodeData);
            callback(nodeData);
        }
    });
    },
    addEdge: function (data, callback) {
        Swal.fire({
            title: "Valor",
            input: "text",
            showCancelButton: true,
            confirmButtonText: "Ok",
            cancelButtonText: "Cancel",
            inputValidator: nombre => {
                if (!nombre) {
                    return "Ingrese un valor";
                } else {
                    return undefined;
                }
            }
        }).then(resultado => {
            if (resultado.value) {
              var val = resultado.value;
              data.sublabel1="";
              data.label=val+"\n"+data.sublabel1;
              data.valor=val;
              edges.add(data);
              callback(data);
            }
        });
    },
    editNode: function (nodeData,callback) {
      Swal.fire({
        title: "Nodo",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Ok",
        cancelButtonText: "Cancel",
        inputValidator: nombre => {
            if (!nombre) {
                return "Escribe el nombre del nodo";
            } else {
                return undefined;
            }
        }
    }).then(resultado => {
        if (resultado.value) {            
            var pid=nodeData.id;
            nodes.forEach((node) => {
              if(pid==node.id){
                var nombre=resultado.value;
                node.label=nombre;
                callback(node);
              }
            }) ;
        }
    });
    },
    editEdge: function (data, callback) {
      Swal.fire({
        title: "Valor",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Ok",
        cancelButtonText: "Cancel",
        inputValidator: nombre => {
            if (!nombre) {
                return "Ingrese un valor";
            } else {
                return undefined;
            }
        }
    }).then(resultado => {
        if (resultado.value) {
          var eid=data.id;
          var efrom=data.from;
          var eto=data.to;
          edges.forEach((edge) =>{
            if(eid==edge.id){
              edge.from=efrom;
              edge.to=eto;
              var val = resultado.value;
              data.valor=val;
              data.label=val;
              callback(data);
            }
          });
        }
    });
    },
    deleteNode: true,
    deleteEdge: true,     
    },
};

var data = {
    nodes: nodes,
    edges: edges,
};
var network = new vis.Network(container, data, options);

function llenarTabla(){
  
  if(flag==1){
    document.getElementsByTagName("table")[0].remove();
    flag=0;
  } 
  var aux=[];
  var posi=0;
  nodes.forEach((node)=>{
    aux.push({node,posi});
    posi++;
  });
  aux.forEach((a)=>{
    console.log(a.node.id,a.posi);
  });
  
  mat= Array(nodes.length).fill(0).map(() => Array(nodes.length).fill(0));

  var body =  document.getElementById("ggg");

  var tbl = document.createElement("table");
  var tblHead = document.createElement("thead");
  var tblBody = document.createElement ("tbody");

   edges.forEach((edge) => {
      var ffrom;
      var tto;
      aux.forEach((a)=>{
        if(edge.from==a.node.id){
          tto=a.posi;
        }
      });
      aux.forEach((a)=>{
        if(edge.to==a.node.id){
          ffrom=a.posi;
        }
      });
      mat[parseInt(tto)][parseInt(ffrom)] = edge.label;
    });

  var vcolum=[];
  var vfilas=[];
 
  for (let i=0;i<mat.length;i++){
      var sumc=0; 
      var sfil=0;
      for (let j=0;j<mat.length;j++){
          sfil+=parseFloat(mat[i][j]);
          sumc+=parseFloat(mat[j][i]);
      }
      vfilas.push(sfil);
      vcolum.push(sumc);
  }

  var v=[];

  var row = document.createElement("tr");
  var cell = document.createElement("td");
  var cellText = document.createTextNode("");
  cell.appendChild(cellText);
  row.appendChild(cell);
  nodes.forEach((node) => {
      var cell = document.createElement("td");
      var cellText = document.createTextNode(node.label);
      cell.appendChild(cellText);
      row.appendChild(cell);
      v.push(node.label);
   }) ;

   var cell = document.createElement("td");
   var cellText = document.createTextNode("SUM");
   cell.appendChild(cellText);
   row.appendChild(cell);    

   tblHead.appendChild(row);

   for (var i =0 ; i<mat.length;i++){
      var row = document.createElement("tr"); 

      var cell = document.createElement("td");
      var cellText = document.createTextNode(v[i]);
      cell.className = 'columna';
      cell.appendChild(cellText);
      row.appendChild(cell);

      for (var j=0;j<mat.length;j++){
          
          var cell = document.createElement("td");
          var cellText = document.createTextNode(mat[i][j]);
          cell.appendChild(cellText);
          row.appendChild(cell);
      }
      var cell = document.createElement("td");
      var cellText = document.createTextNode(vfilas[i]);
      cell.className = 'suma';
      cell.appendChild(cellText);
      row.appendChild(cell);
      
      tblBody.appendChild(row);            
  } 

  var row = document.createElement("tr");
  var cell = document.createElement("td");
  var cellText = document.createTextNode("SUM");
  cell.className = 'columna';
  cell.appendChild(cellText);
  row.appendChild(cell);
  
  vcolum.forEach((c) => {
      var cell = document.createElement("td");
      var cellText = document.createTextNode(c);
      cell.appendChild(cellText);
      cell.className = 'suma';
      row.appendChild(cell);
   }) ;
   var cell = document.createElement("td");
   var cellText = document.createTextNode("");

   cell.appendChild(cellText);
   row.appendChild(cell);
   tblBody.appendChild(row);

   tbl.appendChild(tblHead);
   tbl.appendChild(tblBody);
   body.appendChild(tbl);
   tbl.setAttribute("border", "2");
   flag=1;
  
    }


    function johnson(){

      nodes.forEach((node)=>{
        nodes.update({id:node.id,color:{background:"#1556aa"}});;
      });
      edges.forEach((edge)=>{
        edges.update({id:edge.id,label:edge.valor,color:{color:"#1556aa"}});;
      });
      
      //console.log(node);
      var tpp=[];
      var tppf=[];
      var ttp=[];
      var ttpf=[];
      var holguras=[];
      var fflag=0;
      var idn=0;
      var res=0;
      var val=0;
      var idm=0;
      var aux =0;
      edges.forEach((edge)=>{ 

      
         
              idn = edge.to;
              idm = edge.from;
              val = edge.valor;
              tpp.push({idm,idn,val});
            
          
      });
   
      
      for(var ic=0;ic<tpp.length;ic++){
        for(var i=0;i<tpp.length;i++){
            
            if(Number(tpp[ic].val)<Number(tpp[i].val)){
                
                aux=tpp[ic];
                tpp[ic]=tpp[i];
                tpp[i]=aux;
            }
          
        }
      }
      tppf.push(tpp[0]);
      var por=0;
      var por1=0;
      for(var ic=1;ic<tpp.length;ic++){
          por=0;
          por1=0;
        for(var i=0;i<tppf.length;i++){
            
            if((tpp[ic].idn==tppf[i].idn || tpp[ic].idn==tppf[i].idm)){
                
                por=1;
            }
            if((tpp[ic].idm==tppf[i].idn || tpp[ic].idm==tppf[i].idm)){
                
                por1=1;
            }
          
        }
        if(por+por1<2){
            tppf.push(tpp[ic]); 
        }
      }

      console.log("orden : ",tppf);
      for(var i=0;i<tppf.length;i++){
            
        edges.forEach((edge)=>{
            if(tppf[i].idn==edge.to && tppf[i].idm==edge.from ){
            
                edges.update({id:edge.id,label:edge.label,color:{color:"green"}}); 
            }
           
          });



        
      
    }
    }

    function johnson1(){

        nodes.forEach((node)=>{
          nodes.update({id:node.id,color:{background:"#1556aa"}});;
        });
        edges.forEach((edge)=>{
          edges.update({id:edge.id,label:edge.valor,color:{color:"#1556aa"}});;
        });
        
        //console.log(node);
        var tpp=[];
        var tppf=[];
        var ttp=[];
        var ttpf=[];
        var holguras=[];
        var fflag=0;
        var idn=0;
        var res=0;
        var val=0;
        var idm=0;
        var aux =0;
        edges.forEach((edge)=>{ 
  
        
           
                idn = edge.to;
                idm = edge.from;
                val = edge.valor;
                tpp.push({idm,idn,val});
              
            
        });
     
        
        for(var ic=0;ic<tpp.length;ic++){
          for(var i=0;i<tpp.length;i++){
              
              if(Number(tpp[ic].val)>Number(tpp[i].val)){
                  
                  aux=tpp[ic];
                  tpp[ic]=tpp[i];
                  tpp[i]=aux;
              }
            
          }
        }
        tppf.push(tpp[0]);
        var por=0;
      var por1=0;
      for(var ic=1;ic<tpp.length;ic++){
          por=0;
          por1=0;
        for(var i=0;i<tppf.length;i++){
            
            if((tpp[ic].idn==tppf[i].idn || tpp[ic].idn==tppf[i].idm)){
                
                por=1;
            }
            if((tpp[ic].idm==tppf[i].idn || tpp[ic].idm==tppf[i].idm)){
                
                por1=1;
            }
          
        }
        if(por+por1<2){
            tppf.push(tpp[ic]); 
        }
      }
  
        console.log("orden : ",tppf);
        for(var i=0;i<tppf.length;i++){
              
          edges.forEach((edge)=>{
              if(tppf[i].idn==edge.to && tppf[i].idm==edge.from ){
              
                  edges.update({id:edge.id,label:edge.label,color:{color:"green"}}); 
              }
             
            });
  
  
  
          
        
      }
      }
