"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Phone, MapPin, Facebook, Instagram, MenuIcon, Star, Heart, Flame } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

export default function LaCasaDeMarta() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showTerminos, setShowTerminos] = useState(false)
  const [orderForm, setOrderForm] = useState({
    nombre: "",
    direccion: "",
    celular: "",
    platos: [] as Array<{ nombre: string; precio: string; cantidad: number }>,
    metodoPago: "",
  })

  const platosDisponibles = [
    { id: "aji-gallina", nombre: "Ají de Gallina", precio: "S/.12.00", disponible: true },
    { id: "lentejitas-seco", nombre: "Lentejitas con Seco de Res", precio: "S/.13.00", disponible: true },
    { id: "tallarines-verdes", nombre: "Tallarines Verdes con Bistec", precio: "S/.14.00", disponible: true },
    { id: "arroz-pollo", nombre: "Arroz con Pollo Frito", precio: "S/.11.00", disponible: false },
    { id: "lomo-saltado", nombre: "Lomo Saltado", precio: "S/.12.00", disponible: false },
    // { id: "arroz-pollo", nombre: "Arroz con Pollo", precio: "S/.11.00", disponible: true },
  ]

  const agregarPlato = (platoId: string) => {
    const plato = platosDisponibles.find((p) => p.id === platoId)
    if (plato && plato.disponible) {
      const platoExistente = orderForm.platos.find((p) => p.nombre === plato.nombre)
      if (platoExistente) {
        setOrderForm({
          ...orderForm,
          platos: orderForm.platos.map((p) => (p.nombre === plato.nombre ? { ...p, cantidad: p.cantidad + 1 } : p)),
        })
      } else {
        setOrderForm({
          ...orderForm,
          platos: [...orderForm.platos, { nombre: plato.nombre, precio: plato.precio, cantidad: 1 }],
        })
      }
    }
  }

  const actualizarCantidadPlato = (nombrePlato: string, nuevaCantidad: number) => {
    if (nuevaCantidad === 0) {
      setOrderForm({
        ...orderForm,
        platos: orderForm.platos.filter((p) => p.nombre !== nombrePlato),
      })
    } else {
      setOrderForm({
        ...orderForm,
        platos: orderForm.platos.map((p) => (p.nombre === nombrePlato ? { ...p, cantidad: nuevaCantidad } : p)),
      })
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar celular (exactamente 9 dígitos)
    if (!/^\d{9}$/.test(orderForm.celular)) {
      alert("El celular debe tener exactamente 9 números")
      return
    }

    const platosTexto = orderForm.platos.map((p) => `• ${p.nombre} - ${p.precio} (Cantidad: ${p.cantidad})`).join("\n")

    const total = orderForm.platos.reduce((sum, plato) => {
      const precio = Number.parseFloat(plato.precio.replace("S/.", ""))
      return sum + precio * plato.cantidad
    }, 0)

    const message = `Hola, quiero hacer un pedido de almuerzo a La Casa de Marta:

📝 *Datos del pedido:*
• Nombre: ${orderForm.nombre}
• Dirección: ${orderForm.direccion}
• Celular: ${orderForm.celular}
• Método de pago: ${orderForm.metodoPago}

🍽️ *Platos pedidos:*
${platosTexto}

💰 *Total: S/.${total.toFixed(2)}*

¡Gracias!`

    const whatsappUrl = `https://wa.me/51946499267?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const Navigation = () => (
    <nav className="flex items-center space-x-8">
      <button
        onClick={() => scrollToSection("inicio")}
        className="text-amber-800 hover:text-red-600 transition-colors font-medium"
      >
        Inicio
      </button>
      <button
        onClick={() => scrollToSection("menu")}
        className="text-amber-800 hover:text-red-600 transition-colors font-medium"
      >
        Menú
      </button>
      <button
        onClick={() => scrollToSection("cocina")}
        className="text-amber-800 hover:text-red-600 transition-colors font-medium"
      >
        Nuestra Cocina
      </button>
      <button
        onClick={() => scrollToSection("pedidos")}
        className="text-amber-800 hover:text-red-600 transition-colors font-medium"
      >
        Pedidos
      </button>
      <button
        onClick={() => scrollToSection("contacto")}
        className="text-amber-800 hover:text-red-600 transition-colors font-medium"
      >
        Contacto
      </button>
    </nav>
  )

  const renderMenuItems = () => {
    const menuItems = [
      {
        id: "aji-gallina",
        nombre: "Ají de Gallina",
        precio: "S/.12.00",
        disponible: true,
        descripcion: "Pollo desmenuzado en crema de ají amarillo, acompañado con arroz blanco y papa sancochada.",
        badge: { icon: Flame, text: "Leve", color: "bg-orange-100 text-orange-700" },
        imagen: "/ajidegallina.png?height=200&width=300&text=Ají+de+Gallina",
      },
      {
        id: "lentejitas-seco",
        nombre: "Frejoles con Seco de Res",
        precio: "S/.13.00",
        disponible: true,
        descripcion: "Frejoles cocidos al punto con arroz y guiso de res al culantro.",
        badge: { icon: null, text: "Tradicional ✔️", color: "bg-green-100 text-green-700" },
        imagen: "/secoderes.jpg?height=200&width=300&text=Lentejitas+con+Seco",
      },
      {
        id: "tallarines-verdes",
        nombre: "Tallarines Verdes con Bistec",
        precio: "S/.14.00",
        disponible: true,
        descripcion: "Salsa de albahaca y espinaca, servido con bistec jugoso.",
        badge: { icon: Heart, text: "Favorito", color: "bg-red-100 text-red-700" },
        imagen: "/tallarinesverdes.png?height=200&width=300&text=Tallarines+Verdes",
      },
      // Descomenta para probar con 4 platos:
      {
        id: "arroz-pollo",
        nombre: "Arroz con Pollo Frito",
        precio: "S/.11.00",
        disponible: false,
        descripcion: "Arroz graneado, acompañado de un jugoso muslo de pollo frito con piel crujiente y papas fritas.",
        badge: { icon: null, text: "Clásico", color: "bg-blue-100 text-blue-700" },
        imagen: "/pollofrito.jpg?height=200&width=300&text=Arroz+con+Pollo"
      },

      {
        id: "lomo-saltado",
        nombre: "Lomo Saltado",
        precio: "S/.12.00",
        disponible: false,
        descripcion: "Tiernos trozos de lomo de res salteados, acompañado de papas fritas doradas y una porción de arroz blanco graneado.",
        badge: { icon: null, text: "Clásico", color: "bg-blue-100 text-blue-700" },
        imagen: "/lomosaltado.jpg?height=200&width=300&text=Arroz+con+Pollo"
      },
    ]

    const totalItems = menuItems.length

    // Sistema responsive mejorado
    const getResponsiveGrid = () => {
      if (totalItems === 1) {
        return "flex justify-center"
      } else if (totalItems === 2) {
        return "grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto"
      } else if (totalItems === 3) {
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      } else {
        // Para 4 o más elementos
        const rows = Math.ceil(totalItems / 3)
        return "space-y-8"
      }
    }

    if (totalItems <= 3) {
      return (
        <div className={getResponsiveGrid()}>
          {menuItems.map((item) => (
            <div key={item.id} className={totalItems === 1 ? "w-full max-w-md" : ""}>
              <Card
                className={`hover:shadow-xl transition-all duration-300 border-amber-200 ${
                  item.disponible ? "bg-white/80 hover:scale-105" : "bg-gray-100/80 opacity-75"
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="relative">
                    <Image
                      src={item.imagen || "/placeholder.svg"}
                      alt={item.nombre}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    {!item.disponible && (
                      <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                        <span className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold">
                          No Disponible
                        </span>
                      </div>
                    )}
                    {item.disponible && (
                      <div className="absolute top-2 right-2">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Disponible
                        </span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl text-amber-900 flex items-center gap-2">
                    {item.nombre}
                    <Badge variant="secondary" className={item.badge.color}>
                      {item.badge.icon && <item.badge.icon className="w-3 h-3 mr-1" />}
                      {item.badge.text}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription
                    className={`mb-4 leading-relaxed ${item.disponible ? "text-amber-700" : "text-gray-500"}`}
                  >
                    {item.descripcion}
                  </CardDescription>
                  <div className={`text-2xl font-bold ${item.disponible ? "text-red-600" : "text-gray-400"}`}>
                    {item.precio}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )
    }

    // Para 4 o más elementos, usar el sistema de filas
    const rows = Math.ceil(totalItems / 3)
    return (
      <div className="space-y-8">
        {Array.from({ length: rows }, (_, rowIndex) => {
          const startIndex = rowIndex * 3
          const endIndex = Math.min(startIndex + 3, totalItems)
          const rowItems = menuItems.slice(startIndex, endIndex)
          const isLastRow = rowIndex === rows - 1
          const itemsInRow = rowItems.length

          let gridClass = "grid gap-8"
          if (isLastRow && itemsInRow < 3) {
            if (itemsInRow === 1) {
              gridClass += " grid-cols-1 max-w-md mx-auto"
            } else if (itemsInRow === 2) {
              gridClass += " grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto"
            }
          } else {
            gridClass += " grid-cols-1 md:grid-cols-3"
          }

          return (
            <div key={rowIndex} className={gridClass}>
              {rowItems.map((item) => (
                <Card
                  key={item.id}
                  className={`hover:shadow-xl transition-all duration-300 border-amber-200 ${
                    item.disponible ? "bg-white/80 hover:scale-105" : "bg-gray-100/80 opacity-75"
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div className="relative">
                      <Image
                        src={item.imagen || "/placeholder.svg"}
                        alt={item.nombre}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      {!item.disponible && (
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                          <span className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold">
                            No Disponible
                          </span>
                        </div>
                      )}
                      {item.disponible && (
                        <div className="absolute top-2 right-2">
                          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Disponible
                          </span>
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-xl text-amber-900 flex items-center gap-2">
                      {item.nombre}
                      <Badge variant="secondary" className={item.badge.color}>
                        {item.badge.icon && <item.badge.icon className="w-3 h-3 mr-1" />}
                        {item.badge.text}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription
                      className={`mb-4 leading-relaxed ${item.disponible ? "text-amber-700" : "text-gray-500"}`}
                    >
                      {item.descripcion}
                    </CardDescription>
                    <div className={`text-2xl font-bold ${item.disponible ? "text-red-600" : "text-gray-400"}`}>
                      {item.precio}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-cream-100/95 backdrop-blur-sm border-b border-amber-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <h1 className="text-2xl font-bold text-amber-900">La Casa de Marta</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6 text-amber-800" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-cream-50">
              <div className="flex flex-col space-y-6 mt-8">
                <button
                  onClick={() => scrollToSection("inicio")}
                  className="text-left text-lg text-amber-800 hover:text-red-600 transition-colors font-medium"
                >
                  Inicio
                </button>
                <button
                  onClick={() => scrollToSection("menu")}
                  className="text-left text-lg text-amber-800 hover:text-red-600 transition-colors font-medium"
                >
                  Menú
                </button>
                <button
                  onClick={() => scrollToSection("cocina")}
                  className="text-left text-lg text-amber-800 hover:text-red-600 transition-colors font-medium"
                >
                  Nuestra Cocina
                </button>
                <button
                  onClick={() => scrollToSection("pedidos")}
                  className="text-left text-lg text-amber-800 hover:text-red-600 transition-colors font-medium"
                >
                  Pedidos
                </button>
                <button
                  onClick={() => scrollToSection("contacto")}
                  className="text-left text-lg text-amber-800 hover:text-red-600 transition-colors font-medium"
                >
                  Contacto
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-amber-900 mb-6">La Casa de Marta</h1>
          <h2 className="text-2xl md:text-3xl text-red-600 font-semibold mb-8">
            Sabor que reconforta, calidad que te cuida.
          </h2>
          <p className="text-lg text-amber-800 mb-12 max-w-2xl mx-auto leading-relaxed">
            Almuerzos caseros preparados con cariño, ingredientes frescos y estándares de higiene para ti y tu familia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection("menu")}
              size="lg"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Ver Menú
            </Button>
            <Button
              onClick={() => scrollToSection("pedidos")}
              variant="outline"
              size="lg"
              className="border-2 border-red-500 text-red-600 hover:bg-red-50 px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Hacer Pedido
            </Button>
          </div>
        </div>
      </section>

      {/* Menú del Día Section */}
      <section id="menu" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-amber-900 mb-16">Nuestro Menú del Día</h2>

          {/* Menús */}
          {renderMenuItems()}

          {/* Guía de términos desplegable */}
          <div className="mt-12 max-w-4xl mx-auto">
            <Card className="bg-white/80 border-amber-200">
              <CardHeader
                className="cursor-pointer hover:bg-amber-50/50 transition-colors"
                onClick={() => setShowTerminos(!showTerminos)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-amber-900">Guía de Términos</CardTitle>
                  <div className={`transform transition-transform duration-200 ${showTerminos ? "rotate-180" : ""}`}>
                    <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </CardHeader>
              {showTerminos && (
                <CardContent className="pt-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-amber-200">
                          <th className="text-left py-3 px-4 font-semibold text-amber-900">Término</th>
                          <th className="text-left py-3 px-4 font-semibold text-amber-900">Significado</th>
                        </tr>
                      </thead>
                      <tbody className="text-amber-800">
                        <tr className="border-b border-amber-100">
                          <td className="py-3 px-4">
                            <Badge className="bg-orange-100 text-orange-700">
                              <Flame className="w-3 h-3 mr-1" />
                              Leve
                            </Badge>
                          </td>
                          <td className="py-3 px-4">Plato con un toque suave de picante, ideal para todos</td>
                        </tr>
                        <tr className="border-b border-amber-100">
                          <td className="py-3 px-4">
                            <Badge className="bg-green-100 text-green-700">Tradicional ✔️</Badge>
                          </td>
                          <td className="py-3 px-4">
                            Receta clásica de la cocina peruana, preparada de forma auténtica
                          </td>
                        </tr>
                        <tr className="border-b border-amber-100">
                          <td className="py-3 px-4">
                            <Badge className="bg-red-100 text-red-700">
                              <Heart className="w-3 h-3 mr-1" />
                              Favorito
                            </Badge>
                          </td>
                          <td className="py-3 px-4">El plato más pedido por nuestros clientes</td>
                        </tr>
                        <tr className="border-b border-amber-100">
                          <td className="py-3 px-4">
                            <Badge className="bg-blue-100 text-blue-700">Clásico</Badge>
                          </td>
                          <td className="py-3 px-4">Plato tradicional que nunca pasa de moda</td>
                        </tr>
                        <tr className="border-b border-amber-100">
                          <td className="py-3 px-4">
                            <Badge className="bg-purple-100 text-purple-700">Especial</Badge>
                          </td>
                          <td className="py-3 px-4">Preparación única de La Casa de Marta</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">
                            <Badge className="bg-yellow-100 text-yellow-700">Nuevo</Badge>
                          </td>
                          <td className="py-3 px-4">Recién incorporado a nuestro menú</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Nuestra Cocina Section */}
      <section id="cocina" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-amber-900 mb-16">Nuestra Cocina</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-amber-800 leading-relaxed mb-8">
                En La Casa de Marta creemos que la confianza se gana con transparencia. Nuestras comidas se preparan en
                una cocina completamente limpia, equipada con ollas de acero inoxidable y utensilios libres de
                contaminantes. No usamos teflones desgastados ni plásticos que comprometan la salud. Todo se cocina como
                en casa, pero con estándares profesionales.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/cocina.jpg?height=250&width=250"
                alt="Cocina limpia"
                width={250}
                height={250}
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <Image
                src="/cocina2.jpg?height=250&width=250"
                alt="Ollas de acero inoxidable"
                width={250}
                height={250}
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nosotros Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-amber-900 mb-12">¿Quiénes Somos?</h2>
          <p className="text-lg text-amber-800 leading-relaxed">
            La Casa de Marta nace del amor por la cocina tradicional y el deseo de ofrecer almuerzos sabrosos,
            saludables y a buen precio. Marta, fundadora y cocinera principal, tiene más de 20 años de experiencia
            sirviendo platos que alimentan cuerpo y alma. Nuestro compromiso: comida honesta, atención cercana y precios
            justos.
          </p>
        </div>
      </section>

      {/* Testimonios Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center text-amber-900 mb-16">Lo que dicen nuestros clientes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/80 border-amber-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-amber-800 mb-4 italic leading-relaxed">
                  "Siempre pido en La Casa de Marta. Me recuerda la comida de mi abuela."
                </p>
                <p className="text-amber-900 font-semibold">– Andrea H.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-amber-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-amber-800 mb-4 italic leading-relaxed">
                  "La presentación es impecable, los sabores caseros, y el servicio rápido."
                </p>
                <p className="text-amber-900 font-semibold">– Leonor C.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pedidos Section */}
      <section id="pedidos" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold text-center text-amber-900 mb-16">Haz tu pedido</h2>
          <Card className="bg-white/80 border-amber-200 shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleOrderSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="nombre" className="text-amber-900 font-medium">
                    Nombre
                  </Label>
                  <Input
                    id="nombre"
                    value={orderForm.nombre}
                    onChange={(e) => setOrderForm({ ...orderForm, nombre: e.target.value })}
                    required
                    className="mt-2 border-amber-200 focus:border-red-400"
                  />
                </div>

                <div>
                  <Label htmlFor="direccion" className="text-amber-900 font-medium">
                    Dirección
                  </Label>
                  <Textarea
                    id="direccion"
                    value={orderForm.direccion}
                    onChange={(e) => setOrderForm({ ...orderForm, direccion: e.target.value })}
                    required
                    className="mt-2 border-amber-200 focus:border-red-400"
                  />
                </div>

                <div>
                  <Label htmlFor="celular" className="text-amber-900 font-medium">
                    Celular
                  </Label>
                  <Input
                    id="celular"
                    type="tel"
                    value={orderForm.celular}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 9)
                      setOrderForm({ ...orderForm, celular: value })
                    }}
                    // placeholder="987654321"
                    required
                    className="mt-2 border-amber-200 focus:border-red-400"
                    pattern="\d{9}"
                  />
                  {orderForm.celular && orderForm.celular.length !== 9 && (
                    <p className="text-red-500 text-sm mt-1">El celular debe tener exactamente 9 números</p>
                  )}
                </div>

                <div>
                  <Label className="text-amber-900 font-medium">Selección de platos</Label>
                  <div className="mt-2 space-y-3">
                    <Select onValueChange={agregarPlato}>
                      <SelectTrigger className="border-amber-200 focus:border-red-400">
                        <SelectValue placeholder="Agregar plato al pedido" />
                      </SelectTrigger>
                      <SelectContent>
                        {platosDisponibles
                          .filter((plato) => plato.disponible)
                          .map((plato) => (
                            <SelectItem key={plato.id} value={plato.id}>
                              {plato.nombre} - {plato.precio}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>

                    {orderForm.platos.length > 0 && (
                      <div className="space-y-2 p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <h4 className="font-medium text-amber-900">Platos seleccionados:</h4>
                        {orderForm.platos.map((plato, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                            <div className="flex-1">
                              <span className="font-medium text-amber-900">{plato.nombre}</span>
                              <span className="text-amber-700 ml-2">{plato.precio}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => actualizarCantidadPlato(plato.nombre, plato.cantidad - 1)}
                                className="h-8 w-8 p-0"
                              >
                                -
                              </Button>
                              <span className="w-8 text-center font-medium">{plato.cantidad}</span>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => actualizarCantidadPlato(plato.nombre, plato.cantidad + 1)}
                                className="h-8 w-8 p-0"
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="text-right font-bold text-lg text-red-600">
                          Total: S/.
                          {orderForm.platos
                            .reduce((sum, plato) => {
                              const precio = Number.parseFloat(plato.precio.replace("S/.", ""))
                              return sum + precio * plato.cantidad
                            }, 0)
                            .toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-amber-900 font-medium">Método de pago</Label>
                  <RadioGroup
                    value={orderForm.metodoPago}
                    onValueChange={(value) => setOrderForm({ ...orderForm, metodoPago: value })}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="efectivo" id="efectivo" />
                      <Label htmlFor="efectivo" className="text-amber-800">
                        Efectivo
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yape" id="yape" />
                      <Label htmlFor="yape" className="text-amber-800">
                        Yape
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="plin" id="plin" />
                      <Label htmlFor="plin" className="text-amber-800">
                        Plin
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                  disabled={
                    !orderForm.nombre ||
                    !orderForm.direccion ||
                    !orderForm.celular ||
                    orderForm.celular.length !== 9 ||
                    orderForm.platos.length === 0 ||
                    !orderForm.metodoPago
                  }
                >
                  Enviar por WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-amber-900 mb-16">Contáctanos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/80 border-amber-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <Phone className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Teléfono</h3>
                <p className="text-amber-800">+51 946 499 267</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-amber-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <MapPin className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Zona de reparto</h3>
                <p className="text-amber-800">Roma, Valle Chicama – Ascope</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-amber-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center space-x-4 mb-4">
                  <Facebook className="w-8 h-8 text-blue-600 hover:text-blue-700 cursor-pointer transition-colors" />
                  <Instagram className="w-8 h-8 text-pink-600 hover:text-pink-700 cursor-pointer transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Redes Sociales</h3>
                <p className="text-amber-800">Síguenos en nuestras redes</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-cream-100 py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-lg">© 2025 La Casa de Marta - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  )
}
