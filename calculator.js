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

// Инициализация калькулятора
function initCalculator() {
    // Установка обработчиков событий для всех элементов
    setupEventListeners();
    
    // Первоначальный расчет
    updateCalculation();
}

// Настройка всех обработчиков событий
function setupEventListeners() {
    // Обработчик изменения количества
    quantityInput.addEventListener('input', function() {
        updateCalculation();
    });
    
    quantityInput.addEventListener('change', function() {
        if (this.value < 1) {
            this.value = 1;
        }
        updateCalculation();
    });
    
    // Обработчики изменения типа услуги
    serviceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateInterface();
            updateCalculation();
        });
    });
    
    // Обработчик изменения опции
    if (serviceOption) {
        serviceOption.addEventListener('change', updateCalculation);
    }
    
    // Обработчик изменения свойства
    if (serviceProperty) {
        serviceProperty.addEventListener('change', updateCalculation);
    }
}

// Обновление интерфейса в зависимости от типа услуги
function updateInterface() {
    const selectedService = document.querySelector('input[name="service-type"]:checked').value;
    
    switch(selectedService) {
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
}

// Функция показа элемента с анимацией
function showElement(element) {
    if (element) {
        element.style.display = 'block';
        element.classList.add('fade-in');
    }
}

// Функция скрытия элемента
function hideElement(element) {
    if (element) {
        element.style.display = 'none';
        element.classList.remove('fade-in');
    }
}

// Функция расчета и обновления стоимости
function updateCalculation() {
    // Получение текущих значений
    const selectedService = document.querySelector('input[name="service-type"]:checked').value;
    const quantity = parseInt(quantityInput.value) || 1;
    
    // Расчет базовой стоимости
    let basePrice = servicePrices[selectedService];
    let total = basePrice * quantity;
    let breakdownText = '';
    
    // Форматирование названия услуги
    const serviceNames = {
        basic: 'Базовая консультация',
        premium: 'Премиум поддержка',
        vip: 'VIP обслуживание'
    };
    
    breakdownText = `${serviceNames[selectedService]} × ${quantity} = ${formatPrice(basePrice * quantity)}`;
    
    // Применение модификаторов для premium
    if (selectedService === 'premium' && serviceOption) {
        const modifier = optionModifiers[serviceOption.value];
        total *= modifier;
        
        const optionNames = {
            standard: 'Стандартная',
            priority: 'Приоритетная',
            express: 'Экспресс'
        };
        
        breakdownText += `<br>Опция: ${optionNames[serviceOption.value]}`;
        if (modifier > 1.0) {
            const percentage = Math.round((modifier - 1) * 100);
            breakdownText += ` (+${percentage}%)`;
        }
    }
    
    // Применение модификатора для vip
    if (selectedService === 'vip' && serviceProperty && serviceProperty.checked) {
        total *= 1.5; // +50%
        breakdownText += `<br>Дополнительно: круглосуточная поддержка (+50%)`;
    }
    
    // Обновление отображения
    totalPriceElement.textContent = formatPrice(total);
    priceBreakdownElement.innerHTML = breakdownText;
    
    // Добавляем анимацию изменения цены
    totalPriceElement.classList.add('price-change');
    setTimeout(() => {
        totalPriceElement.classList.remove('price-change');
    }, 300);
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
