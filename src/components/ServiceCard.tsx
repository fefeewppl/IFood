interface ServiceCardProps {
  name: string
  duration: string
  price: number
  description: string
}

const ServiceCard = ({ name, duration, price, description }: ServiceCardProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">{duration}</p>
      <p className="text-green-600 font-bold">${price}</p>
      <p className="text-gray-700 mt-2">{description}</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
        Book Now
      </button>
    </div>
  )
}

export default ServiceCard