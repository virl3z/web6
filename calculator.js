document.addEventListener('DOMContentLoaded', function() {
    // Цены базовых услуг
    const servicePrices = {
        basic: 1500,
        premium: 3000,
        vip: 5000
    };
    
    // Дополнительные цены для опций
    const optionPrices = {
        standard: 0,
        extended: 1000,
        priority: 2000
    };
    
    // Цена за свойство
    const propertyPrice = 1500;
    
    // Элементы DOM
    const quantityInput = document.getElementById('quantity');
    const serviceRadios = document.querySelectorAll('input[name="service"]');
    const optionsGroup = document.getElementById('options-group');
    const optionsSelect = document.getElementById('options');
    const propertyGroup = document.getElementById('property-group');
    const propertyCheckbox = document.getElementById('property');
    const totalPriceElement = document.getElementById('total-price');
    const calculationDetailsElement = document.getElementById('calculation-details');
    
    // Функция для обновления отображения дополнительных элементов
    function updateFormVisibility() {
        const selectedService = document.querySelector('input[name="service"]:checked').value;
        
        // Скрываем все дополнительные элементы
        optionsGroup.style.display = 'none';
        propertyGroup.style.display = 'none';
        
        // Показываем нужные элементы в зависимости от типа услуги
        switch(selectedService) {
            case 'basic':
                // Базовый - ничего не показываем
                break;
            case 'premium':
                // Премиум - показываем только опции
                optionsGroup.style.display = 'block';
                break;
            case 'vip':
                // VIP - показываем только свойство
                propertyGroup.style.display = 'block';
                break;
        }
    }
    
    // Функция для расчета и обновления стоимости
    function calculateTotal() {
        const quantity = parseInt(quantityInput.value) || 1;
        const selectedService = document.querySelector('input[name="service"]:checked').value;
        const selectedOption = optionsSelect.value;
        const hasProperty = propertyCheckbox.checked;
        
        // Базовая цена
        let basePrice = servicePrices[selectedService];
        
        // Добавляем стоимость опции (для премиум)
        let optionPrice = 0;
        if (selectedService === 'premium') {
            optionPrice = optionPrices[selectedOption];
        }
        
        // Добавляем стоимость свойства (для VIP)
        let propertyPriceTotal = 0;
        if (selectedService === 'vip' && hasProperty) {
            propertyPriceTotal = propertyPrice;
        }
        
        // Общая цена за единицу
        const unitPrice = basePrice + optionPrice + propertyPriceTotal;
        
        // Итоговая стоимость
        const totalPrice = unitPrice * quantity;
        
        // Обновляем отображение цены
        totalPriceElement.textContent = totalPrice.toLocaleString('ru-RU') + ' руб.';
        
        // Формируем детали расчета
        let details = '';
        switch(selectedService) {
            case 'basic':
                details = `Базовая консультация × ${quantity} = ${totalPrice} руб.`;
                break;
            case 'premium':
                let optionText = '';
                switch(selectedOption) {
                    case 'standard': 
                        optionText = 'Стандартная поддержка'; 
                        break;
                    case 'extended': 
                        optionText = 'Расширенная поддержка'; 
                        break;
                    case 'priority': 
                        optionText = 'Приоритетная поддержка'; 
                        break;
                }
                details = `Премиум поддержка (${optionText}) × ${quantity} = ${totalPrice} руб.`;
                break;
            case 'vip':
                let propertyText = hasProperty ? ' с экстренной поддержкой 24/7' : '';
                details = `VIP обслуживание${propertyText} × ${quantity} = ${totalPrice} руб.`;
                break;
        }
        
        calculationDetailsElement.textContent = details;
    }
    
    // Назначаем обработчики событий
    quantityInput.addEventListener('input', calculateTotal);
    
    serviceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateFormVisibility();
            calculateTotal();
        });
    });
    
    optionsSelect.addEventListener('change', calculateTotal);
    propertyCheckbox.addEventListener('change', calculateTotal);
    
    // Инициализация
    updateFormVisibility();
    calculateTotal();
    
    // Валидация количества
    quantityInput.addEventListener('change', function() {
        if (this.value < 1) {
            this.value = 1;
        }
        calculateTotal();
    });
}); // <-- Закрывающая скобка для DOMContentLoaded
