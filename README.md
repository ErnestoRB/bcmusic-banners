# BashCrashers MusicApp banners

## Como contribuir

Crea un fork del proyecto y abre un PR para fusionar los cambios

## Como crear un banner

Antes que nada, instala las dependencias: `npm i`
Para crear un banner debes generar un archivo de javascript (.js) en la carpeta raíz, y un archivo .json, ambos con el mismo nombre.
Sólo tendrás acceso a las variables definidas en `/typings/index.d.ts`. Si usas VSCode deberás tener ayuda del editor de código para ayudarte con los tipos.

Reglas de archivo .js:

1. No hay modulos
2. La última sentencia debe ser canvas#getBuffer
3. No usar código asíncrono

Reglas de archivo .json:

1. Las rutas a las imagenes no pueden moverse de directorio, es decir, es únicamente el nombre del archivo: `./algo.ttf` es incorrecto, mientras que `algo.ttf` es correcto.
2. No se puede usar otra extensión mas que: `.ttf`
