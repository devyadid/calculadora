document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('result');
    let currentMode = 'DEG'; // DEG or RAD

    // Función para actualizar la pantalla
    const updateDisplay = (value) => {
        if (result.value === '0' && !isNaN(value)) {
            result.value = value;
        } else {
            result.value += value;
        }
    };

    // Función para calcular el resultado
    const calculate = () => {
        try {
            let expression = result.value
                .replace('×', '*')
                .replace('π', Math.PI)
                .replace('e', Math.E);
            
            // Manejar funciones trigonométricas
            expression = expression.replace(/sin\((.*?)\)/g, (match, p1) => {
                const val = parseFloat(p1);
                return currentMode === 'DEG' ? Math.sin(val * Math.PI / 180) : Math.sin(val);
            }).replace(/cos\((.*?)\)/g, (match, p1) => {
                const val = parseFloat(p1);
                return currentMode === 'DEG' ? Math.cos(val * Math.PI / 180) : Math.cos(val);
            }).replace(/tan\((.*?)\)/g, (match, p1) => {
                const val = parseFloat(p1);
                return currentMode === 'DEG' ? Math.tan(val * Math.PI / 180) : Math.tan(val);
            });

            // Manejar otras funciones matemáticas
            expression = expression.replace(/log\((.*?)\)/g, (match, p1) => Math.log10(parseFloat(p1)))
                .replace(/ln\((.*?)\)/g, (match, p1) => Math.log(parseFloat(p1)))
                .replace(/√\((.*?)\)/g, (match, p1) => Math.sqrt(parseFloat(p1)))
                .replace(/(\d+)!/g, (match, p1) => {
                    let num = parseInt(p1);
                    let result = 1;
                    for(let i = 2; i <= num; i++) result *= i;
                    return result;
                });

            result.value = eval(expression);
        } catch (error) {
            result.value = 'Error';
        }
    };

    // Event listeners para los botones
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            switch(value) {
                case 'C':
                    result.value = '0';
                    break;
                case '=':
                    calculate();
                    break;
                case 'Rad':
                case 'Deg':
                    currentMode = value.toUpperCase();
                    break;
                case 'sin':
                case 'cos':
                case 'tan':
                case 'log':
                case 'ln':
                case '√':
                    updateDisplay(value + '(');
                    break;
                default:
                    updateDisplay(value);
            }
        });
    });
}); 