document.addEventListener('DOMContentLoaded', function() {
    // Цены услуг
    const prices = {
        basic: 1500,
        premium: 3000,
        vip: 5000
    };
    
    // Элементы
    const quantity = document.getElementById('quantity');
    const totalElement = document.getElementById('total-price');
    const detailsElement = document.getElementById('calculation-details');
    
    // Радиокнопки
    const basicRadio = document.querySelector('input[value="basic"]');
    const premiumRadio = document.querySelector('input[value="premium"]');
    const vipRadio = document.querySelector('input[value="vip"]');
    
    // Дополнительные элементы
    const optionsGroup = document.getElementById('options-group');
    const propertyGroup = document.getElementById('property-group');
    
    // Функция расчета
    function calculate() {
        // Получаем количество
        let count = parseInt(quantity.value);
        if (isNaN(count) || count < 1) {
            count = 1;
            quantity.value = 1;
        }
        
        // Определяем выбранную услугу
        let servicePrice = 0;
        let serviceName = '';
        
        if (basicRadio.checked) {
            servicePrice = prices.basic;
            serviceName = 'Базовая консультация';
        } else if (premiumRadio.checked) {
            servicePrice = prices.premium;
            serviceName = 'Премиум поддержка';
        } else if (vipRadio.checked) {
            servicePrice = prices.vip;
            serviceName = 'VIP обслуживание';
        }
        
        // Рассчитываем итог
        const total = servicePrice * count;
        
        // Обновляем интерфейс
        totalElement.textContent = total + ' руб.';
        detailsElement.textContent = serviceName + ' × ' + count + ' = ' + total + ' руб.';
    }
    
    // Обработчики событий
    quantity.addEventListener('input', calculate);
    basicRadio.addEventListener('change', calculate);
    premiumRadio.addEventListener('change', calculate);
    vipRadio.addEventListener('change', calculate);
    
    // Первоначальный расчет
    calculate();
});