import { wixServer } from '@/lib/wixServer'

export async function POST(req) {
  const { search } = await req.json()
  const wixClient = await wixServer()

  const productsQuery = wixClient.products
    .queryProducts()
    .contains('description', search)
  const { items: products } = await productsQuery.find()

  return new Response(JSON.stringify(products), { status: 200 })
}
