# Solución para la Gestión de Productos y Carrito de Compras

## Descripción

Para construir una API básica que gestione productos y un carrito de compras, utilicé un enfoque simple utilizando un archivo JSON estático que simula una base de datos. Este enfoque me permitió crear los servicios necesarios de forma rápida y sencilla.

## Implementación

### 1. **Simulación de la Base de Datos con JSON Estático**
  
En lugar de utilizar una base de datos real, utilicé un archivo `products.json` para simular el almacenamiento de los productos. Este archivo contiene un arreglo de objetos, donde cada objeto representa un producto con sus detalles, como nombre, precio y descripción.

Ejemplo de `products.json`:
```json
[
  {
    "id": 1,
    "name": "Producto 1",
    "price": 100,
  },
  {
    "id": 2,
    "name": "Producto 2",
    "price": 150,
  }
]
```
2. Servicio GET para Obtener Productos
El servicio GET para los productos permite a los usuarios consultar todos los productos disponibles en la "base de datos" simulada. Implementé este servicio utilizando Express, y el resultado se devuelve en formato JSON.

Ruta:

```javascript
router.get('/', (req, res) => {
    res.send(products);
});
```
3. Servicios GET y POST para el Carrito de Compras
El carrito de compras también fue gestionado utilizando un JSON estático que actúa como una sesión temporal para almacenar los productos añadidos. Implementé dos servicios para gestionar el carrito:

GET para obtener los productos en el carrito:

Ruta:

```javascript
router.get('/', (req, res) => {
    res.json({ cart });
});
```
POST para agregar productos al carrito:

Ruta:

```javascript
router.post('/:id', (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
        return res.status(400).json({ message: 'El ID proporcionado no es válido' });
    }

    const product = products.find((prod) => prod.id === parsedId);

    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const isProductInCart = cart.some((item) => item.id === parsedId);

    if (!isProductInCart) {
        cart.push(product);
        return res.status(201).json({
            message: `Producto con ID ${parsedId} agregado al carrito`,
            cart,
        });
    } else {
        return res.status(400).json({
            message: `El producto con ID ${parsedId} ya está en el carrito`,
            cart,
        });
    }
});
```
4. Simulación de Persistencia de Datos
Dado que no estamos utilizando una base de datos real, la persistencia de los datos en el carrito es temporal y solo se mantiene durante la ejecución del servidor. Si se reinicia el servidor, el carrito se restablecerá.

Este enfoque permitió crear una API funcional para gestionar productos y un carrito de compras utilizando un archivo JSON estático como simulación de base de datos. Aunque es una solución simple, es efectiva para proyectos pequeños o como base para futuras implementaciones con bases de datos reales.


# Guía de Despliegue para Proyecto Express en un VPS

## Paso 1: Subir el Proyecto Express al VPS

### Clonar el repositorio o subir el código:
Clona tu repositorio desde Git o sube tu código al VPS utilizando FTP/SFTP:

```bash
git clone <URL-del-repositorio>
cd <nombre-del-repositorio>
```
Si estás subiendo el código manualmente, asegúrate de copiar todos los archivos de tu proyecto al VPS.

Paso 2: Instalar las Dependencias
Una vez dentro del directorio del proyecto, instala todas las dependencias necesarias para tu proyecto Express:

```bash
npm install
```
Esto instalará todas las bibliotecas y dependencias que tu aplicación necesita para ejecutarse.

Paso 3: Configurar Variables de Entorno
Si tu aplicación Express requiere variables de entorno (como claves de API, base de datos, etc.), crea un archivo .env en la raíz del proyecto. Este archivo puede contener configuraciones como las siguientes:
```bash
PORT=3000
DB_HOST=localhost
DB_USER=usuario
DB_PASS=contraseña
```
Asegúrate de que tu código de Express lea estas variables correctamente usando process.env.

Paso 4: Iniciar el Servidor Express
Para iniciar tu aplicación, puedes usar el comando node o npm start. Si deseas que tu aplicación se ejecute en segundo plano y se reinicie automáticamente en caso de fallos, se recomienda utilizar pm2.

Instalar pm2 (si no lo tienes):
```bash
sudo npm install -g pm2
```
Iniciar la aplicación con pm2:
```bash
pm2 start app.js --name "express-app"
```
Esto mantendrá tu aplicación en ejecución incluso si se reinicia el servidor o si la aplicación se cae por algún motivo.

Paso 5: Abrir Puertos en el VPS
Asegúrate de que el puerto en el que tu aplicación Express está corriendo (por ejemplo, el puerto 3000) esté abierto en el firewall del VPS para que sea accesible desde internet.

Permitir el puerto en el firewall:
```bash
sudo ufw allow 3000
```
Si tu aplicación está utilizando otro puerto, reemplaza el 3000 con el puerto correspondiente.

Paso 6: Configurar un Dominio (Opcional)
Si tienes un dominio, apunta los registros DNS de tu dominio al IP de tu VPS. Luego puedes configurar un servidor web como Nginx para que funcione como un proxy inverso y redirija el tráfico hacia tu aplicación Express, haciéndola accesible en el puerto 80 o 443 (HTTPS).

Ejemplo de configuración de Nginx (opcional):
```bash
nginx
server {
    listen 80;
    server_name <tu-dominio-o-ip>;

    location / {
        proxy_pass http://localhost:3000;  # El puerto donde está corriendo Express
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Reiniciar Nginx:
```bash
sudo systemctl restart nginx
```
Con esto, tu aplicación Express debería estar correctamente desplegada y funcionando en el VPS.
