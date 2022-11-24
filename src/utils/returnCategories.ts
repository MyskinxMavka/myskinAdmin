export const returnCategories = (activeData: any, brands: any[], categories: any[]) => {
  if (brands && categories) {
    if (activeData && activeData.brandId) {
      return brands?.filter(brand => brand.id === activeData.brandId)[0]?.categories
    } else {
      return categories
    }
  } 
}