// Базовые цены
const prices = {
    basic: 1500,
    premium: 3000,
    vip: 5000
};

// Модификаторы опций
const optionModifiers = {
    standard: 1.0,
    priority: 1.2,
    express: 1.4
};

// Функция для форматирования цены
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(price);
}

// Основная функция расчета
function calculateTotal() {
    console.log('--- РАСЧЕТ НАЧАТ ---');
    
    // Получаем значения
    const quantity = document.getElementById('quantity').value || 1;
    console.log('Количество:', quantity);
    
    const serviceType = document.querySelector('input[name="service-type"]:checked').value;
    console.log('Тип услуги:', serviceType);
    
    const optionValue = document.getElementById('service-option').value;
    console.log('Опция:', optionValue);
    
    const isExtraChecked = document.getElementById('service-property').checked;
    console.log('Доп. опция:', isExtraChecked);
    
    // Рассчитываем базовую цену
    let total = prices[serviceType] * quantity;
    console.log('Базовая цена:', total);
    
    // Добавляем опции для premium
    if (serviceType === 'premium') {
        total *= optionModifiers[optionValue];
        console.log('После опции:', total);
    }
    
    // Добавляем доп. услугу для vip
    if (serviceType === 'vip' && isExtraChecked) {
        total *= 1.5;
        console.log('После доп. услуги:', total);
    }
    
    // Обновляем отображение
    document.getElementById('total-price').textContent = formatPrice(total);
    
    // Формируем детализацию
    let breakdown = `${getServiceName(serviceType)} × ${quantity} = ${formatPrice(prices[serviceType] * quantity)}`;
    
    if (serviceType === 'premium' && optionValue !== 'standard') {
        breakdown += `<br>${getOptionName(optionValue)} (+${(optionModifiers[optionValue] - 1) * 100}%)`;
    }
    
    if (serviceType === 'vip' && isExtraChecked) {
        breakdown += '<br>Круглосуточная поддержка (+50%)';
    }
    
    document.getElementById('price-breakdown').innerHTML = breakdown;
    console.log('Итог:', formatPrice(total));
    console.log('--- РАСЧЕТ ЗАВЕРШЕН ---\n');
}

// Вспомогательные функции
function getServiceName(type) {
    const names = {
        basic: 'Базовая консультация',
        premium: 'Премиум поддержка',
        vip: 'VIP обслуживание'
    };
    return names[type];
}

function getOptionName(option) {
    const names = {
        standard: 'Стандартная',
        priority: 'Приоритетная',
        express: 'Экспресс'
    };
    return names[option];
}

// Обновление интерфейса при смене типа услуги
function updateInterface() {
    const serviceType = document.querySelector('input[name="service-type"]:checked').value;
    const optionsContainer = document.getElementById('options-container');
    const propertyContainer = document.getElementById('property-container');
    
    console.log('Обновление интерфейса для:', serviceType);
    
    if (serviceType === 'basic') {
        optionsContainer.style.display = 'none';
        propertyContainer.style.display = 'none';
    } else if (service