# BashCrashers MusicApp banners

## Como contribuir

Crea un fork del proyecto, diseña tu banner y abre un PR para fusionar los cambios

## Como crear un banner

- Antes que nada, instala las dependencias: `npm i`

- Para crear un banner debes generar un archivo de javascript (.js) en la carpeta raíz **(es decir, el código que genera el diseño)**, y un archivo .json **(que proporciona metadatos para el banner)**, ambos con el mismo nombre.

Ejemplo:

![Ejemplo](./dir.png)

**Nota sobre el archivo .JS:** Sólo tendrás acceso a las variables definidas en `/typings/index.d.ts`. Si usas VSCode deberías tener ayuda de autocompletado del editor de código los tipos definidos en el archivo mencionado. Esto se debe a que se ejecutan bajo ese "contexto"

## Como probar el banner

Para correr un banner puedes definir datos de prueba en `samples/`. Estos se cargan si se pasan como argumentos al script `npm start`

- Usa: `npm start -- <nombre_del_banner> <sample_artistas> <sample_usuario>`

**Nota:** Los archivos no deben llevar extensión.

## Observaciones a archivos

### Reglas de archivo .js:

1. No hay modulos (import/export)
2. Todo el código debe ser envuelto en una función asíncrona
3. Se debe retornar un buffer obtenido a través de canvas#getBuffer

### Reglas de archivo .json:

1. En producción, por tema de seguridad, las rutas a las fuentes y a la imágenes no pueden moverse de directorio, es decir, es únicamente el nombre del archivo: `./algo.ttf` es incorrecto, mientras que `algo.ttf` es correcto.
2. Para las fuentes no se puede usar otra extensión mas que: `.ttf`

## Campos permitidos en archivo .json

```typescript

```
