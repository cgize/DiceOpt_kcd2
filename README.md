# Optimizador de Dados para Farkle

Herramienta para determinar la mejor combinación de dados en el juego Farkle.

## Cómo Usar
1. Selecciona dados de la lista desplegable
2. Haz clic en "Añadir Dado" para agregarlos a tu pool
3. Haz clic en "Calcular Mejor Combinación" para iniciar la simulación
4. Espera los resultados (se mostrarán las 20 mejores combinaciones)

## Características
- Simula 5000 tiradas por combinación
- Considera todas las reglas oficiales de puntuación
- Optimizado para rendimiento usando Web Workers
- Soporta hasta 6 dados en combinaciones

## Reglas de Puntuación Implementadas
- Singles: 1 = 100pts, 5 = 50pts
- Triples y combinaciones múltiples
- Escaleras parciales y completas
- Bonus por 4+ dados iguales