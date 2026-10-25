module.exports = {
  apps: [
    {
      name: 'air-app',                // Имя вашего приложения в списке PM2
      script: './node_modules/next/dist/bin/next', // Прямой путь к бинарнику Next.js
      args: 'start',                     // Команда для запуска production-сервера
      instances: 1,                      // Рекомендуется 1 для App Router (совместный кэш)
      exec_mode: 'fork',                 // Режим запуска (fork или cluster)
      watch: false,                      // Отключаем слежение, так как файлы меняются при билде
      max_memory_restart: '500M',        // Автоперезапуск при утечке памяти
      env: {
        NODE_ENV: 'production',
        PORT: 3000                       // Порт, на котором будет крутиться приложение
      }
    }
  ]
};
