import {defineQuery} from 'next-sanity'

export const IMAGE_QUERY = defineQuery(`*[_type == "sanity.imageAsset"]`)