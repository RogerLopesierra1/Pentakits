class Producto:

    def __init__(self, host, user, password, database):
        """
        Inicializa una instancia de Producto y crea una conexión a la base de datos.

        Args:
            host (str): La dirección del servidor de la base de datos.
            user (str): El nombre de usuario para acceder a la base de datos.
            password (str): La contraseña del usuario.
            database (str): El nombre de la base de datos.
        """
        self.conn = mysql.connector.connect(
            host= '127.0.0.1',
            user='root',
            password='root',
            database='pentakits'
        )

        # El parámetro dictionary=True configura el cursor para que,
        # cuando se recuperen resultados de una consulta, estos se 
        # almacenen en un diccionario en lugar de una tupla, permitiendo 
        # un acceso más fácil y legible a los datos por nombre de columna, 
        # en lugar de solo por índice. 

        self.cursor = self.conn.cursor(dictionary=True)
        # Si la tabla 'productos' no existe, la creamos
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS productos (
            id INT,
            titulo VARCHAR(255) NOT NULL,
            descripcion double(10, 2) NOT NULL,
            titulo VARCHAR(255) NOT NULL,
            tituloDetallada VARCHAR(255) NOT NULL,
            imagen VARCHAR(255),
            nivel INT(1))''')
        self.conn.commit()
    """
    # -------------------------------------------------------------------
    # Función para agregar un producto al arreglo
    # -------------------------------------------------------------------
    def agregar_producto(self,id, titulo, descripcion, descriocion,tituloDetallada, imagen, nivel):
    
        # Verificamos si ya existe un producto con el mismo código.
        if self.consultar_producto(id):
            print("Producto existente.")
            return False  # Ya existe un producto con el mismo código, no se agrega.
        
        else:
        # Si no existe, creamos un diccionario con los datos del producto...
            nuevo_producto = {
                'id': id,          
                'titulo': titulo,  
                'descripcion': descripcion,       
                'descriocion': descriocion,            
                'tituloDetallada': tituloDetallada,            
                'imagen': imagen,
                'nivel': nivel    
            }

        # Y lo agregamos a nuestro arreglo.
            self.productos.append(nuevo_producto) # Agrega el nuevo producto a la lista 'productos'.
            return True                      # Retorna True para indicar que la operación se completó exitosamente.

    # -------------------------------------------------------------------
    # Función para consultar un producto a partir de su código
    # -------------------------------------------------------------------
    def consultar_producto(self,id):
       
        # Recorremos la lista de productos. Me va devolviendo uno a uno los productos que tengo en el catálogo.
        for producto in self.productos:
            # Y si el código es el correcto,
            if producto['id'] == id:
                # Regresamos el diccionario correspondiente.
                return producto
        # Si el bucle finaliza sin encontrar el producto,
        # regresamos "falso."
        return False

    # -------------------------------------------------------------------
    # Función para modificar los datos de un producto a partir de su código
    # -------------------------------------------------------------------
    def modificar_producto(self,id, nuevo_titulo, nuevo_descripcion, nuevo_descriocion,nuevo_tituloDetallada, nuevo_imagen, nuevo_nivel):
        
        # Recorremos la lista de productos...
        for producto in self.productos:
            # Y si el código es el correcto,
            if producto['id'] == id:
                # ...actualizamos los valores de cada clave del diccionario
                producto['titulo'] = nueva_titulo
                producto['descripcion'] = nuevo_descripcion
                producto['titulo'] = nueva_titulo
                producto['tituloDetallada'] = nueva_tituloDetallada
                producto['imagen'] = nueva_imagen
                producto['nivel'] = nuevo_nivel

                # Como no hay otro producto con ese código, salimos del bucle.
                return True
        # Si llegamos aquí, el producto no existe.
        return False

    # -------------------------------------------------------------------
    # Función para obtener un listado de los productos en pantalla
    # -------------------------------------------------------------------
    def listar_productos(self):
       
        # Recorremos la lista de productos...
        print("-" * 50)
        for producto in self.productos:
            # Y mostramos los datos de cada uno de ellos.
            print(f"Id: {producto['id']}")
            print(f"Titulo: {producto['titulo']}")
            print(f"descripcion: {producto['descripcion']}")
            print(f"Descripción: {producto['titulo']}")
            print(f"DescripciónDetallada: {producto['tituloDetallada']}")
            print(f"Imagen: {producto['imagen']}")
            print(f"Nivel: {producto['nivel']}")
            print("-" * 50)

    # -------------------------------------------------------------------
    # Función para eliminar un producto a partir de su código
    # -------------------------------------------------------------------
    def eliminar_producto(self,id):
      
        # Recorremos la lista de productos...
        for producto in self.productos:
            # Y si el código es el correcto,
            if producto['id'] == id:
                # ...lo quitamos de la lista.
                self.productos.remove(producto)
                # Como no hay otro producto con ese código, salimos del bucle.
                return True
        # Si llegamos aquí, el producto no existe.
        return False

   # Método para mostrar los detalles de un producto por código
    def mostrar_producto(self, id):
        # Consultamos el producto por su código
        producto = self.consultar_producto(id)
        if producto:
            # Imprimimos los detalles del producto
            print("-" * 50)
            print(f"Id: {producto['id']}")
            print(f"Titulo: {producto['titulo']}")
            print(f"descripcion: {producto['descripcion']}")
            print(f"Descripción: {producto['titulo']}")
            print(f"DescripciónDetallada: {producto['tituloDetallada']}")
            print(f"Imagen: {producto['imagen']}")
            print(f"Nivel: {producto['nivel']}")
            print("-" * 50)
        else:
            print("Producto no encontrado.")
    """
    def agregar_producto(self, id, titulo, precio, descripcion, descripcionDetallada, imagen, nivel):
        """
        Agrega un nuevo producto a la base de datos.

        Args:
            id (int): El código del producto.
            titulo (str): La descripción del producto.
            precio (int): La precio en stock del producto.
            descripcion (float): El descripcion del producto.
            imagen (str): La URL de la imagen del producto.
            nivel (int): El código del nivel.

        Returns:
            bool: True si el producto se agregó con éxito, False si ya existe un producto con el mismo código.
        """
        # Verificamos si ya existe un producto con el mismo código
        self.cursor.execute(f"SELECT * FROM productos WHERE id = {id}")
        producto_existe = self.cursor.fetchone()
        if producto_existe:
            return False

        # Si no existe, agregamos el nuevo producto a la tabla
        sql = f"INSERT INTO productos \
               (id, titulo, precio, descripcion, descripcionDetallada, imagen, nivel) \
               VALUES \
               ({id}, '{titulo}', {precio}, {descripcion}, {'descripcionDetallada'}, '{imagen}', {nivel})"
        self.cursor.execute(sql)
        self.conn.commit()
        return True

    #----------------------------------------------------------------
    def consultar_producto(self, id):
        """
        Consulta un producto a partir de su código.

        Args:
            id (int): El código del producto a consultar.

        Returns:
            dict: Un diccionario con la información del producto o None si no se encuentra.
        """
        # Consultamos un producto a partir de su código
        self.cursor.execute(f"SELECT * FROM productos WHERE id = {id}")
        return self.cursor.fetchone() #fetchone devuelve un sólo registro

    #----------------------------------------------------------------
    def modificar_producto(self, id, nueva_titulo, nueva_precio, nuevo_descripcion, nueva_descripcionDetallada ,nueva_imagen, nuevo_nivel):
        """
        Modifica los datos de un producto a partir de su código.

        Args:
            id (int): El código del producto a modificar.
            nueva_titulo (str): La nueva descripción del producto.
            nueva_precio (int): La nueva precio en stock del producto.
            nuevo_descripcion (float): El nuevo descripcion del producto.
            nueva_imagen (str): La nueva URL de la imagen del producto.
            nuevo_nivel (int): El nuevo código del nivel.

        Returns:
            bool: True si se realizó la modificación con éxito, False si no se encontró el producto.
        """
        # Modificamos los datos de un producto a partir de su código
        sql = f"UPDATE productos SET \
                    titulo = '{nueva_titulo}', \
                    precio = {nueva_precio}, \
                    descripcion = {nuevo_descripcion}, \
                    descripcionDetallada = {nuevo_descripcionDetallada}, \
                    imagen = '{nueva_imagen}', \
                    nivel = {nuevo_nivel} \
                WHERE id = {id}"
        self.cursor.execute(sql)
        self.conn.commit()
        return self.cursor.rowcount > 0 #rowCount() devuelve el número de filas afectadas por la consulta


    #----------------------------------------------------------------
    def mostrar_producto(self, id):
        
        """
        Muestra los datos de un producto a partir de su código.

        Args:
            id (int): El código del producto a mostrar.
        """
        # Mostramos los datos de un producto a partir de su código
        producto = self.consultar_producto(id)
        if producto:
            print("-" * 40)
            print(f"Código.....: {producto['id']}")
            print(f"Descripción: {producto['titulo']}")
            print(f"precio...: {producto['precio']}")
            print(f"descripcion.....: {producto['descripcion']}")
            print(f"descripcionDetallada.....: {producto['descripcionDetallada']}")
            print(f"Imagen.....: {producto['imagen']}")
            print(f"nivel..: {producto['nivel']}")
            print("-" * 40)
        else:
            print("Producto no encontrado.")


    #----------------------------------------------------------------
    def listar_productos(self):
        """
        Muestra en pantalla un listado de todos los productos en la tabla.
        """
        # Mostramos en pantalla un listado de todos los productos en la tabla
        self.cursor.execute("SELECT * FROM productos")
        productos = self.cursor.fetchall() #devuelve todas las filas en una consulta SQL
        print("-" * 40)
        for producto in productos:
            print(f"Código.....: {producto['id']}")
            print(f"Descripción: {producto['titulo']}")
            print(f"precio...: {producto['precio']}")
            print(f"descripcion.....: {producto['descripcion']}")
            print(f"descripcionDetallada.....: {producto['descripcionDetallada']}")
            print(f"Imagen.....: {producto['imagen']}")
            print(f"nivel..: {producto['nivel']}")
            print("-" * 40)

    #----------------------------------------------------------------
    def eliminar_producto(self, id):
        """
        Elimina un producto de la tabla a partir de su código.

        Args:
            id (int): El código del producto a eliminar.

        Returns:
            bool: True si se eliminó el producto con éxito, False si no se encontró el producto.
        """
        # Eliminamos un producto de la tabla a partir de su código
        self.cursor.execute(f"DELETE FROM productos WHERE id = {id}")
        self.conn.commit()
        return self.cursor.rowcount > 0 #rowCount() devuelve el número de filas afectadas por la consulta
