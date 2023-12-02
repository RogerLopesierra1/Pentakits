# Instalar con pip install Flask
from flask import Flask, request, jsonify, render_template
#from flask import request
# Instalar con pip install flask-cors
from flask_cors import CORS

# Instalar con pip install mysql-connector-python
import mysql.connector

# Si es necesario, pip install Werkzeug
from werkzeug.utils import secure_filename

# No es necesario instalar, es parte del sistema standard de Python
import os
import time

# -------------------------------------------------------------------
# Definimos la clase producto
# -------------------------------------------------------------------

app = Flask(__name__)
CORS(app)  # Esto habilitará CORS para todas las rutas

#--------------------------------------------------------------------
class Producto:
    #----------------------------------------------------------------
    # Constructor de la clase
    def __init__(self, host, user, password, database):
        # Primero, establecemos una conexión sin especificar la base de datos
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )
        self.cursor = self.conn.cursor()

        # Intentamos seleccionar la base de datos
        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            # Si la base de datos no existe, la creamos
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err

        # Una vez que la base de datos está establecida, creamos la tabla si no existe
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS productos (
            id INT,
            titulo VARCHAR(255) NOT NULL,
            descripcion INT(4) NOT NULL,
            descripcionDetallada DECIMAL(10, 2) NOT NULL,
            precio VARCHAR(255),
            imagen INT(3))''')
        self.conn.commit()

        # Cerrar el cursor inicial y abrir uno nuevo con el parámetro dictionary=True
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)




    # ---------------------------------------------------------------
    # Método para agregar un producto al catálogo
    # ---------------------------------------------------------------
    def agregar_producto(self, id, titulo, descripcion, descripcionDetallada, precio, imagen, nivel):
        # Verificamos si el producto ya existe en el catálogo
        self.cursor.execute(f"SELECT * FROM productos WHERE id = {id}")
        producto_existe = self.cursor.fetchone()

        if producto_existe:
            return False

        
        #Sino existe, agregamos el nuevo producto a la tabla
        sql = f"INSERT INTO productos \
                (id, titulo, descripcion, descripcionDetallada, precio, imagen, nivel) \
                VALUES \
                ({id}, '{titulo}', {descripcion}, {descripcionDetallada}, '{precio}', {imagen}, {nivel})"
        self.cursor.execute(sql)
        self.conn.commit()
        return True



    # ---------------------------------------------------------------
    # Método para consultar un producto por Id
    # ---------------------------------------------------------------   
    def consultar_producto(self, id):
        # Buscamos el producto en la tabla
        self.cursor.execute(f"SELECT * FROM productos WHERE id = {id}")
        return self.cursor.fetchone() #fetchone devuelve un sólo registro


    # ---------------------------------------------------------------
    # Método para modificar los detalles de un producto
    # ---------------------------------------------------------------
    def modificar_producto(self, id, nuevo_titulo, nueva_descripcion, nueva_descripcionDetallada, nuevo_precio, nueva_imagen, nuevo_nivel ):
        
        sql = f"UPDATE productos SET \
                    titulo = '{nuevo_titulo}', \
                    descripcion = {nueva_descripcion}, \
                    descripcionDetallada = {nueva_descripcionDetallada}, \
                    precio = '{nuevo_precio}', \
                    imagen = {nueva_imagen} \
                    nivel = {nuevo_nivel} \
                WHERE id = {id}"
        self.cursor.execute(sql)
        self.conn.commit()
        return self.cursor.rowcount > 0 #rowCount() devuelve el número de filas afectadas por la consulta
        

    # ---------------------------------------------------------------
    # Método para mostrar los detalles de un producto por Id
    # ---------------------------------------------------------------
    def mostrar_producto(self, id):
        # Consultamos el producto por su Id
        producto = self.consultar_producto(id)
        if producto:
            # Imprimimos los detalles del producto
            print("-" * 50)
            print(f"Id.....: {producto['id']}")
            print(f"Titulo: {producto['titulo']}")
            print(f"Descripcion...: {producto['descripcion']}")
            print(f"Descripcion Detallada.....: {producto['descripcionDetallada']}")
            print(f"Precio.....: {producto['precio']}")
            print(f"Imagen..: {producto['imagen']}")
            print(f"Nivel..: {producto['nivel']}")
            print("-" * 50)
        else:
            print("Producto no encontrado.")


    # ---------------------------------------------------------------
    # Método para listar todos los productos en el catálogo
    # ---------------------------------------------------------------
    def listar_productos(self):
        self.cursor.execute("SELECT * FROM productos")
        productos = self.cursor.fetchall()
        return productos



    # ---------------------------------------------------------------
    # Método para eliminar un producto por Id
    # ---------------------------------------------------------------
    def eliminar_producto(self, id):
        self.cursor.execute(f"DELETE FROM productos WHERE id = {id}")
        self.conn.commit()
        return self.cursor.rowcount > 0 #rowCount() devuelve el número de filas afectadas por la consulta
   

# Carpeta para guardar las imagenes.
#RUTA_DESTINO = './static/imagenes/'

#Al subir al servidor, deberá utilizarse la siguiente ruta. USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
RUTA_DESTINO = '/home/lph2023/mysite/static/imagenes'

# Crear una instancia de la clase Catalogo

producto = Producto(host='lph2023.mysql.pythonanywhere-services.com', user='lph2023', password='Jmdbcwoehdeijd8398', database='lph2023$pentakits')

#--------------------------------------------------------------------
# Listar todos los productos
#--------------------------------------------------------------------
#La ruta Flask /productos con el método HTTP GET está diseñada para proporcionar los detalles de todos los productos almacenados en la base de datos.
#El método devuelve una lista con todos los productos en formato JSON.
@app.route("/productos", methods=["GET"])
def listar_productos():
    productos = producto.listar_productos()
    return jsonify(productos)


#--------------------------------------------------------------------
# Mostrar un sólo producto según su código
#--------------------------------------------------------------------
#La ruta Flask /productos/<int:id> con el método HTTP GET está diseñada para proporcionar los detalles de un producto específico basado en su código.
#El método busca en la base de datos el producto con el código especificado y devuelve un JSON con los detalles del producto si lo encuentra, o None si no lo encuentra.
@app.route("/productos/<int:id>", methods=["GET"])
def mostrar_producto(id):
    producto = producto.consultar_producto(id)
    if producto:
        return jsonify(producto), 201
    else:
        return "Producto no encontrado", 404


#--------------------------------------------------------------------
# Agregar un producto
#--------------------------------------------------------------------
@app.route("/productos", methods=["POST"])
#La ruta Flask `/productos` con el método HTTP POST está diseñada para permitir la adición de un nuevo producto a la base de datos.
#La función agregar_producto se asocia con esta URL y es llamada cuando se hace una solicitud POST a /productos.
def agregar_producto():
    #Recojo los datos del form
    id = request.form['id'] 
    titulo = request.form['titulo']
    descripcion = request.form['descripcion']
    descripcionDetallada = request.form['descripcionDetallada']
    precio = request.form['precio']
    imagen = request.files['imagen']
    nivel = request.form['nivel']  
    nombre_imagen=""

    # Me aseguro que el producto exista
    producto = producto.consultar_producto(id)
    if not producto: # Si no existe el producto...
        # Genero el nombre de la imagen
        nombre_imagen = secure_filename(imagen.filename) #Chequea el nombre del archivo de la imagen, asegurándose de que sea seguro para guardar en el sistema de archivos
        nombre_base, extension = os.path.splitext(nombre_imagen) #Separa el nombre del archivo de su extensión.
        nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}" #Genera un nuevo nombre para la imagen usando un timestamp, para evitar sobreescrituras y conflictos de nombres.
        
        #Se agrega el producto a la base de datos
        if  producto.agregar_producto(id, titulo, descripcion, descripcionDetallada, precio, imagen, nivel):
            imagen.save(os.path.join(RUTA_DESTINO, nombre_imagen))

            #Si el producto se agrega con éxito, se devuelve una respuesta JSON con un mensaje de éxito y un código de estado HTTP 201 (Creado).
            return jsonify({"mensaje": "Producto agregado correctamente.", "imagen": nombre_imagen}), 201
        else:
            #Si el producto no se puede agregar, se devuelve una respuesta JSON con un mensaje de error y un código de estado HTTP 500 (Internal Server Error).
            return jsonify({"mensaje": "Error al agregar el producto."}), 500

    else:
        #Si el producto ya existe (basado en el código), se devuelve una respuesta JSON con un mensaje de error y un código de estado HTTP 400 (Solicitud Incorrecta).
        return jsonify({"mensaje": "Producto ya existe."}), 400
    

#--------------------------------------------------------------------
# Modificar un producto según su código
#--------------------------------------------------------------------
@app.route("/productos/<int:id>", methods=["PUT"])
#La ruta Flask /productos/<int:id> con el método HTTP PUT está diseñada para actualizar la información de un producto existente en la base de datos, identificado por su código.
#La función modificar_producto se asocia con esta URL y es invocada cuando se realiza una solicitud PUT a /productos/ seguido de un número (el código del producto).
def modificar_producto(id):
    #Se recuperan los nuevos datos del formulario
    nuevo_titulo = request.form.get("titulo")
    nueva_descripcion = request.form.get("descripcion")
    nueva_descripcionDetallada = request.form.get("descripcionDetallada")
    nuevo_precio = request.form.get("precio")
    nuevo_nivel = request.form.get("nivel")
    imagen = request.files['imagen']

    # Procesamiento de la imagen
    nombre_imagen = secure_filename(imagen.filename) #Chequea el nombre del archivo de la imagen, asegurándose de que sea seguro para guardar en el sistema de archivos
    nombre_base, extension = os.path.splitext(nombre_imagen) #Separa el nombre del archivo de su extensión.
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}" #Genera un nuevo nombre para la imagen usando un timestamp, para evitar sobreescrituras y conflictos de nombres.

    # Busco el producto guardado
    producto = producto = producto.consultar_producto(id)
    if producto: # Si existe el producto...
        imagen_vieja = producto["imagen_url"]
        # Armo la ruta a la imagen
        ruta_imagen = os.path.join(RUTA_DESTINO, imagen_vieja)

        # Y si existe la borro.
        if os.path.exists(ruta_imagen):
            os.remove(ruta_imagen)
    
    # Se llama al método modificar_producto pasando el id del producto y los nuevos datos.
    if producto.modificar_producto(id, nuevo_titulo, nueva_descripcion, nueva_descripcionDetallada, nuevo_precio, nueva_imagen, nuevo_nivel):
        #La imagen se guarda en el servidor.
        imagen.save(os.path.join(RUTA_DESTINO, nombre_imagen))

        #Si la actualización es exitosa, se devuelve una respuesta JSON con un mensaje de éxito y un código de estado HTTP 200 (OK).
        return jsonify({"mensaje": "Producto modificado"}), 200
    else:
        #Si el producto no se encuentra (por ejemplo, si no hay ningún producto con el código dado), se devuelve un mensaje de error con un código de estado HTTP 404 (No Encontrado).
        return jsonify({"mensaje": "Producto no encontrado"}), 403



#--------------------------------------------------------------------
# Eliminar un producto según su código
#--------------------------------------------------------------------
@app.route("/productos/<int:id>", methods=["DELETE"])
#La ruta Flask /productos/<int:id> con el método HTTP DELETE está diseñada para eliminar un producto específico de la base de datos, utilizando su código como identificador.
#La función eliminar_producto se asocia con esta URL y es llamada cuando se realiza una solicitud DELETE a /productos/ seguido de un número (el código del producto).
def eliminar_producto(id):
    # Busco el producto en la base de datos
    producto = producto.consultar_producto(id)
    if producto: # Si el producto existe, verifica si hay una imagen asociada en el servidor.
        imagen_vieja = producto["imagen_url"]
        # Armo la ruta a la imagen
        ruta_imagen = os.path.join(RUTA_DESTINO, imagen_vieja)

        # Y si existe, la elimina del sistema de archivos.
        if os.path.exists(ruta_imagen):
            os.remove(ruta_imagen)

        # Luego, elimina el producto del catálogo
        if producto.eliminar_producto(id):
            #Si el producto se elimina correctamente, se devuelve una respuesta JSON con un mensaje de éxito y un código de estado HTTP 200 (OK).
            return jsonify({"mensaje": "Producto eliminado"}), 200
        else:
            #Si ocurre un error durante la eliminación (por ejemplo, si el producto no se puede eliminar de la base de datos por alguna razón), se devuelve un mensaje de error con un código de estado HTTP 500 (Error Interno del Servidor).
            return jsonify({"mensaje": "Error al eliminar el producto"}), 500
    else:
        #Si el producto no se encuentra (por ejemplo, si no existe un producto con el id proporcionado), se devuelve un mensaje de error con un código de estado HTTP 404 (No Encontrado). 
        return jsonify({"mensaje": "Producto no encontrado"}), 404

#--------------------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)


#Productos Inicial
    agregar_producto(1,'Kit_RoboMente',50000,'Programación física con tarjetas','','Iko-inical.jpg','Inicial')
    agregar_producto(2,'Kit_Circuitito',50000,'Programación física con tarjetas y app','','kinderbot-inicial.jpg','Inicial')
    agregar_producto(3,'Kit_TechBot',50000,'Programación física con tarjetas y app','','Cuerpo_2.jpg.jpg','Inicial')
    agregar_producto(4,'Kit_RoboGenio',50000,'Programación física con tarjetas y app','','producto_4_inicial.png','Inicial')
    agregar_producto(5,'Kit_BitBuddy',50000,'Programación física con tarjetas y app','','producto_5_inicial.png','Inicial')
    
#Productos Primaria
    agregar_producto(6,'Kit_MakeBlock',50000,'Kit STEAM de robótica basado en Arduino','','MakeBlock_Portada.jpg','Primario')
    agregar_producto(7,'Kit_RoboPro',88000,'Placa base basada en Arduino Mega 2560 con 10 puertos de expansión','','productos_2_primario.png','Primario')
    agregar_producto(8,'Kit_mBot_Ranger',98000,'Programación física con tarjetas. App para programar.','','producto_3_primario.png','Primario')
    agregar_producto(9,'Kit_CubeBot',99000,'Kit con ladrillo inteligente R2','producto_4_primario.png','','Primario')
    agregar_producto(10,'Kit_501',150000,'Kit con ladrillo inteligente R8','producto_5_primario.png','','Primario')
    
#Productos Secundaria
    agregar_producto(11,'Kit_Arduino_Uno',50000,'Kit STEAM de robótica basado en Arduino','ArduinoPortada 1.png','','Secundario')
    agregar_producto(12,'Kit_504,50000',88000,'Placa base basada en Arduino Mega 2560 con 10 puertos de expansión','','Mis Ladrillos Kit 504 Portada.jpg','Secundario')
    agregar_producto(13,'Kit_OKI_Plus',98000,'Programación física con tarjetas. App para programar','', 'Lego Spike Expansion Detalle 1.jpg','Secundario')
    agregar_producto(14,'Kit_RoboSphare',99000,'Programación física con tarjetas. App para programar','','Lego Spike Detalle 1.jpg','Secundario')
    agregar_producto(15,'Kit_MechMaster',150000,'Programación física con tarjetas. App para programar','','Cuerpo 3.png','Secundario')
    