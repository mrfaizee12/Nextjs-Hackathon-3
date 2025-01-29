import { type SchemaTypeDefinition } from 'sanity'
import products from './products'
import gear1 from './gear1'
import feature from './feature'
import order from './order'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products,gear1,feature,order],
}
