// Базовые цены для каждого типа услуги
const servicePrices = {
    basic: 1500,
    premium: 3000,
    vip: 5000
};

// Модификаторы цен для опций
const optionModifiers = {
    standard: 1.0,
    priority: 1.2,
    express: 1.4
};

// Получаем все элементы ДОМ
const quantityInput = document.getElementById('quantity');
const serviceRadios = document.querySelectorAll('input[name="service-type"]');
const optionsContainer = document.getElementById('options-container');
const serviceOption = document.getElementById('service-option');
const propertyContainer = document.getElementById('property-container');
const serviceProperty = document.getElementById('service-property');
const totalPriceElement = document.getElementById('total-price');
const priceBreakdownElement = document.getElementById('price-breakdown');

// Функция инициализации калькулятора
function initCalculator() {
    console.log('Инициализация калькулятора...');
    
    // Настройка обработчиков событий
    setupEventListeners();
    
    // Первоначальный расчет
    updateCalculation();
}

// Настройка всех обработчиков событий
function setupEventListeners() {
    console.log('Настройка обработчиков событий...');
    
    // Обработчик изменения количества (срабатывает сразу при вводе)
    quantityInput.addEventListener('input', function() {
        console.log('Количество изменено:', this.value);
        updateCalculation();
    });
    
    // Обработчик изменения количества (при потере фокуса)
    quantityInput.addEventListener('change', function() {
        console.log('Количество изменено (change):', this.value);
        if (this.value < 1 || this.value === '') {
            this.value = 1;
        }
        updateCalculation();
    });
    
    // Обработчики изменения типа услуги
    serviceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            console.log('Тип услуги изменен:', this.value);
            updateInterface();
            updateCalculation();
        });
    });
    
    // Обработчик изменения опции
    serviceOption.addEventListener('change', function() {
        console.log('Опция изменена:', this.value);
        updateCalculation();
    });
    
    // Обработчик изменения свойства
    serviceProperty.addEventListener('change', function() {
        console.log('Свойство изменено:', this.checked);
        updateCalculation();
    });
    
    // Также обрабатываем клики по радиокнопкам (для надежности)
    serviceRadios.forEach(radio => {
        radio.addEventListener('click', function() {
            console.log('Клик по радиокнопке:', this.value);
            updateInterface();
            updateCalculation();
        });
    });
}

// Обновление интерфейса в зависимости от типа услуги
function updateInterface() {
    const selectedRadio = document.querySelector('input[name="service-type"]:checked');
    if (!selectedRadio) return;
    
    const selectedService = selectedRadio.value;
    
    // Показываем/скрываем дополнительные элементы
    switch(selectedService) {
        case 'basic':
            optionsContainer.style.display = 'none';
            propertyContainer.style.display = 'none';
            break;
            
        case 'premium':
            optionsContainer.style.display = 'block';
            propertyContainer.style.display = 'none';
            break;
            
        case 'vip':
            optionsContainer.style.display = 'none';
            propertyContainer.style.display = 'block';
            break;
    }
}

// Расчет и обновление стоимости
function updateCalculation() {
    console.log('Пересчет стоимости...');
    
    // Получаем текущие значения
    const selectedRadio = document.querySelector('input[name="service-type"]:checked');
    if (!selectedRadio) return;
    
    const selectedService = selectedRadio.value;
    const quantity = parseInt(quantityInput.value) || 1;
    
    // Базовый расчет
    let basePrice = servicePrices[selectedService];
    let total = basePrice * quantity;
    
    // Детализация расчета
    let breakdown = [];
    
    // Названия услуг
    const serviceNames = {
        basic: 'Базовая консультация',
        premium: 'Премиум поддержка',
        vip: 'VIP обслуживание'
    };
    
    breakdown.push(`${serviceNames[selectedService]} × ${quantity} = ${formatPrice(basePrice * quantity)}`);
    
    // Дополнительные настройки для premium
    if (selectedService === 'premium') {
        const optionValue = serviceOption.value;
        const modifier = optionModifiers[optionValue];
        total *= modifier;
        
        const optionNames = {
            standard: 'Стандартная опция',
            priority: 'Приоритетная опция (+20%)',
            express: 'Экспресс опция (+40%)'
        };
        
        if (modifier > 1.0) {
            breakdown.push(optionNames[optionValue]);
        }
    }
    
    // Дополнительные настройки для vip
    if (selectedService === 'vip' && serviceProperty.checked) {
        total *= 1.5;
        breakdown.push('Круглосуточная поддержка (+50%)');
    }
    
    // Обновляем отображение
    totalPriceElement.textContent = formatPrice(total);
    priceBreakdownElement.innerHTML = breakdown.join('<br>');
    
    // Анимация изменения цены
    totalPriceElement.classList.remove('price-change');
    void totalPriceElement.offsetWidth; // Сброс анимации
    totalPriceElement.classList.add('price-change');
}

// Форматирование цены
function formatPrice(price) {
    return price.toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    });
}

// Запуск калькулятора при загрузке страницы
document.addEventListener('DOMContentLoaded', initCalculator);

// Также запускаем при полной загрузке страницы (для надежности)
window.addEventListener('load', function() {
    console.log('Страница загружена');
    updateInterface(); // Гарантируем правильное отображение интерфейса
    updateCalculation(); // Гарантируем правильный расчет
});
