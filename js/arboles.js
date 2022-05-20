
var letras="abcdefghyjklmnñopqrstuvwxyz+#$%^&*()!@/[]{};:'- ";
var vec=[];
var flag=0;
var todos=[];
var nodes = new vis.DataSet();
var edges = new vis.DataSet();
var resInO="";
var resPoO="";
var resPrO="";
function arbol(){
  var body = document.getElementById("my");
    var entrada = document.getElementById("entrada").value;
    if(verificarLetras(entrada)==0){
        if(flag==0){
            vec=entrada.split(",");
            console.log(vec);
            for(var i=0;i<vec.length;i++){
                todos[i]=parseInt(vec[i]);
                dibujar(parseInt(vec[i]));
            }
            console.log("todos");
            console.log(todos);
            flag=1;
        }else{
            var len=todos.length;
            vec=entrada.split(",");
            console.log(vec);
            for(var i=0;i<vec.length;i++){
                todos[len+i]=parseInt(vec[i]);
                dibujar(parseInt(vec[i]));
            }
            console.log("todos");
            console.log(todos);
        }
        var raiz=todos[0];
        var ramas=[];
        for(var i=1;i<todos.length;i++){
            ramas[i-1]=todos[i];
        }
        console.log("raiz");
        console.log(raiz);
        console.log("vector sin raiz");
        console.log(ramas);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor solo ingrese números positivos',
      });
    }

    body.appendChild(tree);


}
function sinorden(){
    var texto;
    var res=tree.inord();
    texto="In Orden : "+res;
    document.getElementById("salida").innerHTML = texto;
}
function spreorden(){
    var texto;
    var res=tree.preord();
    texto="Pre Orden : "+res;
    document.getElementById("salida").innerHTML = texto;
}
function postnorden(){
    var texto;
    var res=tree.postord();
    texto="Post Orden : "+res;
    document.getElementById("salida").innerHTML = texto;
   
}
function verificarLetras(texto){
    texto = texto.toLowerCase();
    for(i=0; i<texto.length; i++){
       if (letras.indexOf(texto.charAt(i),0)!=-1){
          return 1;
       }
    }
    return 0;
}

var tree;

function setup() {
  createCanvas(1300, 1000);
  tree = new Tree();
// background(0);
}
function Node(val, x, y) {
  this.value = val;
  this.left = null;
  this.right = null;
  this.distance = 2.5;
  this.x = x;
  this.y = y;
}

Node.prototype.visit = function(parent)
{
  if (this.left != null) 
  {
    this.left.visit(this);
  }
  console.log(this.value);
  stroke("white");
  line(parent.x, parent.y, this.x, this.y);
  stroke(255);
  fill("black");
  ellipse(this.x, this.y, 30, 30);
  noStroke();
  fill(255);
  textAlign(CENTER);
  textSize(12);
  text(this.value, this.x, this.y + 4);
  if (this.right != null) 
  {
    this.right.visit(this);
  }
}

Node.prototype.addNode = function(n) 
{
  if (n.value < this.value) 
  {
    if (this.left == null) 
    {
      this.left = n;
      this.left.x = this.x - (width / pow(2, n.distance));
      this.left.y = this.y + (height / 12);
    } 
    else 
    {
      n.distance++;
      this.left.addNode(n)
    }
  } 
  else if (n.value > this.value) 
  {
    if (this.right == null) 
    {
      this.right = n;
      this.right.x = this.x + (width / pow(2, n.distance));
      this.right.y = this.y + (height / 12);
    } 
    else 
    {
      n.distance++;
      this.right.addNode(n);
    }
  }
}



function Tree() 
{
  this.root = null;
}

Tree.prototype.traverse = function() 
{
  this.root.visit(this.root);
}

Tree.prototype.addValue = function(val) 
{
  var n = new Node(val);
  if (this.root == null) 
  {
    this.root = n;
    this.root.x = width / 2;
    this.root.y = 12;
  } 
  else 
  {
    this.root.addNode(n);
  }
}
Tree.prototype.inord =function(){
    resInO="";
    this.inOrder();
    console.log(resInO);
    var val=resInO;
    return val;

}
Tree.prototype.preord =function(){
    resPrO="";
    this.preOrder();
    console.log(resPrO);
    var val=resPrO;
    return val;
}
Tree.prototype.postord =function(){
    resPoO="";
    this.postOrder();
    console.log(resPoO);
    var val=resPoO;
    return val;
}
Tree.prototype.inOrder =function(node = this.root) {
    if (!node) {
      return
    }
    this.inOrder(node.left);
    resInO=resInO+node.value+" ";
    console.log(node.value);
    this.inOrder(node.right);
  }
 
Tree.prototype.preOrder =function (node = this.root) {
    
    if (!node) {
      return
    }
    resPrO=resPrO+node.value+" ";
    console.log(node.value);
    this.preOrder(node.left);
    this.preOrder(node.right);

  }
  Tree.prototype.postOrder =function  (node = this.root) {
    if (!node) {
      return
    }
    this.postOrder(node.left);
    this.postOrder(node.right);
    resPoO=resPoO+node.value+" ";
    console.log(node.value);
  }

function dibujar(valor)
{

     var num=parseInt(valor,10);
     console.log(num);
     tree.addValue(num);
     tree.traverse();
     
}




