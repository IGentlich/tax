(function() {
    var goods = [];
    var types = [
        {title:"book",                       type:["books"] },
        {title:"music CD",                   type:["device"] },
        {title:"chocolate bar",              type:["food"] },
        {title:"imported box of chocolates", type:["food","imported"] },            // "chocolate" can be color or scent, so search only by keyword prob won't work out
        {title:"imported bottle of perfume", type:["perfume","imported"] },         // could be easier though
        {title:"bottle of perfume",          type:["perfume"] },
        {title:"packet of headache pills",   type:["medicine"] },
        {title:"box of imported chocolates", type:["food","imported"] },
    ];
    var taxes = [
        {type:"books",    tax:0},
        {type:"food",     tax:0},
        {type:"device",   tax:10},
        {type:"perfume",  tax:10},
        {type:"medicine", tax:0},
        {type:"imported", tax:5},
    ];

    document.getElementById("add-goods-button").addEventListener("click", () => {
        let value = document.getElementById("goods-input").value;
        parseData(value);
        reloadBasket();
    });

    var parseData = (data) => {
        goods = [];
        let items = data.split('\n');

        for(i=0; i < items.length; i++) {
            let count = items[i][0];
            items[i] = items[i].slice(2);
    
            let splitted = items[i].split(" at ");
            let title = splitted[0];
            let price = splitted[1];
            if(parseInt(count) && parseFloat(price)) {                              // check if anything is there, otherwise why add item at all
                price = parseFloat(price);
                count = parseInt(count);

                let tax = calculateTax(title, price);
                goods.push(
                    {title:title, count:count, price:price, tax:tax, total:parseFloat(price + tax)}
                  );
            }
        }
        
    }

    var reloadBasket = () => {
        let totalTaxes = 0;
        let total = 0;

        let itemsBlock = document.getElementsByClassName("basket-items")[0];
        let taxesBlock = document.getElementsByClassName("basket-taxes")[0];
        let totalBlock = document.getElementsByClassName("basket-total")[0];

        itemsBlock.innerHTML = '';
        taxesBlock.innerHTML = '';
        totalBlock.innerHTML = '';

        for(i = 0; i < goods.length; i++) {
            itemsBlock.innerHTML += `<div class="item">${goods[i].count} ${goods[i].title}: ${goods[i].total.toFixed(2)}</div>`;
                                
            totalTaxes += goods[i].tax;
            total += goods[i].total;
        }

        taxesBlock.innerHTML = `Sales Taxes: ${totalTaxes.toFixed(2)}`;
        totalBlock.innerHTML = `Total: ${total.toFixed(2)}`;

        taxesBlock.classList.remove("dn");
    }

    var calculateTax = (title, price) => {
        let tax = 0;
        let defaultTax = 10;
        for(let i = 0; i < types.length; i++) {
            if(title == types[i].title) {
                for(j = 0; j < types[i].type.length; j++) {
                    for(t = 0; t < taxes.length; t++) {
                        if(taxes[t].type == types[i].type[j]) {
                            tax += price * (taxes[t].tax / 100);
                        }
                    }
                }
            }
        }
        
        
        
        return parseFloat((Math.ceil(tax*20)/20).toFixed(2));
    }
})();
