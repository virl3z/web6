// Цены услуг
const prices = {
    basic: 1500,
    premium: 3000,
    vip: 5000
};

// Модификаторы
const modifiers = {
    standard: 1.0,
    priority: 1.2,
    express: 1.4
};

// Получаем элементы
const quantityInput = document.getElementById('quantity');
const serviceRadios = document.querySelectorAll('input[name="service-type"]');
const optionsContainer = document.getElementById('options-container');
const propertyContainer = document.getElementById('property-container');
const optionSelect = document.getElementById('service-option');
const propertyCheckbox = document.getElementById('service-property');
const totalPriceElement = document.getElementById('total-price');
const breakdownElement = document.getElementById('price-breakdown');

// Основная функция расчета
function calculatePrice() {
    console.log('РАСЧЕТ...');
    
    // Получаем значения
    const quantity = parseInt(quantityInput.value) || 1;
    const service = document.querySelector('input[name="service-type"]:checked').value;
    
    // Рассчитываем
    let total = prices[service] * quantity;
    let breakdown = `${getServiceName(service)} × ${quantity} = ${formatPrice(prices[service] * quantity)}`;
    
    // Опции для premium
    if (service === 'premium') {
        total *= modifiers[optionSelect.value];
        if (optionSelect.value !== 'standard') {
            breakdown += `<br>${getOptionName(optionSelect.value)} (+${(modifiers[optionSelect.value] - 1) * 100}%)`;
        }
    }
    
    // Опции для vip
    if (service === 'vip' && propertyCheckbox.checked) {
        total *= 1.5;
        breakdown += '<br>Круглосуточная поддержка (+50%)';
    }
    
    // Обновляем интерфейс
    totalPriceElement.textContent = formatPrice(total);
    breakdownElement.innerHTML = breakdown;
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

function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(price);
}

// Обновление интерфейса
function updateInterface() {
    const service = document.querySelector('input[name="service-type"]:checked').value;
    
    if (service === 'basic') {
        optionsContainer.style.display = 'none';
        propertyContainer.style.display = 'none';
    } else if (service === 'premium') {
        optionsContainer.style.display = 'block';
        propertyContainer.style.display = 'none';
    } else if (service === 'vip') {
        optionsContainer.style.display = 'none';
        propertyContainer.style.display = 'block';
    }
}

// Настройка событий
document.addEventListener('DOMContentLoaded', function() {
    console.log('Документ загружен');
    
    // Обработчики для полей формы
    quantityInput.addEventListener('input', calculatePrice);
    quantityInput.addEventListener('change', calculatePrice);
    
    serviceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateInterface();
            calculatePrice();
        });
    });
    
    optionSelect.addEventListener('change', calculatePrice);
    propertyCheckbox.addEventListener('change', calculatePrice);
    
    // Первоначальный расчет
    updateInterface();
    calculatePrice();
});

// Альтернативный способ - прямой вызов из HTML (на всякий случай)
window.calc = calculatePrice;
