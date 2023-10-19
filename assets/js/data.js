// Array de fotos

let fotos = [
    "../assets/images/Iko-inicial.jpg",
    "../assets/images/Iko-inicial.jpg",
    "../assets/images/Iko-inicial.jpg",
    "../assets/images/Iko-inicial.jpg",
    "../assets/images/Iko-inicial.jpg",
    "../assets/images/Iko-inicial.jpg",
    "../assets/images/Iko-inicial.jpg",
    "../assets/images/Iko-inicial.jpg",
    "../assets/images/Iko-inicial.jpg",
    "../assets/images/Iko-inicial.jpg",
    "../assets/images/Iko-inicial.jpg",
    "../assets/images/Iko-inicial.jpg",
    "../assets/images/Iko-inicial.jpg",
    "../assets/images/Iko-inicial.jpg",
    "../assets/images/Iko-inicial.jpg",
    "../assets/images/Iko-inicial.jpg",
    "../assets/images/Iko-inicial.jpg",
]

//Array de Objetos

let data = [
    {
        "id": 1,
        "titulo": "Kit RoboMente",
        "precio": 50000,
        "descripcion": "Programación física con tarjetas. App para programar.",
        "descripcionDetallada":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.",
        "image": "../assets/images/Iko-inicial.jpg",
        "nivel": 1
    },
    {
        "id": 2,
        "titulo": "Kit Circuitito",
        "precio": 50000,
        "descripcion": "Programación física con tarjetas. App para programar.",
        "descripcionDetallada":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.",
        "image": "../assets/images/Cuerpo 1.png",
        "nivel": 1
    },
    {
        "id": 3,
        "titulo": "Kit TechBot",
        "precio": 50000,
        "descripcion": "Programación física con tarjetas. App para programar.",
        "descripcionDetallada":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.",
        "image": "../assets/images/Cuerpo 2.jpg",
        "nivel": 1
    },
    {
        "id": 4,
        "titulo": "Kit RoboGenio",
        "precio": 50000,
        "descripcion": "Programación física con tarjetas. App para programar.",
        "descripcionDetallada":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.",
        "image": "../assets/images/Cuerpo 3.png",
        "nivel": 1
    },
    {
        "id": 5,
        "titulo": "Kit BitBuddy",
        "precio": 50000,
        "descripcion": "Programación física con tarjetas. App para programar.",
        "descripcionDetallada":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.",
        "image": "../assets/images/kinderbot-inicial.jpg",
        "nivel": 1
    },
    {
        "id": 6,
        "titulo": "Kit RoboSpark",
        "precio": 50000,
        "descripcion": "Programación física con tarjetas. App para programar.",
        "descripcionDetallada":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.",
        "image": "../assets/images/Iko-inicial.jpg",
        "nivel": 1
    },
    {
        "id": 7,
        "titulo": "Kit MakeBlock",
        "precio": 50000,
        "descripcion": "Kit STEAM de robótica basado en Arduino",
        "descripcionDetallada":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.",
        "image": "../assets/images/Lego Spike Expansion Detalle 1.jpg",
        "nivel": 2
    },
    {
        "id": 8,
        "titulo": "Kit RoboPro",
        "precio": 88000,
        "descripcion": "Placa base basada en Arduino Mega 2560 con 10 puertos de expansión",
        "descripcionDetallada":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.",
        "image": "../assets/images/Mis Ladrillos Kit 504 Portada.jpg",
        "nivel": 2
    },
    {
        "id": 9,
        "titulo": "Kit mBot Ranger",
        "precio": 98000,
        "descripcion": "Programación física con tarjetas. App para programar.",
        "descripcionDetallada":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.",
        "image": "../assets/images/Portada 2.png",
        "nivel": 2
    },
    {
        "id": 10,
        "titulo": "Kit CubeBot",
        "precio": 99000,
        "descripcion": "Programación física con tarjetas. App para programar.",
        "descripcionDetallada":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.",
        "image": "../assets/images/Mis Ladrillos Kit 503 Portada.jpg",
        "nivel": 2
    },
    {
        "id": 11,
        "titulo": "Kit 501 - ML",
        "precio": 150000,
        "descripcion": "Programación física con tarjetas. App para programar.",
        "descripcionDetallada":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.",
        "image": "../assets/images/Portada 2.png",
        "nivel": 2
    },
    {
        "id": 12,
        "titulo": "Kit CyberGenius",
        "precio": 250000,
        "descripcion": "2 el ladrillo inteligente",
        "descripcionDetallada":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.",
        "image": "../assets/images/Iko-inicial.jpg",
        "nivel": 2
    },
    {
        "id": 13,
        "titulo": "Kit Arduino Uno",
        "precio": 50000,
        "descripcion": "Kit STEAM de robótica basado en Arduino",
        "descripcionDetallada":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.",
        "image": "../assets/images/Iko-inicial.jpg",
        "nivel": 3
    },
    {
        "id": 14,
        "titulo": "Kit 504 - ML",
        "precio": 88000,
        "descripcion": "Placa base basada en Arduino Mega 2560 con 10 puertos de expansión",
        "descripcionDetallada":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.",
        "image": "../assets/images/Iko-inicial.jpg",
        "nivel": 3
    },
    {
        "id": 15,
        "titulo": "Kit OKI Plus",
        "precio": 98000,
        "descripcion": "Programación física con tarjetas. App para programar.",
        "descripcionDetallada":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.",
        "image": "../assets/images/Iko-inicial.jpg",
        "nivel": 3
    },
    {
        "id": 16,
        "titulo": "Kit RoboSphare",
        "precio": 99000,
        "descripcion": "Programación física con tarjetas. App para programar.",
        "descripcionDetallada":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.",
        "image": "../assets/images/Iko-inicial.jpg",
        "nivel": 3
    },
    {
        "id": 17,
        "titulo": "Kit MechMaster",
        "precio": 150000,
        "descripcion": "Programación física con tarjetas. App para programar.",
        "descripcionDetallada":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.",
        "image": "../assets/images/Iko-inicial.jpg",
        "nivel": 3
    },
    {
        "id": 18,
        "titulo": "Kit AutomatoX",
        "precio": 250000,
        "descripcion": "2 el ladrillo inteligente",
        "descripcionDetallada":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.",
        "image": "../assets/images/Iko-inicial.jpg",
        "nivel": 3
    },
    

]
