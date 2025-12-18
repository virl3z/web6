document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы DOM
    const quantityInput = document.getElementById('quantity');
    const productSelect = document.getElementById('product');
    const calculateButton = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');
    
    // Регулярное выражение для проверки ввода (только положительные целые числа)
    const quantityRegex = /^\d+$/;
    
    // Функция для проверки корректности ввода
    function validateInput(quantity) {
        if (!quantityRegex.test(quantity)) {
            return false;
        }
        return true;
    }
    
    // Функция для расчета стоимости заказа
    function calculateOrderCost() {
        const quantity = quantityInput.value.trim();
        const price = parseFloat(productSelect.value);
        
        // Проверка корректности ввода
        if (!validateInput(quantity)) {
            resultDiv.textContent = 'Ошибка: введите корректное количество (только положительные целые числа)';
            resultDiv.className = 'error';
            return;
        }
        
        // Преобразование количества в число
        const quantityNum = parseInt(quantity, 10);
        
        // Проверка, что количество больше 0
        if (quantityNum <= 0) {
            resultDiv.textContent = 'Ошибка: количество должно быть больше 0';
            resultDiv.className = 'error';
            return;
        }
        
        // Расчет стоимости
        const totalCost = quantityNum * price;
        
        // Вывод результата
        resultDiv.textContent = `Стоимость заказа: ${totalCost} руб.`;
        resultDiv.className = 'success';
    }
    
    // Добавляем обработчик события на кнопку
    calculateButton.addEventListener('click', calculateOrderCost);
    
    // Добавляем обработчик события нажатия Enter в поле ввода количества
    quantityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calculateOrderCost();
        }
    });
});