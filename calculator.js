// Базовые цены для каждого типа услуги
const servicePrices = {
    basic: 1500,    // Базовая консультация
    premium: 3000,  // Премиум поддержка
    vip: 5000       // VIP обслуживание
};

// Модификаторы цен для опций (премиум)
const optionModifiers = {
    standard: 1.0,    // Стандартная (без изменения)
    priority: 1.2,    // Приоритетная (+20%)
    express: 1.4      // Экспресс (+40%)
};

// DOM элементы
const quantityInput = document.getElementById('quantity');
const serviceRadios = document.querySelectorAll('input[name="service-type"]');
const optionsContainer = document.getElementById('options-container');
const serviceOption = document.getElementById('service-option');
const propertyContainer = document.getElementById('property-container');
const serviceProperty = document.getElementById('service-property');
const totalPriceElement = document.getElementById('total-price');
const priceBreakdownElement = document.getElementById('price-breakdown');

// Текущие значения
let currentServiceType = 'basic';
let currentQuantity = 1;
let currentOption = 'standard';
let currentProperty = false;

// Инициализация калькулятора
function initCalculator() {
    // Установка обработчиков событий
    quantityInput.addEventListener('input', handleQuantityChange);
    
    serviceRadios.forEach(radio => {
        radio.addEventListener('change', handleServiceTypeChange);
    });
    
    serviceOption.addEventListener('change', handleOptionChange);
    serviceProperty.addEventListener('change', handlePropertyChange);
    
    // Первоначальный расчет
    updateCalculation();
}

// Обработчик изменения количества
function handleQuantityChange(event) {
    const value = parseInt(event.target.value);
    if (value > 0) {
        currentQuantity = value;
        updateCalculation();
    }
}

// Обработчик изменения типа услуги
function handleServiceTypeChange(event) {
    currentServiceType = event.target.value;
    
    // Показываем/скрываем дополнительные элементы в зависимости от типа услуги
    switch(currentServiceType) {
        case 'basic':
            hideElement(optionsContainer);
            hideElement(propertyContainer);
            break;
            
        case 'premium':
            showElement(optionsContainer);
            hideElement(propertyContainer);
            break;
            
        case 'vip':
            hideElement(optionsContainer);
            showElement(propertyContainer);
            break;
    }
    
    updateCalculation();
}

// Обработчик изменения опции
function handleOptionChange(event) {
    currentOption = event.target.value;
    updateCalculation();
}

// Обработчик изменения свойства
function handlePropertyChange(event) {
    currentProperty = event.target.checked;
    updateCalculation();
}

// Функция показа элемента с анимацией
function showElement(element) {
    element.style.display = 'block';
    element.classList.add('fade-in');
}

// Функция скрытия элемента
function hideElement(element) {
    element.style.display = 'none';
    element.classList.remove('fade-in');
}

// Функция расчета и обновления стоимости
function updateCalculation() {
    let basePrice = servicePrices[currentServiceType];
    let total = basePrice * currentQuantity;
    let breakdownText = '';
    
    // Форматирование названия услуги
    const serviceNames = {
        basic: 'Базовая консультация',
        premium: 'Премиум поддержка',
        vip: 'VIP обслуживание'
    };
    
    breakdownText = `${serviceNames[currentServiceType]} × ${currentQuantity} = ${formatPrice(basePrice * currentQuantity)}`;
    
    // Применение модификаторов для premium
    if (currentServiceType === 'premium') {
        const modifier = optionModifiers[currentOption];
        total *= modifier;
        
        const optionNames = {
            standard: 'Стандартная',
            priority: 'Приоритетная',
            express: 'Экспресс'
        };
        
        breakdownText += `<br>Опция: ${optionNames[currentOption]}`;
        if (modifier > 1.0) {
            breakdownText += ` (+${Math.round((modifier - 1) * 100)}%)`;
        }
    }
    
    // Применение модификатора для vip
    if (currentServiceType === 'vip' && currentProperty) {
        total *= 1.5; // +50%
        breakdownText += `<br>Дополнительно: круглосуточная поддержка (+50%)`;
    }
    
    // Обновление отображения
    totalPriceElement.textContent = formatPrice(total);
    priceBreakdownElement.innerHTML = breakdownText;
}

// Функция форматирования цены
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(price);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initCalculator);
