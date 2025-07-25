export type Producto = {
  id: string
  nombre: string
  descripcion: string
  imagen: string
  precio: number
  categoria: string
  destacado: boolean
}

export type Testimonio = {
  id?: string
  nombre: string
  mensaje: string
  avatar: string
}

export type BannerData = {
  imagen: string
  enlace?: string
  activo: boolean
}

export type SobreData = {
  texto: string
  imagen: string
}
