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
    console.log('Калькулятор инициализирован');
    
    // Настройка обработчиков событий
    setupEventListeners();
    
    // Первоначальный расчет
    updateCalculation();
}

// Настройка всех обработчиков событий
function setupEventListeners() {
    console.log('Настройка обработчиков событий');
    
    // Обработчик изменения количества
    quantityInput.addEventListener('input', function() {
        console.log('Количество изменено на:', this.value);
        updateCalculation();
    });
    
    // Валидация количества при потере фокуса
    quantityInput.addEventListener('change', function() {
        if (this.value < 1 || this.value === '') {
            this.value = 1;
        }
        updateCalculation();
    });
    
    // Обработчики изменения типа услуги
    serviceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            console.log('Тип услуги изменен на:', this.value);
            updateInterface();
            updateCalculation();
        });
    });
    
    // Обработчик изменения опции
    serviceOption.addEventListener('change', function() {
        console.log('Опция изменена на:', this.value);
        updateCalculation();
    });
    
    // Обработчик изменения свойства
    serviceProperty.addEventListener('change', function() {
        console.log('Свойство изменено:', this.checked);
        updateCalculation();
    });
}

// Обновление интерфейса в зависимости от типа услуги
function updateInterface() {
    const selectedService = document.querySelector('input[name="service-type"]:checked').value;
    
    console.log('Обновление интерфейса для типа:', selectedService);
    
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

// Функция расчета и обновления стоимости
function updateCalculation() {
    console.log('Пересчет стоимости...');
    
    // Получаем текущие значения
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
    if (selectedService === 'premium') {
        const optionValue = serviceOption.value;
        const modifier = optionModifiers[optionValue];
        total *= modifier;
        
        const optionNames = {
            standard: 'Стандартная',
            priority: 'Приоритетная',
            express: 'Экспресс'
        };
        
        breakdownText += `<br>Опция: ${optionNames[optionValue]}`;
        if (modifier > 1.0) {
            const percentage = Math.round((modifier - 1) * 100);
            breakdownText += ` (+${percentage}%)`;
        }
    }
    
    // Применение модификатора для vip
    if (selectedService === 'vip' && serviceProperty.checked) {
        total *= 1.5; // +50%
        breakdownText += `<br>Дополнительно: круглосуточная поддержка (+50%)`;
    }
    
    console.log('Итоговая сумма:', total);
    
    // Обновление отображения
    totalPriceElement.textContent = formatPrice(total);
    priceBreakdownElement.innerHTML = breakdownText;
    
    // Анимация изменения цены
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

// Запуск калькулятора при загрузке страницы
document.addEventListener('DOMContentLoaded', initCalculator);
