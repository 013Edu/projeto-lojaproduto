class Produto{

    constructor(){
        this.id = 1;
        this.arrayProdutos =[];
        this.editID = null;
    }
    
    salvar(){
        let produto = this.lerDados();

        if(this.validaCampos(produto)){
            if(this.editID == null){
                this.adicionar(produto);       
            }else{
                this.atualizar(this.editID,produto); 
            }
        }
       this.listaTabela();
       this.cancelar();
    }

    listaTabela(){
        let tbody = document.getElementById('tbody');

        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++){
 
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_nomeProduto = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_nomeProduto.innerText = this.arrayProdutos[i].nomeProduto;
            td_preco.innerText = this.arrayProdutos[i].preco;

            td_id.classList.add('center');
            td_acoes.classList.add('center');

            let img_edit = document.createElement('img');
            img_edit.src = 'img/edit.png'
            img_edit.setAttribute('onclick','produto.editar('+ JSON.stringify(this.arrayProdutos[i]) +')')

            let img_delet = document.createElement('img');
            img_delet.src = 'img/bin.png';
            img_delet.setAttribute('onclick','produto.deletar('+ this.arrayProdutos[i].id +')')

            td_acoes.appendChild(img_edit);
            td_acoes.appendChild(img_delet);



        }
    }

    adicionar(produto){
        this.arrayProdutos.push(produto);
        this.id++;
    } 

    atualizar(id,produto){
        for(let i = 0; i < this.arrayProdutos.length; i ++){
            if(this.arrayProdutos[i].id == id){
                 this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                 this.arrayProdutos[i].preco = produto.preco;
            }
        }
    }

     editar(dados){

        this.editID = dados.id;

         document.getElementById('produto').value = dados.nomeProduto;
         document.getElementById('valor').value = dados.preco;

         document.getElementById('btn1').innerText = 'Atualizar';
     }

    lerDados(){
        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.preco = document.getElementById('valor').value;

        return produto;
    }

     validaCampos(produto){

         let msg = '';

         if( produto.nomeProduto == ''){
            msg+= '-Informe o nome do produto \n';
         }
         if(produto.preco == ''){
         msg+= '-Informe o preço do produto \n';
         }

         if(msg != ''){
              alert(msg);
              return false;
         }
         return true;
     }
     
    cancelar(){
        
        document.getElementById('produto').value = '';
        document.getElementById('valor').value = '';

        document.getElementById('btn1').innerText = 'Salvar';
        this.editID = null;
    }

    deletar(id){
        
        if(confirm('Deseja realmente deletar o produto do ID' + id)){
        let tbody = document.getElementById('tbody');

        for(let i = 0; i < this.arrayProdutos.length; i++){
 
            if(this.arrayProdutos[i].id == id){
 
                this.arrayProdutos.splice(i,1);
                tbody.deleteRow(i);
            }
        }
    }
}

}

var produto = new Produto();

