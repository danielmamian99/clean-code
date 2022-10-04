type Size = ''| 'S'|'M'|'XL';
//!COMO NO SE DEBE HACER
(()=>{
    class Product {
        constructor(
            public name:string,
            public price:number = 0,
            public size: Size = '',

        ){}

        toString(){
            //este codigo se repite por cada validación necesaria
            //en este caso nuestra función que retorna las propiedades como string
            //esta haciendo dos tareas, validar que existan los datos y retornar los valores como string
            //para esto debemos seprar las validaciones a una función que se encargue de validar todos los campos
            //por si el día de mañana se agrega un nuevo campo no tengamos que modificar de nuevo esta función
            if(this.name.length <= 0) throw Error('name is empty');
            if(this.price <= 0) throw Error('price is zero');
            if(this.size.length <= 0) throw Error('size is empty');
            return `${this.name} (${this.price}), ${this.size}`
        }
    }
    (()=>{
        const bluePants = new Product('Blue large pants', 100, 'XL')
        console.log(bluePants.toString())
    })();
})();
//!COMO SE DEBE HACER
(()=>{

    class Product {
        constructor(
            public name: string = '',
            public price: number = 0,
            public size: Size = '',
        ){}
    
        isProductReady(): boolean {
            
            for( const key in this ) {
                switch( typeof this[key] ) {
                    case 'string':
                        if ( (<string><unknown>this[key]).length <= 0 ) throw Error(`${ key } is empty`);
                    break;
                    case 'number':
                        if ( (<number><unknown>this[key]) <= 0 ) throw Error(`${ key } is zero`);
                    break;
                    default:
                        throw Error(`${ typeof this[key] } is not valid`);
                }
            }
    
            return true;
        }
    
        
        toString() {
            
            if ( !this.isProductReady ) return;
            
    
            return `${ this.name } (${ this.price }), ${ this.size }`
        }
    
    }
    
    (()=> {
    
        const bluePants = new Product('Blue Pants', 10,'S');
        console.log(bluePants.toString());
    
    })();
})();


