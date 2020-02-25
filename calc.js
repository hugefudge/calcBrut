window.onload = () =>{

    const  getValues = ()=> {
      
        const valores = document.getElementById('valores');
        
        return valores;
    }
    
    const spliceNullPosition = (array)=> {
        if(array[1]== ""){
            array.splice([1])
        }
        return true;
    }
    
    const verifyIfArrayHasTwoPositions = (array)=> {
        
        return array.length == 2;
    }

    const raiz = (valor) => {
        const contaRaiz = Math.sqrt(valor);
        const contaTrue = Number.isInteger(contaRaiz);
       if(contaTrue == true) {
        return contaRaiz;
    } else { 
        return 'Raiz do numero nao e quadrada'
       }
    }
    
    const addOperation = (operation) => {
        const actualValue = getValues().value;    
        console.log(operation);  
        const elementoValores =  document.getElementById('valores');
        elementoValores.value = `${actualValue}${operation}`;  
        elementoValores.focus();  
    }
    
    const getOperation = (actualValue) => {
        
        if(actualValue.includes('+')) {
            return '+';;
        } else if (actualValue.includes('-')) {
            return '-';
        } else if (actualValue.includes('x')){
            return 'x';
        } else if (actualValue.includes('/')){
            return '/';
        } else if(actualValue.includes('!')) {
            return '!';
        } else if(actualValue.includes('²√')) {
            return '²√';
        }
        else {
            return false;
        }
    }
    const fatorial = (numero) => {

        let result = numero; 
        for(let i = 1; i<numero; i++) {
            result  = result * (numero - i);
        }
        return result;
    }

    const oprRealizadas = (operacao, resultado) => {
        document.getElementById('textarea').value += `${operacao} = ${resultado} \n`
    }
    
    const doOperation = (operation,value1,value2) => {    
        if(operation == '-') return value1 - value2;
        if(operation == '+') return parseInt(value1) + parseInt(value2);
        if(operation == 'x') return value1*value2;
        if(operation == '/') return value1/value2;
        if(operation == '!') return fatorial(value1);
        if(operation == '²√') return raiz(value1);
    }
    
    const calc = () => {
                    
        const actualValue = getValues().value;
        const whichOperation = getOperation(actualValue);
        if(!whichOperation) {
        alert('Adicione alguma operação válida');    
        return false;
        }
    
        const allValues = actualValue.split(whichOperation);
        spliceNullPosition(allValues);

        if(whichOperation == '!' || whichOperation == '²√') {
            const value1 = allValues[0];
            const result = doOperation(whichOperation, value1, null);
            document.getElementById('resultado').value = `${result}`;
            oprRealizadas(actualValue, result); 

        } else {
            if(!verifyIfArrayHasTwoPositions(allValues)) {
                alert('Coloque 2 valores para fazer a operacao')
                return false;
            }
            const value1 = allValues[0];
            const value2 = allValues[1];
        
            const result = doOperation(whichOperation,value1,value2);    
            document.getElementById('resultado').value = `${result}`;
            getValues().focus();
            getValues().value = "";
            oprRealizadas(actualValue, result); 
        }       
    }

    let operation;
    const addEventToAllOperation = ()=> {
        const allOperation = Array.from(document.getElementsByClassName('operacao'));
        allOperation.forEach(element => {
            element.onclick = function() { // usando arrow function modifica o uso do this, estudar o motivo.
               operation = this.getAttribute('value');
               addOperation(operation);
           } 
        }) 
    }
    
    addEventToAllOperation();
    
    document.getElementById('doMeth').addEventListener('click',calc);
    
    

}   
