window.addEventListener('load', solve);

function solve() {
    let modelInputElement = document.getElementById('model');
    let yearInputElement = document.getElementById('year');
    let descriptionInputElement = document.getElementById('description');
    let priceInputElement = document.getElementById('price');
    let addBtnElement = document.getElementById('add');
    let tableBuyBtnElement;

    addBtnElement.addEventListener('click', (e) => {
        e.preventDefault();
        let modelInput = modelInputElement.value;
        let yearInput = Number(yearInputElement.value);
        let descriptionInput = descriptionInputElement.value;
        let priceInput = Number(priceInputElement.value);

        modelInputElement.value = '';
        yearInputElement.value = '';
        priceInputElement.value = '';
        descriptionInputElement.value = '';

        if (modelInput !== '' && descriptionInput !== '' && yearInput > 0 && priceInput > 0) {
            let tableBodyElement = document.getElementById('furniture-list');

            let infoTrElement = document.createElement('tr');
            infoTrElement.className = 'info';

            let modelTableElement = document.createElement('td');
            modelTableElement.textContent = modelInput;

            let priceTableElement = document.createElement('td');
            priceTableElement.textContent = priceInput.toFixed(2);

            infoTrElement.appendChild(modelTableElement);
            infoTrElement.appendChild(priceTableElement);
            tableBodyElement.appendChild(infoTrElement);

            let tableMoreBtnElement = document.createElement('button');
            tableMoreBtnElement.className = 'moreBtn';
            tableMoreBtnElement.textContent = 'More Info';
            let tableBuyBtnElement = document.createElement('button');
            tableBuyBtnElement.className = 'buyBtn';
            tableBuyBtnElement.textContent = 'Buy it';

            let buttonsTdElement = document.createElement('td');
            infoTrElement.appendChild(buttonsTdElement);
            buttonsTdElement.appendChild(tableMoreBtnElement);
            buttonsTdElement.appendChild(tableBuyBtnElement);

            let hiddenInfoElement = document.createElement('tr');
            hiddenInfoElement.className = 'hide';
            tableBodyElement.appendChild(hiddenInfoElement);

            let yearTableElement = document.createElement('td');
            yearTableElement.textContent = `Year: ${yearInput}`;
            hiddenInfoElement.appendChild(yearTableElement);

            let descriptionTableElement = document.createElement('td');
            descriptionTableElement.colSpan = 3;
            descriptionTableElement.textContent = `Description: ${descriptionInput}`;
            hiddenInfoElement.appendChild(descriptionTableElement);

            tableMoreBtnElement.addEventListener('click', (e) => {
                if (tableMoreBtnElement.textContent === 'More Info') {
                    tableMoreBtnElement.textContent = 'Less Info';
                    hiddenInfoElement.style.display = 'contents';
                } else {
                    tableMoreBtnElement.textContent = 'More Info';
                    hiddenInfoElement.style.display = 'none';
                }
            });
        }
    });
    tableBuyBtnElement.addEventListener('click', (e) => {
        let totalPriceElement = document.querySelector('.total-price');
        let currPrice = Number((e.target.parentNode.parentNode.querySelector('td:nth-of-type(2)')).textContent);
        e.target.parentNode.parentNode.remove();
        let extraDescriptionElements = document.querySelectorAll('.hide');
        for (el of extraDescriptionElements) {
            el.remove();
        }
        totalPriceElement.textContent = (Number(totalPriceElement.textContent) + currPrice).toFixed(2);
    });
}
